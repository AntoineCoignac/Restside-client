import { create } from "zustand";

interface DeliverymanOrder {
    id: string;
    deliverymanId: string;
    orderId: string;
    startDateTime: string;
    endDateTime: string;
}

interface DeliverymanOrderRelationsState {
    deliverymanOrderRelations: DeliverymanOrder[];
    addDeliverymanOrderRelation: (deliverymanOrder: DeliverymanOrder) => void;
    removeDeliverymanOrderRelation: (id: string) => void;
    updateDeliverymanOrderRelation: (id: string, deliverymanOrder: DeliverymanOrder) => void;
    clearDeliverymanOrderRelations: () => void;
}

export const useDeliverymanOrderRelationsStore = create<DeliverymanOrderRelationsState>((set) => ({
    deliverymanOrderRelations: [] as DeliverymanOrder[],
    addDeliverymanOrderRelation: (deliverymanOrder: DeliverymanOrder) => set(state => ({ deliverymanOrderRelations: [...state.deliverymanOrderRelations, deliverymanOrder] })),
    removeDeliverymanOrderRelation: (id: string) => set(state => ({ deliverymanOrderRelations: state.deliverymanOrderRelations.filter(deliverymanOrder => deliverymanOrder.id !== id) })),
    updateDeliverymanOrderRelation: (id: string, deliverymanOrder: DeliverymanOrder) => set(state => ({ deliverymanOrderRelations: state.deliverymanOrderRelations.map(d => d.id === id ? deliverymanOrder : d) })),
    clearDeliverymanOrderRelations: () => set({ deliverymanOrderRelations: [] }),
}));

