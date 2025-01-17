import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import {faker} from "@faker-js/faker";

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

const defaultCooks: Cook[] = [
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
];

export const useCooksStore = create<CooksState>((set) => ({
    cooks: defaultCooks as Cook[],
    addCook: (cook: Cook) => set(state => ({ cooks: [...state.cooks, cook] })),
    removeCook: (id: string) => set(state => ({ cooks: state.cooks.filter(cook => cook.id !== id) })),
    updateCook: (id: string, cook: Cook) => set(state => ({ cooks: state.cooks.map(c => c.id === id ? cook : c) })),
    clearCooks: () => set({ cooks: [] }),
}));