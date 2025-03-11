"use client";

import { usePlayStore } from "../store/play";
import { displayTime } from "../utils/displayTime";
import { useEffect, useState } from "react";

export default function ProgressTimeBar() {
    const { startTime, endTime, currentTime, status, setCurrentTime } = usePlayStore();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (status === "playing") {
            const interval = setInterval(() => {
                setCurrentTime(new Date().toISOString());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [status]);

    useEffect(() => {
        if (startTime && endTime && currentTime) {
            const total = new Date(endTime).getTime() - new Date(startTime).getTime();
            const current = new Date(currentTime).getTime() - new Date(startTime).getTime();
            setProgress((current / total) * 100);
        }
    }, [startTime, endTime, currentTime]);

    return (
        <div className="w-100 flex g-16 ai-center">
            <span className="t-14">{displayTime(startTime)}</span>
            <div style={{height: '4px'}} className="w-100 br-4 bg-somber">
                <div style={{width: `${progress}%`, height: '4px'}} className="br-4 bg-white"></div>
            </div>
            <span className="t-14">{displayTime(endTime)}</span>
        </div>
    );
}