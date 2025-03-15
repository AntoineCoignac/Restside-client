"use client";

import OrderCard from "./components/OrderCard";
import TabNav from "./components/TabNav";
import { useOrdersStore } from "@/app/store/orders";
import { useCooksStore } from "./store/cooks";
import { useCookOrderRelationsStore } from "./store/relation/cookOrderRelations";
import CookCard from "./components/CookCard";
import { useDeliverymenStore } from "./store/deliverymen";
import { useDeliverymanOrderRelationsStore } from "./store/relation/deliverymanOrderRelations";
import DeliverymanCard from "./components/DeliverymanCard";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Simulation() {
  const orders = useOrdersStore((state) => state.orders);
  const cooks = useCooksStore((state) => state.cooks);
  const cookOrderRelations = useCookOrderRelationsStore((state) => state.cookOrderRelations);
  const deliverymen = useDeliverymenStore((state) => state.deliverymen);
  const deliverymanOrderRelations = useDeliverymanOrderRelationsStore((state) => state.deliverymanOrderRelations);
  const [ordersActiveTab, setOrdersActiveTab] = useState(0);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (ordersActiveTab === 0) {
      return order.status === "pending";
    } else if (ordersActiveTab === 1) {
      return order.status === "cooking" || order.status === "delivering";
    } else if (ordersActiveTab === 2) {
      return order.status === "done";
    }
    return false;
  });

  return (
    <>
      {domLoaded && <div className="flex g-32 p-32">
        <div style={{ width: "440px", minWidth: "440px" }} className="flex flex-col g-16">
          <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
            <span className="c-white tw-600">Commandes</span>
            <TabNav tabs={["En attente", "En cours", "Terminées"]} activeTab={ordersActiveTab} setActiveTab={setOrdersActiveTab} />
          </div>
          <div className="flex flex-col g-16">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
        <div className="flex flex-col g-16 w-100">
          <div style={{ height: "32px" }} className="flex ai-center g-16">
            <span className="c-white tw-600">Cuisiniers</span>
          </div>
          <div className="flex flex-col g-16">
            {cooks.map((cook) => (
              <CookCard key={cook.id} cook={cook} />
            ))}
          </div>
        </div>
        <div className="flex flex-col g-16 w-100">
          <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
            <span className="c-white tw-600">Livreurs</span>
            <Link href={"/carte"} className="t-14 c-grey p-4 h-t-underline">Voir sur la carte</Link>
          </div>
          <div className="flex flex-col g-16">
            {deliverymen.map((deliveryman) => (
              <DeliverymanCard key={deliveryman.id} deliveryman={deliveryman} />
            ))}
          </div>
        </div>
      </div>}
    </>
  );
}
