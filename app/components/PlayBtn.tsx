"use client";

import { useState } from "react";
import { PauseIcon, PlayIcon } from "@heroicons/react/20/solid";

export default function PlayBtn() {
    const statusList = [
        {
            name: "notStarted",
            text: "Lancer",
            icon : <PlayIcon/>
        },
        {
            name: "playing",
            text: "En cours",
            icon: <PauseIcon/>
        },
        {
            name: "paused",
            text: "Reprendre",
            icon: <PlayIcon/>
        }
    ]
    const [status, setStatus] = useState(statusList[0])

    return (
        <button className="p-x-16 p-y-8 flex ai-center c-black g-8 bg-white br-24 tw-600">
            {status.icon}
            <span>
                {status.text}
            </span>
        </button>
    )
}