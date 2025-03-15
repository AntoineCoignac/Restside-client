import { create } from "zustand";

export interface Simulation {
    id: string;
    ordersCountMin: number;
    ordersCountMax: number;
    startDateTime: string;
    endDateTime: string;
    duration: number;
    seed: number;
    createdDateTime: string;
}

interface SimulationsState {
    simulations: Simulation[];
    addSimulation: (simulation: Simulation) => void;
    removeSimulation: (id: string) => void;
    updateSimulation: (id: string, simulation: Simulation) => void;
    clearSimulations: () => void;
}

export const useSimulationsStore = create<SimulationsState>((set) => ({
    simulations: [] as Simulation[],
    addSimulation: (simulation: Simulation) => set(state => ({ simulations: [...state.simulations, simulation] })),
    removeSimulation: (id: string) => set(state => ({ simulations: state.simulations.filter(simulation => simulation.id !== id) })),
    updateSimulation: (id: string, simulation: Simulation) => set(state => ({ simulations: state.simulations.map(s => s.id === id ? simulation : s) })),
    clearSimulations: () => set({ simulations: [] }),
}));