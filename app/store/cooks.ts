import { create } from "zustand";

export interface Cook {
    id: string;
    name: string;
    status: "pending" | "cooking";
}

interface CooksState {
    cooks: Cook[];
    addCook: (cook: Cook) => void;
    removeCook: (id: string) => void;
    updateCook: (id: string, cook: Cook) => void;
    clearCooks: () => void;
}

export const useCooksStore = create<CooksState>((set) => ({
    cooks: [] as Cook[],
    addCook: (cook: Cook) => set(state => ({ cooks: [...state.cooks, cook] })),
    removeCook: (id: string) => set(state => ({ cooks: state.cooks.filter(cook => cook.id !== id) })),
    updateCook: (id: string, cook: Cook) => set(state => ({ cooks: state.cooks.map(c => c.id === id ? cook : c) })),
    clearCooks: () => set({ cooks: [] }),
}));

const testCook: Cook = {
    id: "1",
    name: "Jean",
    status: "cooking",
};

useCooksStore.getState().addCook(testCook);