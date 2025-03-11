import { create } from "zustand";

export interface Order {
    id: string;
    simulationId: string;
    name: string;
    realDateTime: string;
    simulatedDateTime: string;
    menuItems?: {
        MenuOne?: number;
        MenuTwo?: number;
        MenuThree?: number;
        MenuFour?: number;
    };
    drinkItems?: {
        DrinkOne?: number;
        DrinkTwo?: number;
        DrinkThree?: number;
        DrinkFour?: number;
    };
    dessertItems?: {
        DessertOne?: number;
        DessertTwo?: number;
        DessertThree?: number;
        DessertFour?: number;
    };
    address?: {
        city: string;
        postCode: string;
        street: string;
        number: number;
        coordinates: {
            longitude: number;
            latitude: number;
        }
    } | null;
    cookTime: number;
    deliveryTime: number;
    status: "pending" | "cooking" | "delivering" | "done";
};

interface OrdersState {
    orders: Order[];
    addOrder: (order: Order) => void;
    removeOrder: (id: string) => void;
    updateOrder: (id: string, order: Order) => void;
    clearOrders: () => void;
}

export const useOrdersStore = create<OrdersState>((set) => ({
    orders: [] as Order[],
    addOrder: (order: Order) => set(state => ({ orders: [...state.orders, order] })),
    removeOrder: (id: string) => set(state => ({ orders: state.orders.filter(order => order.id !== id) })),
    updateOrder: (id: string, order: Order) => set(state => ({ orders: state.orders.map(o => o.id === id ? order : o) })),
    setOrders: (orders: Order[]) => set({ orders }),
    clearOrders: () => set({ orders: [] }),
}));