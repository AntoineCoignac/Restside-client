'use client';

import { useEffect, useState, useRef, use } from "react";
import { io, Socket } from "socket.io-client";
import { useSettingsStore } from "../store/settings";
import { useSimulationsStore } from "../store/simulations";
import { useOrdersStore } from "../store/orders";
import { usePlayStore } from "../store/play";
import { useSyncPlayWithSettings } from "@/app/hooks/useSyncPlayWithSettings";
import { PauseIcon, PlayIcon, ForwardIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ProgressTimeBar from "@/app/components/ProgressTimeBar";
import SettingsBtn from "./SettingsBtn";
import getCookTime from "../utils/getCookTime";
import { faker } from "@faker-js/faker";
import { useCooksStore } from "../store/cooks";
import { useDeliverymenStore } from "../store/deliverymen";
import { useCookOrderRelationsStore } from "../store/relation/cookOrderRelations";
import { useDeliverymanOrderRelationsStore } from "../store/relation/deliverymanOrderRelations";

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

const socket = io("http://notification:5173");

export default function BottomBar() {
    useSyncPlayWithSettings();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const simulationIdRef = useRef<string | null>(null);
    const statusRef = useRef<"notStarted" | "playing" | "paused">("notStarted");

    const {
        nbOrdersMin,
        nbOrdersMax,
        startTime,
        endTime,
        duration,
    } = useSettingsStore();

    const { addSimulation } = useSimulationsStore();
    const { cooks, updateCook } = useCooksStore();
    const { deliverymen, updateDeliveryman } = useDeliverymenStore();
    const { cookOrderRelations, addCookOrderRelation, removeCookOrderRelation } = useCookOrderRelationsStore();
    const { deliverymanOrderRelations, addDeliverymanOrderRelation, removeDeliverymanOrderRelation } = useDeliverymanOrderRelationsStore();
    const { orders, addOrder, updateOrder } = useOrdersStore();
    const { currentTime, setCurrentTime, status, setStatus, setSimulationId, setReplayId } = usePlayStore();
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

        if (usePlayStore.getState().currentTime >= usePlayStore.getState().endTime) {
            const remainingOrders = useOrdersStore.getState().orders.filter(order => order.status != "done");
            if (remainingOrders.length == 0) {
                socket.disconnect();
                setCurrentTime(usePlayStore.getState().startTime);
                setTime(usePlayStore.getState().startTime);
                timeRef.current = usePlayStore.getState().startTime;
                setStatus("notStarted");
                statusRef.current = "notStarted";
            }
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [status, statusRef.current, endTime, setCurrentTime, setStatus, startTime]);

    const handlePlayClick = async () => {
            if (statusRef.current === "notStarted") {
                socket.connect();

                const simulatedDurationMinutes = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000;

                socket.emit("register", {
                    ordersCount: [nbOrdersMin, nbOrdersMax],
                    simulatedStartDateTime: startTime,
                    simulatedDurationMinutes: simulatedDurationMinutes,
                    realDurationSeconds: duration / 2,
                    seed: usePlayStore?.getState().replayId
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
                        seed: data.seed,
                        createdDateTime: new Date().toISOString(),
                    };
                    simulationIdRef.current = data.id;
                    setSimulationId(data.id);
                    addSimulation(newSimulation);
                    statusRef.current = "playing";
                    setStatus("playing");
                    setReplayId(null);
                    console.log(statusRef.current);

                    fetch("http://localhost:3000/api/simulations", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: newSimulation.id,
                            ordersCountMin: newSimulation.ordersCountMin,
                            ordersCountMax: newSimulation.ordersCountMax,
                            startDateTime: newSimulation.startDateTime.replace("T", " ").split(".")[0].replaceAll("Z", ""),
                            endDateTime: newSimulation.endDateTime.replace("T", " ").split(".")[0].replaceAll("Z", ""),
                            duration: newSimulation.duration,
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log("Simulation saved:", data);
                        })
                        .catch((error) => {
                            console.log("Error saving simulation:", error);
                        });
                });

                socket.on("notification", async (notification: Notification) => {
                    console.log("Notification reçue :", notification.id);
                    setNotifications((prev) => [...prev, notification]);
            
                    const cookTime = getCookTime(notification.menuItems || {}, notification.drinkItems || {}, notification.dessertItems || {});
                    
                    let deliveryTime = 0;
                    if (notification.address) {
                        const response = await fetch(`http://localhost:3001/route?start=48.0570273,-1.1476941&end=${notification.address.coordinates.latitude},${notification.address.coordinates.longitude}`);
                        const data = await response.json();
                        console.log(data.routes[0].duration);
                        deliveryTime = Math.ceil(data.routes[0].duration / 60);
                    }
            
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

                    console.log(cookTime, deliveryTime);
                    console.log(statusRef.current);
                    addOrder(newOrder);

                    

                    const realDurationSeconds = startTime && endTime ? (new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000 : 0;
                    const timeToWait = (duration / realDurationSeconds) * 60000;

                    console.log("timeToWait", timeToWait);

                    let isThereCookAvailable = false;

                    while (!isThereCookAvailable) {
                        const cooksAvailable = useCooksStore.getState().cooks.filter(cook => cook.status === "pending");

                        if (cooksAvailable.length > 0) {
                            isThereCookAvailable = true;
                            console.log("Cook available");
                            const cook = cooksAvailable[0];
                            const cookOrderId = cook.id + newOrder.id;
                            addCookOrderRelation({ 
                                id: cookOrderId, 
                                cookId: cook.id, 
                                orderId: newOrder.id, 
                                startDateTime: usePlayStore.getState().currentTime || "", 
                                endDateTime: new Date(new Date(usePlayStore.getState().currentTime).getTime() + newOrder.cookTime * 60000).toISOString() 
                            });
                            updateOrder(newOrder.id, { ...newOrder, status: "cooking" });
                            updateCook(cook.id, { ...cook, status: "cooking" });
                            await new Promise(resolve => setTimeout(resolve, timeToWait * newOrder.cookTime));
                            updateCook(cook.id, { ...cook, status: "pending" });
                            removeCookOrderRelation(cookOrderId);
                            if (newOrder.deliveryTime != 0) {
                                updateOrder(newOrder.id, { ...newOrder, status: "delivering" });
                                
                                let isThereDeliverymanAvailable = false;

                                while (!isThereDeliverymanAvailable) {
                                    const deliverymenAvailable = useDeliverymenStore.getState().deliverymen.filter(deliveryman => deliveryman.status === "pending");

                                    if (deliverymenAvailable.length > 0) {
                                        isThereDeliverymanAvailable = true;
                                        console.log("Deliveryman available");
                                        const deliveryman = deliverymenAvailable[0];
                                        const deliverymanOrderId = deliveryman.id + newOrder.id;
                                        addDeliverymanOrderRelation({ 
                                            id: deliverymanOrderId, 
                                            deliverymanId: deliveryman.id, 
                                            orderId: newOrder.id, 
                                            startDateTime: usePlayStore.getState().currentTime || "", 
                                            endDateTime: new Date(new Date(usePlayStore.getState().currentTime).getTime() + newOrder.deliveryTime * 60000).toISOString() 
                                        });
                                        updateOrder(newOrder.id, { ...newOrder, status: "done" });
                                        updateDeliveryman(deliveryman.id, { ...deliveryman, status: "delivering" });
                                        await new Promise(resolve => setTimeout(resolve, timeToWait * newOrder.deliveryTime));
                                        updateDeliveryman(deliveryman.id, { ...deliveryman, status: "pending" });
                                        removeDeliverymanOrderRelation(deliverymanOrderId);
                                        updateOrder(newOrder.id, { ...newOrder, status: "done" });
                                        console.log("Order done");

                                        const postData = {
                                            simulationId: newOrder.simulationId,
                                            name: newOrder.name,
                                            arrivalDateTime: newOrder.realDateTime.replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                            cookStartDateTime: usePlayStore.getState().currentTime?.replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                            cookEndDateTime: new Date(new Date(usePlayStore.getState().currentTime).getTime() + newOrder.cookTime * 60000).toISOString().replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                            cookBy: cook.name,
                                            deliverStartDateTime: new Date(new Date(usePlayStore.getState().currentTime).getTime() + newOrder.cookTime * 60000).toISOString().replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                            deliverEndDateTime: new Date(new Date(usePlayStore.getState().currentTime).getTime() + (newOrder.cookTime + newOrder.deliveryTime) * 60000).toISOString().replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                            deliverBy: deliveryman.name
                                        };

                                        fetch("http://localhost:3000/api/orders", {
                                            method: "POST",
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                            body: JSON.stringify(postData),
                                        })
                                            .then((response) => response.json())
                                            .then((data) => {
                                                console.log("Order saved:", data);
                                            })
                                            .catch((error) => {
                                                console.log("Error saving order:", error);
                                            });
                                    }else{
                                        isThereDeliverymanAvailable = false;
                                        console.log("Deliveryman not available");
                                        await new Promise(resolve => setTimeout(resolve, timeToWait));
                                    }
                                }
                                
                            }else{
                                updateOrder(newOrder.id, { ...newOrder, status: "done" });
                                console.log("Order done");

                                const postData = {
                                    simulationId: newOrder.simulationId,
                                    name: newOrder.name,
                                    arrivalDateTime: newOrder.realDateTime.replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                    cookStartDateTime: usePlayStore.getState().currentTime?.replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                    cookEndDateTime: new Date(new Date(usePlayStore.getState().currentTime).getTime() + newOrder.cookTime * 60000).toISOString().replace("T", " ").split(".")[0].replaceAll("Z", "") || "",
                                    cookBy: cook.name,
                                    deliverStartDateTime: "",
                                    deliverEndDateTime: "",
                                    deliverBy: ""
                                };

                                fetch("http://localhost:3000/api/orders", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(postData),
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                        console.log("Order saved:", data);
                                    })
                                    .catch((error) => {
                                        console.log("Error saving order:", error);
                                    });
                            }

                            if (usePlayStore.getState().currentTime >= usePlayStore.getState().endTime) {
                                const remainingOrders = useOrdersStore.getState().orders.filter(order => order.status != "done");
                                if (remainingOrders.length == 0) {
                                    socket.disconnect();
                                    setCurrentTime(usePlayStore.getState().startTime);
                                    setTime(usePlayStore.getState().startTime);
                                    timeRef.current = usePlayStore.getState().startTime;
                                    setStatus("notStarted");
                                    statusRef.current = "notStarted";
                                }
                            }
                        }else{
                            isThereCookAvailable = false;
                            console.log("Cook not available");
                            await new Promise(resolve => setTimeout(resolve, timeToWait));
                        }
                    }

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