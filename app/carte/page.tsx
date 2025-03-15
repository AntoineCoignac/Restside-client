"use client";

import { use, useEffect, useState } from "react";
import { useOrdersStore } from "../store/orders";
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from "leaflet";
import L from 'leaflet';

const positionRestaurant: LatLngExpression = [48.0570273, -1.1476941];
const positionCenter: LatLngExpression = [48.0766807, -0.9847518];

// Define a custom icon for the marker
const MarkerIcon = new L.Icon({
    iconUrl: '/images/marker.png', // Path to your custom icon
    iconSize: [32, 32],  // Size of the icon (width, height)
    iconAnchor: [16, 32], // Point of the icon that will correspond to marker's position
    popupAnchor: [0, -32], // Point from which the popup will appear
});

// Define a custom icon for the marker
const UserIcon = new L.Icon({
    iconUrl: '/images/user.png', // Path to your custom icon
    iconSize: [32, 32],  // Size of the icon (width, height)
    iconAnchor: [16, 32], // Point of the icon that will correspond to marker's position
    popupAnchor: [0, -32], // Point from which the popup will appear
});

export default function Carte() {
    const orders = useOrdersStore(state => state.orders);
    const [Markers, setMarkers] = useState([]);

    useEffect(() => {
        const updateDeliveringOrders = async () => {
            const deliveringOrdersState: any = useOrdersStore.getState().orders.filter(order => order.deliveryTime > 0);
            console.log(deliveringOrdersState);

            setMarkers(deliveringOrdersState.map((order: any) => 
                <Marker key={order.id} position={[order.address.coordinates.latitude, order.address.coordinates.longitude]} icon={UserIcon}>
                    <Popup>
                        Commande de {order.name}
                    </Popup>
                </Marker>
            ));
        };

        updateDeliveringOrders();

        const unsubscribe = useOrdersStore.subscribe(updateDeliveringOrders);

        return () => {
            unsubscribe();
        };
    }, [orders]);

    return (
        <>
            <div className="h-full w-100">
            <MapContainer center={positionCenter} zoom={12} style={{ height: "calc(100vh - 163px)", width: "100%" }}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={positionRestaurant} icon={MarkerIcon}>
                {
                    Markers && Markers
                }
                <Popup>
                    Restaurant
                </Popup>
                </Marker>
            </MapContainer>
            </div>
        </>
    );
}