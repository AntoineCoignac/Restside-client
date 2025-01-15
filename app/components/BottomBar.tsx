import Link from "next/link";
import PlayBtn from "@/app/components/PlayBtn";
import ProgressTimeBar from "@/app/components/ProgressTimeBar";
import { AdjustmentsVerticalIcon } from "@heroicons/react/20/solid";
import SettingsBtn from "./SettingsBtn";

export default function BottomBar() {

    return (
        <div style={{position: 'fixed', bottom: 0}} className="bg-black p-x-32 p-y-24 flex ai-center g-32 w-100">
            <div className="flex ai-center g-16">
                <PlayBtn/>
                <SettingsBtn/>
            </div>
            <ProgressTimeBar startTime={'2025-01-12T18:00:00Z'} endTime={'2025-01-12T23:00:00Z'} currentTime={'2025-01-12T19:00:00Z'}/>
        </div>
    )
}