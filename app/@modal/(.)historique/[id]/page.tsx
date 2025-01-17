"use client";

import TabNav from "@/app/components/TabNav";
import Modal from "@/components/Modal";

export default function HistoriqueId({params} : any) {

    return (
        <Modal title="Statistiques">
            <div className="h-100 p-x-32 flex flex-col g-16">
                <TabNav tabs={["Commandes", "Cuisiniers", "Livreurs"]} activeTab={0} setActiveTab={()=>{}} />
                
            </div>
        </Modal>
    )
}