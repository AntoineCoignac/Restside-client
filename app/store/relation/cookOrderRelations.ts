import { create } from "zustand";

interface CookOrder {
    id: string;
    cookId: string;
    orderId: string;
    startDateTime: string;
    endDateTime: string;
}

interface CookOrderRelationsState {
    cookOrderRelations: CookOrder[];
    addCookOrderRelation: (cookOrder: CookOrder) => void;
    removeCookOrderRelation: (id: string) => void;
    updateCookOrderRelation: (id: string, cookOrder: CookOrder) => void;
    clearCookOrderRelations: () => void;
}

export const useCookOrderRelationsStore = create<CookOrderRelationsState>((set) => ({
    cookOrderRelations: [] as CookOrder[],
    addCookOrderRelation: (cookOrder: CookOrder) => set(state => ({ cookOrderRelations: [...state.cookOrderRelations, cookOrder] })),
    removeCookOrderRelation: (id: string) => set(state => ({ cookOrderRelations: state.cookOrderRelations.filter(cookOrder => cookOrder.id !== id) })),
    updateCookOrderRelation: (id: string, cookOrder: CookOrder) => set(state => ({ cookOrderRelations: state.cookOrderRelations.map(c => c.id === id ? cookOrder : c) })),
    clearCookOrderRelations: () => set({ cookOrderRelations: [] }),
}));