"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useSettingsStore } from "../store/settings";

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
  const socketRef = useState<Socket | null>(null)[0];

  const {
    nbOrdersMin,
    nbOrdersMax,
    startTime,
    endTime,
    duration,
  } = useSettingsStore();

  useEffect(() => {
    // Remplacez 'http://localhost:<PORT_LOCAL>' par l'URL correspondant à votre container Docker
    const socket = io("http://localhost:5173"); // Exemple avec le port 5173
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

    // Écouter la réponse d'inscription
    socket.on("registerResponse", (data) => {
      console.log("Inscription réussie :", data);
    });

    // Écouter les notifications
    socket.on("notification", (notification: Notification) => {
      console.log("Notification reçue :", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    // Nettoyage lors du démontage du composant
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>Aucune notification reçue.</p>
      ) : (
        notifications.map((notif, index) => (
          <div key={index}>
            <p>
              <strong>Type :</strong> {notif.type}
            </p>
            <p>
              <strong>Date réelle :</strong> {notif.realDateTime}
            </p>
            {/* Affichez d'autres propriétés en fonction de vos besoins */}
          </div>
        ))
      )}
    </div>
  );
}
