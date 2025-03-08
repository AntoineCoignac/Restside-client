import { create } from "zustand";

interface PlayState {
  simulationId: string | null;
  status: "notStarted" | "playing" | "paused";
  startTime: string | null;
  endTime: string | null;
  currentTime: string | null;
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
  startTime: null,
  endTime: null,
  currentTime: null,
  duration: 0,
  setSimulationId: (simulationId: string) => set({ simulationId }),
  setStatus: (status: "notStarted" | "playing" | "paused") => set({ status }),
  setStartTime: (startTime: string) => set({ startTime }),
  setEndTime: (endTime: string) => set({ endTime }),
  setCurrentTime: (currentTime: string) => set({ currentTime }),
  setDuration: (duration: number) => set({ duration }),
}));