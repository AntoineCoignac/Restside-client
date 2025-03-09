import { create } from "zustand";

interface PlayState {
  simulationId: string | null;
  status: "notStarted" | "playing" | "paused";
  startTime: string ;
  endTime: string ;
  currentTime: string ;
  duration: number;
  setSimulationId: (simulationId: string) => void;
  setStatus: (status: "notStarted" | "playing" | "paused") => void;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setCurrentTime: (currentTime: string) => void;
  setDuration: (duration: number) => void;
}

export const usePlayStore = create<PlayState>((set) => ({
  simulationId: null,
  status: "notStarted",
  startTime: `${new Date().toISOString().split('T')[0]}T18:00:00Z`,
  endTime: `${new Date().toISOString().split('T')[0]}T23:00:00Z`,
  currentTime: `${new Date().toISOString().split('T')[0]}T18:00:00Z`,
  duration: 0,
  setSimulationId: (simulationId: string) => set({ simulationId }),
  setStatus: (status: "notStarted" | "playing" | "paused") => set({ status }),
  setStartTime: (startTime: string) => set({ startTime }),
  setEndTime: (endTime: string) => set({ endTime }),
  setCurrentTime: (currentTime: string) => set({ currentTime }),
  setDuration: (duration: number) => set({ duration }),
}));