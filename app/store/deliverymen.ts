import { create } from "zustand";

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

export const useDeliverymenStore = create<DeliverymenState>((set) => ({
    deliverymen: [] as Deliveryman[],
    addDeliveryman: (deliveryman: Deliveryman) => set(state => ({ deliverymen: [...state.deliverymen, deliveryman] })),
    removeDeliveryman: (id: string) => set(state => ({ deliverymen: state.deliverymen.filter(deliveryman => deliveryman.id !== id) })),
    updateDeliveryman: (id: string, deliveryman: Deliveryman) => set(state => ({ deliverymen: state.deliverymen.map(d => d.id === id ? deliveryman : d) })),
    clearDeliverymen: () => set({ deliverymen: [] }),
}));

const testDeliveryman: Deliveryman = {
    id: "1",
    name: "Jean",
    status: "delivering",
};

useDeliverymenStore.getState().addDeliveryman(testDeliveryman);