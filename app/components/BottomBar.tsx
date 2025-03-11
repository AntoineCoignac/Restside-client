'use client';

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useSettingsStore } from "../store/settings";
import { useSimulationsStore } from "../store/simulations";
import { useOrdersStore } from "../store/orders";
import { usePlayStore } from "../store/play";
import { useSyncPlayWithSettings } from "@/app/hooks/useSyncPlayWithSettings";
import { PauseIcon, PlayIcon, ForwardIcon } from "@heroicons/react/20/solid";
import ProgressTimeBar from "@/app/components/ProgressTimeBar";
import SettingsBtn from "./SettingsBtn";
import getCookTime from "../utils/getCookTime";
import { faker } from "@faker-js/faker";

interface Notification {
    id: string;
    type: number;
    realDateTime: string;
    simulatedDateTime: string;
    menuItems?: Record<string, number>;
    drinkItems?: Record<string, number>;
    dessertItems?: Record<string, number>;
    address?: {
      city: string;
      postCode: string;
      street: string;
      number: number;
      coordinates: {
        longitude: number;
        latitude: number;
      };
    } | null;
    timestamp: string;
  }

export default function BottomBar() {
    useSyncPlayWithSettings();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const simulationIdRef = useRef<string | null>(null);
    const statusRef = useRef<"notStarted" | "playing" | "paused">("notStarted");
    const socketRef = useState<Socket | null>(null)[0];

    const {
        nbOrdersMin,
        nbOrdersMax,
        startTime,
        endTime,
        duration,
    } = useSettingsStore();

    const { addSimulation } = useSimulationsStore();
    const { addOrder } = useOrdersStore();
    const { currentTime, setCurrentTime, status, setStatus, setSimulationId } = usePlayStore();
    const [time, setTime] = useState(currentTime);
    const timeRef = useRef<string | null>(null);
    const [elapsedSimulatedTimeState, setElapsedSimulatedTimeState] = useState(0);
    const [playBtnDisabled, setPlayBtnDisabled] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        const realDurationSeconds = startTime && endTime ? (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 : 0;
        const speedFactor = realDurationSeconds / duration;

        let elapsedSimulatedTime = elapsedSimulatedTimeState;

        if (statusRef.current === "playing") {
            interval = setInterval(() => {
                elapsedSimulatedTime += speedFactor;
                setElapsedSimulatedTimeState(elapsedSimulatedTime);
                setTime(new Date(new Date(startTime).getTime() + elapsedSimulatedTime * 1000).toISOString());
                setCurrentTime(new Date(new Date(startTime).getTime() + elapsedSimulatedTime * 1000).toISOString());
                timeRef.current = new Date(new Date(startTime).getTime() + elapsedSimulatedTime * 1000).toISOString();

                if (elapsedSimulatedTime >= realDurationSeconds) {
                    if (interval) {
                        clearInterval(interval);
                    }
                    setPlayBtnDisabled(true);
                    console.log("Simulation terminée.");
                }
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [status, statusRef.current, endTime, setCurrentTime, setStatus, startTime]);

    const handlePlayClick = () => {
        const socket = io("http://localhost:5173");
        socketRef && socketRef.disconnect();
        socket.connect();

        if (statusRef.current === "notStarted") {

            const simulatedDurationMinutes = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000;

            socket.emit("register", {
                ordersCount: [nbOrdersMin, nbOrdersMax],
                simulatedStartDateTime: startTime,
                simulatedDurationMinutes: simulatedDurationMinutes,
                realDurationSeconds: duration,
                seed: null
            });

            socket.on("registerResponse", (data) => {
                console.log("Inscription réussie :", data);
                const newSimulation = {
                    id: data.id,
                    ordersCountMin: nbOrdersMin,
                    ordersCountMax: nbOrdersMax,
                    startDateTime: startTime,
                    endDateTime: endTime,
                    duration: duration,
                    createdDateTime: new Date().toISOString(),
                };
                simulationIdRef.current = data.id;
                setSimulationId(data.id);
                addSimulation(newSimulation);
                statusRef.current = "playing";
                setStatus("playing");

                console.log(statusRef.current);
            });

            socket.on("notification", (notification: Notification) => {
                console.log("Notification reçue :", notification);
                setNotifications((prev) => [...prev, notification]);
          
                const cookTime = getCookTime(notification.menuItems || {}, notification.drinkItems || {}, notification.dessertItems || {});
                const deliveryTime = notification.address ? 3 : 0;
          
                const newOrder = {
                  id: notification.id,
                  simulationId: simulationIdRef.current || "",
                  name: faker.person.firstName(),
                  realDateTime: notification.realDateTime,
                  simulatedDateTime: notification.simulatedDateTime,
                  menuItems: notification.menuItems,
                  drinkItems: notification.drinkItems,
                  dessertItems: notification.dessertItems,
                  address: notification.address,
                  cookTime: cookTime,
                  deliveryTime: deliveryTime,
                  status: "pending" as "pending",
                };

                console.log(statusRef.current);
                addOrder(newOrder);
                

              });
        } else if (statusRef.current === "playing") {
            socket.emit("playPause", {
                simulationId: simulationIdRef.current,
                isPlaying: false
            });
            statusRef.current = "paused";
            setStatus("paused");
            console.log(statusRef.current);
        } else if (status === "paused") {
            socket.emit("playPause", {
                simulationId: simulationIdRef.current,
                isPlaying: true
            });
            statusRef.current = "playing";
            setStatus("playing");
            console.log(statusRef.current);
        }
    };

    const statusList = [
        {
            name: "notStarted",
            text: "Lancer",
            icon: <PlayIcon />
        },
        {
            name: "playing",
            text: "En cours",
            icon: <PauseIcon />
        },
        {
            name: "paused",
            text: "Reprendre",
            icon: <ForwardIcon />
        }
    ];

    const currentStatus = statusList.find(s => s.name === statusRef.current) || statusList[0];

    return (
        <div style={{ position: 'fixed', bottom: 0, height: '80px' }} className="bg-black p-x-32 flex ai-center g-32 w-100">
            <div className="flex ai-center g-16">
                <button disabled={playBtnDisabled} onClick={handlePlayClick} style={{ width: '144px' }} className="p-x-16 p-y-16 flex ai-center jc-center c-black g-8 bg-white br-32 tw-600 nowrap">
                    {currentStatus.icon}
                    <span>
                        {currentStatus.text}
                    </span>
                </button>
                <SettingsBtn />
            </div>
            <ProgressTimeBar currentTime={time}/>
        </div>
    );
}