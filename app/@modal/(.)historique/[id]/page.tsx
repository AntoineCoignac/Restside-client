"use client";

import TabNav from "@/app/components/TabNav";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

export default function HistoriqueId({ params }: any) {

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    return (
        <>{domLoaded &&
            <Modal title="Statistiques">
                <div className="h-100 p-x-32 flex flex-col g-16">
                    <TabNav tabs={["Commandes", "Cuisiniers", "Livreurs"]} activeTab={0} setActiveTab={() => { }} />

                </div>
            </Modal>
        }</>
    )
}