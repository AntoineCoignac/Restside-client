"use client";

import { usePlayStore } from "../store/play";
import { displayTime } from "../utils/displayTime";

export default function ProgressTimeBar() {
    const { startTime, endTime, currentTime } = usePlayStore();

    const calculateProgress = () => {
        if (!startTime || !endTime || !currentTime) {
            return 0;
        }
        const total = new Date(endTime).getTime() - new Date(startTime).getTime();
        const current = new Date(currentTime).getTime() - new Date(startTime).getTime();
        return (current / total) * 100;
    };

    return (
        <div className="w-100 flex g-16 ai-center">
            <span className="t-14">{displayTime(startTime)}</span>
            <div style={{height: '4px'}} className="w-100 br-4 bg-somber">
                <div style={{width: `${calculateProgress()}%`, height: '4px'}} className="br-4 bg-white"></div>
            </div>
            <span className="t-14">{displayTime(endTime)}</span>
        </div>
    );
}