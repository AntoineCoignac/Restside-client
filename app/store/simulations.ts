import { create } from "zustand";

export interface Simulation {
    id: string;
    ordersCountMin: number;
    ordersCountMax: number;
    startDateTime: string;
    endDateTime: string;
    duration: number;
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

const testSimulation: Simulation = {
    id: "ea0e8e82-617c-4b29-94c6-40624784e85a",
    ordersCountMin: 20,
    ordersCountMax: 30,
    startDateTime: "2025-01-12T18:00:00Z",
    endDateTime: "2025-01-12T21:00:00Z",
    duration: 180,
    createdDateTime: "2025-01-15T08:00:00Z",
};

useSimulationsStore.getState().addSimulation(testSimulation);