"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {QueueListIcon, AdjustmentsVerticalIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

export default function TopBar() {
    const currentPath = usePathname();

    return (
        <div style={{position: 'fixed', top: 0}} className="bg-black w-100 p-16 b-bottom flex ai-center">
            <Link href={"/"} className="t-24 c-white tw-600 p-x-16 p-y-8">
                Restside.
            </Link>
            <Link href={"/"} className={currentPath == "/" || currentPath == "" ? "p-x-16 p-y-8 flex ai-center c-white tw-600 g-8" : "p-x-16 p-y-8 flex ai-center c-grey g-8"}>
                <PlayCircleIcon />
                <span>Simulation</span>
            </Link>
            <Link href={"/parametres"} className={currentPath == "/parametres" ? "p-x-16 p-y-8 flex ai-center c-white tw-600 g-8" : "p-x-16 p-y-8 flex ai-center c-grey g-8"}>
                <AdjustmentsVerticalIcon />
                <span>Paramètres</span>
            </Link>
            <Link href={"/historique"} className={currentPath == "/historique" ? "p-x-16 p-y-8 flex ai-center c-white tw-600 g-8" : "p-x-16 p-y-8 flex ai-center c-grey g-8"}>
                <QueueListIcon />
                <span>Historique</span>
            </Link>
        </div>
    )
}