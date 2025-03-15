import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import {faker} from "@faker-js/faker";

export interface Deliveryman {
    id: string;
    name: string;
    status: "pending" | "delivering";
}

interface DeliverymenState {
    deliverymen: Deliveryman[];
    addDeliveryman: (deliveryman: Deliveryman) => void;
    removeDeliveryman: (id: string) => void;
    updateDeliveryman: (id: string, deliveryman: Deliveryman) => void;
    clearDeliverymen: () => void;
}

const defaultCooks: Deliveryman[] = [
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
    { id: uuidv4(), name: faker.person.firstName(), status: "pending" },
];

export const useDeliverymenStore = create<DeliverymenState>((set) => ({
    deliverymen: defaultCooks as Deliveryman[],
    addDeliveryman: (deliveryman: Deliveryman) => set(state => ({ deliverymen: [...state.deliverymen, deliveryman] })),
    removeDeliveryman: (id: string) => set(state => ({ deliverymen: state.deliverymen.filter(deliveryman => deliveryman.id !== id) })),
    updateDeliveryman: (id: string, deliveryman: Deliveryman) => set(state => ({ deliverymen: state.deliverymen.map(d => d.id === id ? deliveryman : d) })),
    clearDeliverymen: () => set({ deliverymen: [] }),
}));