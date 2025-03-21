"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {QueueListIcon, AdjustmentsVerticalIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

export default function TopBar() {
    const currentPath = usePathname();

    return (
        <div style={{position: 'fixed', top: 0, height: "80px", zIndex: 20}} className="bg-black w-100 p-x-16 b-bottom flex ai-center">
            <Link href={"/"} className="t-24 c-white tw-600 p-x-16 p-y-8">
                Restside.
            </Link>
            <Link href={"/"} className={currentPath == "/" || currentPath == "" ? "p-x-16 p-y-8 flex ai-center c-white tw-600 g-8" : "p-x-16 p-y-8 flex ai-center c-grey g-8 h-t-underline"}>
                <PlayCircleIcon />
                <span className="t-14">Simulation</span>
            </Link>
            <Link href={"/parametres"} className={currentPath == "/parametres" ? "p-x-16 p-y-8 flex ai-center c-white tw-600 g-8" : "p-x-16 p-y-8 flex ai-center c-grey g-8 h-t-underline"}>
                <AdjustmentsVerticalIcon />
                <span className="t-14">Paramètres</span>
            </Link>
            <Link href={"/historique"} className={currentPath == "/historique" ? "p-x-16 p-y-8 flex ai-center c-white tw-600 g-8" : "p-x-16 p-y-8 flex ai-center c-grey g-8 h-t-underline"}>
                <QueueListIcon />
                <span className="t-14">Historique</span>
            </Link>
        </div>
    )
}