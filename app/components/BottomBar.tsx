'use client';

import PlayBtn from "@/app/components/PlayBtn";
import ProgressTimeBar from "@/app/components/ProgressTimeBar";
import SettingsBtn from "./SettingsBtn";
import { useSyncPlayWithSettings } from "@/app/hooks/useSyncPlayWithSettings";

export default function BottomBar() {
    useSyncPlayWithSettings();

    return (
        <div style={{position: 'fixed', bottom: 0, height: '80px'}} className="bg-black p-x-32 flex ai-center g-32 w-100">
            <div className="flex ai-center g-16">
                <PlayBtn/>
                <SettingsBtn/>
            </div>
            <ProgressTimeBar/>
        </div>
    );
}