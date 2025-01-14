interface MenuItems {
    MenuOne?: number;
    MenuTwo?: number;
    MenuThree?: number;
    MenuFour?: number;
}

interface DrinkItems {
    DrinkOne?: number;
    DrinkTwo?: number;
    DrinkThree?: number;
    DrinkFour?: number;
}

interface DessertItems {
    DessertOne?: number;
    DessertTwo?: number;
    DessertThree?: number;
    DessertFour?: number;
}

export default function getCookTime(menuItems: MenuItems, drinkItems: DrinkItems, dessertItems: DessertItems) {
    const timesInMinutes = {
        menuItems: {
            MenuOne: 2,
            MenuTwo: 2,
            MenuThree: 3,
            MenuFour: 4,
        },
        drinkItems: {
            DrinkOne: 1,
            DrinkTwo: 1,
            DrinkThree: 1,
            DrinkFour: 2,
        },
        dessertItems: {
            DessertOne: 1,
            DessertTwo: 1,
            DessertThree: 1,
            DessertFour: 2,
        },
    };

    let totalCookTime = 0;

    for (const key in menuItems) {
        if (menuItems[key as keyof MenuItems]) {
            totalCookTime += timesInMinutes.menuItems[key as keyof MenuItems] * (menuItems[key as keyof MenuItems] || 0) || 0;
        }
    }

    for (const key in drinkItems) {
        if (drinkItems[key as keyof DrinkItems]) {
            totalCookTime += timesInMinutes.drinkItems[key as keyof DrinkItems] * (drinkItems[key as keyof DrinkItems] || 0) || 0;
        }
    }

    for (const key in dessertItems) {
        if (dessertItems[key as keyof DessertItems]) {
            totalCookTime += timesInMinutes.dessertItems[key as keyof DessertItems] * (dessertItems[key as keyof DessertItems] || 0) || 0;
        }
    }

    return totalCookTime;
}