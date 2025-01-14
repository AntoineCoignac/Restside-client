import { create } from "zustand";
import getCookTime from "../utils/getCookTime";

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
            latitude: number;
            longitude: number;
        }
    };
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

const testOrder: Order = {
    id: "b1039fa8-3b33-442c-897f-32da743885ca",
    simulationId: "def8c2ee-ef59-4899-89ac-4c1292703c19",
    name: "John",
    realDateTime: "2025-01-11T18:20:45.7849703Z",
    simulatedDateTime: "2025-01-11T07:30:33.4032712Z",
    menuItems: {
        MenuOne: 1,
        MenuTwo: 2,
        MenuThree: 0,
        MenuFour: 1,
    },
    drinkItems: {
        DrinkOne: 0,
        DrinkTwo: 0,
        DrinkThree: 3,
        DrinkFour: 1,
    },
    dessertItems: {
        DessertOne: 2,
        DessertTwo: 1,
        DessertThree: 0,
        DessertFour: 1,
    },
    address: {
        city: "Laval",
        postCode: "53000",
        street: "Avenue de Fougères",
        number: 12,
        coordinates: {
            latitude: -0.788886,
            longitude: 48.077976,
        },
    },
    cookTime: getCookTime({
        MenuOne: 1,
        MenuTwo: 2,
        MenuThree: 0,
        MenuFour: 1,
    },
    {
        DrinkOne: 0,
        DrinkTwo: 0,
        DrinkThree: 3,
        DrinkFour: 1,
    },
    {
        DessertOne: 2,
        DessertTwo: 1,
        DessertThree: 0,
        DessertFour: 1,
    }),
    deliveryTime: 3,
    status: "delivering",
};

// Example usage
useOrdersStore.getState().addOrder(testOrder);