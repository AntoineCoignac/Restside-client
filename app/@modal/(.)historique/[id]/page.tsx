"use client";

import TabNav from "@/app/components/TabNav";
import Modal from "@/components/Modal";
import { useEffect, useState, use } from "react";
import { displayTime } from "@/app/utils/displayTime";
import PizzaIcon from "@/app/icons/react/20/solid/PizzaIcon";
import { MapPinIcon } from "@heroicons/react/20/solid";

export default function HistoriqueId({ params }: any) {
    const unwrappedParams: any = use(params);
    const [domLoaded, setDomLoaded] = useState(false);
    const [orders, setOrders] = useState([]);
    const [cooks, setCooks] = useState([]);
    const [deliverymen, setDeliverymen] = useState([]);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        setDomLoaded(true);

        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/orders/simulation/${unwrappedParams?.id}`);
                const data = await response.json();
                console.log(data);
                setOrders(data);

                const uniqueCooks: any = Array.from(new Set(data.map((order: any) => order.cookBy)))
                    .map((name: any) => {
                        const totalWorkedTime = data
                            .filter((order: any) => order.cookBy === name)
                            .reduce((acc: number, order: any) => acc + (new Date(order.cookEndDateTime).getTime() - new Date(order.cookStartDateTime).getTime()), 0);
                        return { name, totalWorkedTime:formatTime(totalWorkedTime) };
                    });
                console.log(uniqueCooks);
                setCooks(uniqueCooks || []);

                const uniqueDeliverymen: any = Array.from(new Set(data.map((order: any) => order.deliverBy).filter(Boolean)))
                    .map((name: any) => {
                        const totalWorkedTime = data
                            .filter((order: any) => order.deliverBy === name)
                            .reduce((acc: number, order: any) => acc + (new Date(order.deliverEndDateTime).getTime() - new Date(order.deliverStartDateTime).getTime()), 0);
                        return { name, totalWorkedTime:formatTime(totalWorkedTime) };
                    });
                console.log(uniqueDeliverymen);
                setDeliverymen(uniqueDeliverymen || []);
            } catch (error) {
                console.log("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    const formatTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60));
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
        return `Total travaillé ${hours} heure${hours > 1 ? "s" : ""} et ${minutes} minute${minutes > 1 ? "s" : ""}`;
    };

    return (
        <>{domLoaded &&
            <Modal title="Statistiques">
                <div style={{overflowY: 'scroll', scrollbarWidth: 'none'}} className="h-100 p-x-32 flex flex-col g-16">
                    <TabNav tabs={["Commandes", "Cuisiniers", "Livreurs"]} activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'fit-content'}} className="gap-4 pb-4">
                        {
                            activeTab === 0 &&
                            orders.map((order: any, index: number) => (
                                <div key={order.id} className="flex flex-col g-16 p-24 br-8 bg-dark b">
                                    <span className="t-14 c-white">Commandes de {order.name} · {displayTime(new Date(new Date(order.arrivalDateTime).getTime() + 60 * 60 * 1000).toISOString())}</span>
                                    <span className="flex ai-center g-16"><PizzaIcon/><span className="t-14">En cuisine de {displayTime(new Date(new Date(order.cookStartDateTime).getTime() + 60 * 60 * 1000).toISOString())} -> {displayTime(new Date(new Date(order.cookEndDateTime).getTime() + 60 * 60 * 1000).toISOString())}</span>
                                        <span className="flex ai-center g-6 p-x-6 p-y-2 bg-somber br-4">
                                            <img loading="lazy" style={{width: "16px", minWidth: "16px", height: "16px"}} className="br-24" src={`https://www.tapback.co/api/avatar/${order.cookBy.toLowerCase().replaceAll(" ", "")}.webp`} alt={order.cookBy} />
                                            <span className="c-white t-14">{order.cookBy}</span>
                                        </span>
                                    </span>
                                    {
                                        order.deliverBy && (
                                            <span className="flex ai-center g-16"><MapPinIcon/><span className="t-14">En livraison de {displayTime(new Date(new Date(order.deliverStartDateTime).getTime() + 60 * 60 * 1000).toISOString())} -> {displayTime(new Date(new Date(order.deliverEndDateTime).getTime() + 60 * 60 * 1000).toISOString())}</span>
                                                <span className="flex ai-center g-6 p-x-6 p-y-2 bg-somber br-4">
                                                    <img loading="lazy" style={{width: "16px", minWidth: "16px", height: "16px"}} className="br-24" src={`https://www.tapback.co/api/avatar/${order.deliverBy.toLowerCase().replaceAll(" ", "")}.webp`} alt={order.deliverBy} />
                                                    <span className="c-white t-14">{order.deliverBy}</span>
                                                </span>
                                            </span>
                                        )
                                    }
                                </div>
                            ))
                        }
                        {
                            activeTab === 1 &&
                            cooks.map((cook: any, index: number) => (
                                <div key={cook.name} className="flex g-16 p-24 br-8 bg-dark b">
                                    <img loading="lazy" style={{width: "24px", minWidth: "24px", height: "24px"}} className="br-24" src={`https://www.tapback.co/api/avatar/${cook.name.toLowerCase().replaceAll(" ", "")}.webp`} alt={cook.name} />
                                    <div className="flex flex-col g-4">
                                        <span className="t-14 c-white">{cook.name}</span>
                                        <span className="t-14">{cook.totalWorkedTime}</span>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            activeTab === 2 &&
                            deliverymen.map((deliveryman: any, index: number) => (
                                <div key={deliveryman.name} className="flex g-16 p-24 br-8 bg-dark b">
                                    <img loading="lazy" style={{width: "24px", minWidth: "24px", height: "24px"}} className="br-24" src={`https://www.tapback.co/api/avatar/${deliveryman.name.toLowerCase().replaceAll(" ", "")}.webp`} alt={deliveryman.name} />
                                    <div className="flex flex-col g-4">
                                        <span className="t-14 c-white">{deliveryman.name}</span>
                                        <span className="t-14">{deliveryman.totalWorkedTime}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        }</>
    )
}