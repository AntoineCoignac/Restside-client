import {create} from "zustand";

interface SettingsState {
    nbOrdersMin: number;
    nbOrdersMax: number;
    startTime: string;
    endTime: string;
    duration: number;
    setNbOrdersMin: (nbOrdersMin: number) => void;
    setNbOrdersMax: (nbOrdersMax: number) => void;
    setStartTime: (startTime: string) => void;
    setEndTime: (endTime: string) => void;
    setDuration: (duration: number) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
    nbOrdersMin: 10,
    nbOrdersMax: 20,
    startTime: `${new Date().toISOString().split('T')[0]}T18:00:00Z`,
    endTime: `${new Date().toISOString().split('T')[0]}T23:00:00Z`,
    duration: 180,
    setNbOrdersMin: (nbOrdersMin: number) => set({ nbOrdersMin }),
    setNbOrdersMax: (nbOrdersMax: number) => set({ nbOrdersMax }),
    setStartTime: (startTime: string) => set({ startTime }),
    setEndTime: (endTime: string) => set({ endTime }),
    setDuration: (duration: number) => set({ duration }),
}));