"use client";

import { ArrowTrendingUpIcon, CheckIcon, PlayIcon } from "@heroicons/react/20/solid";
import { Simulation } from "../store/simulations";
import { displayDay } from "../utils/displayDay";
import { displayTime } from "../utils/displayTime";
import { displayTimeAgo } from "../utils/displayTimeAgo";
import { useState } from "react";
import Link from "next/link";
import { usePlayStore } from "../store/play";
import { set } from "date-fns";

interface StatsItemProps {
    simulation: Simulation;
    index: number;
}

export default function StatsItem({simulation, index} : StatsItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    const { setReplayId } = usePlayStore();

    const handlePlay = () => {
        setReplayId(simulation.id);
    };

    return (
        <div style={{height:"80px", position: "relative"}} className={`p-x-16 flex ai-center g-16 w-100 br-8 ${isHovered ? "bg-dark" : ""}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div style={{minWidth:"64px"}}>
                {
                    isHovered ? (
                        <button onClick={handlePlay} style={{width: "24px", height: "24px"}} className="flex ai-center jc-center">
                            { usePlayStore.getState().replayId === simulation.id ?
                                <CheckIcon className="c-white" />
                                :
                                <PlayIcon className="c-white" />
                            }
                        </button>
                    ) :
                    (
                        <span style={{display: "inline-block", width: "20px", textAlign: "center"}} className="t-14">{index}</span>
                    )
                }
            </div>
            <div style={{minWidth:"164px"}} className="w-100">
                <span className="t-14 t-ellipsis c-white">{displayDay(simulation.startDateTime)}</span>
            </div>
            <div style={{minWidth:"256px"}}>
                <span className="t-14 t-ellipsis">{displayTimeAgo(simulation.createdDateTime)}</span>
            </div>
            <div style={{minWidth:"164px"}}>
                <span className="t-14 t-ellipsis">{displayTime(simulation.startDateTime)}</span>
            </div>
            <div style={{minWidth:"164px"}}>
                <span className="t-14 t-ellipsis">{displayTime(simulation.endDateTime)}</span>
            </div>
            <div style={{minWidth:"256px"}}>
                <span className="t-14 t-ellipsis">{simulation.duration}</span>
            </div>
            {
                isHovered ?
                <Link href={`/historique/${simulation.id}`} style={{width: "24px", height: "24px", position: "absolute", right: "16px"}} className="flex ai-center jc-center">
                    <ArrowTrendingUpIcon className="c-white" />
                </Link>
                : ""
        }
        </div>
    )
}