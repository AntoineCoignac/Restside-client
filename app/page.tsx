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

export default function Simulation() {
  const orders = useOrdersStore((state) => state.orders);
  const cooks = useCooksStore((state) => state.cooks);
  const cookOrderRelations = useCookOrderRelationsStore((state) => state.cookOrderRelations);
  const deliverymen = useDeliverymenStore((state) => state.deliverymen);
  const deliverymanOrderRelations = useDeliverymanOrderRelationsStore((state) => state.deliverymanOrderRelations);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && <div className="flex g-32 p-32">
        <div style={{ width: "400px", minWidth: "400px" }} className="flex flex-col g-16">
          <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
            <span className="c-white tw-600">Commandes</span>
            <TabNav tabs={["En attente", "En cours", "Terminées"]} activeTab={0} setActiveTab={() => { }} />
          </div>
          <div className="flex flex-col g-16">
            {orders.map((order) => (
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
            <button className="t-14 c-grey p-4 h-t-underline">Voir sur la carte</button>
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
