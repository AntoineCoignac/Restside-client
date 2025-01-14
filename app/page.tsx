"use client";

import OrderCard from "./components/OrderCard";
import TabNav from "./components/TabNav";
import { useOrdersStore } from "@/app/store/orders";

export default function Simulation() {
  const orders = useOrdersStore((state) => state.orders);

  return (
    <div className="flex g-32 p-32"> 
      <div style={{width: "400px"}} className="flex flex-col g-16">
        <div className="flex jc-space-between ai-center g-16">
          <span className="c-white tw-600">Commandes</span>
          <TabNav tabs={["En attente", "En cours", "Terminées"]} activeTab={0} setActiveTab={() => {}} />
        </div>
        <div className="flex flex-col g-16">
          {orders.map((order) => (
            <OrderCard key={order.id} id={order.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
