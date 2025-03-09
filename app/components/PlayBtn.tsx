"use client";

import { usePlayStore } from "../store/play";
import { PauseIcon, PlayIcon, ForwardIcon } from "@heroicons/react/20/solid";

export default function PlayBtn() {
    const { status, setStatus } = usePlayStore();

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
            icon: <ForwardIcon/>
        }
    ]

    const currentStatus = statusList.find(s => s.name === status) || statusList[0];

    const handleClick = () => {
        if (status === "notStarted" || status === "paused") {
            setStatus("playing");
        } else if (status === "playing") {
            setStatus("paused");
        }
    };

    return (
        <button onClick={handleClick} style={{width: '144px'}} className="p-x-16 p-y-16 flex ai-center jc-center c-black g-8 bg-white br-32 tw-600 nowrap">
            {currentStatus.icon}
            <span>
                {currentStatus.text}
            </span>
        </button>
    );
}