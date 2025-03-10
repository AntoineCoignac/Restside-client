"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useSettingsStore } from "../store/settings";
import { useSimulationsStore } from "../store/simulations";
import { useOrdersStore } from "../store/orders";
import { usePlayStore } from "../store/play";
import getCookTime from "../utils/getCookTime";
import {faker} from "@faker-js/faker";

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

export default function NotificationComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const simulationIdRef = useRef<string | null>(null);
  const socketRef = useState<Socket | null>(null)[0];

  const {
    nbOrdersMin,
    nbOrdersMax,
    startTime,
    endTime,
    duration,
  } = useSettingsStore();

  const { addSimulation } = useSimulationsStore();
  const { addOrder, orders } = useOrdersStore();
  const { setSimulationId } = usePlayStore();

  useEffect(() => {
    const socket = io("http://localhost:5173");
    socketRef && socketRef.disconnect(); // Si déjà connecté, déconnecter
    socket.connect();

    // Émettre l'événement "register" avec les paramètres requis
    const simulatedDurationMinutes = (new Date(endTime).getTime() - new Date(startTime).getTime()) / 60000;

    socket.emit("register", {
        ordersCount: [nbOrdersMin, nbOrdersMax],
        simulatedStartDateTime: startTime,
        simulatedDurationMinutes: simulatedDurationMinutes,
        realDurationSeconds: duration,
        seed: null
      }
    );

    
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
      
      setSimulationId(data.id);
      simulationIdRef.current = data.id;
      console.log("Simulation ID :", data.id);
      addSimulation(newSimulation);
    });

    // Écouter les notifications
    socket.on("notification", (notification: Notification) => {
      console.log("Notification reçue :", notification);
      setNotifications((prev) => [...prev, notification]);

      const cookTime = getCookTime(notification.menuItems || {}, notification.drinkItems || {}, notification.dessertItems || {});
      const deliveryTime = notification.address ? 3 : 0;

      console.log("Simulation ID :", simulationIdRef.current);

      const newOrder = {
        id: notification.id,
        simulationId: simulationIdRef.current || "",
        name: faker.person.firstName(), // Generate a random first name using faker
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

      addOrder(newOrder);
    });

    // Nettoyage lors du démontage du composant
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p>No orders received.</p>
            ) : (
        orders
          .filter(order => order.simulationId === simulationIdRef.current)
          .map((order, index) => (
          <div key={index}>
            <p>
              <strong>ID :</strong> {order.id}
            </p>
            <p>
              <strong>Name :</strong> {order.name}
            </p>
            <p>
              <strong>Real Date Time :</strong> {order.realDateTime}
            </p>
            <p>
              <strong>Simulated Date Time :</strong> {order.simulatedDateTime}
            </p>
            <p>
              <strong>Cook Time :</strong> {order.cookTime} minutes
            </p>
            <p>
              <strong>Delivery Time :</strong> {order.deliveryTime} minutes
            </p>
            <p>
              <strong>Status :</strong> {order.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
