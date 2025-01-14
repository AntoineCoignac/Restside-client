"use client";

import { Order } from "@/app/store/orders";
import { displayTime } from "@/app/utils/displayTime";
import Tag from "./Tag";
import PizzaIcon from "../icons/react/20/solid/PizzaIcon";
import DrinkIcon from "../icons/react/20/solid/Drink";
import CookieIcon from "../icons/react/20/solid/Cookie";
import { MapPinIcon } from "@heroicons/react/20/solid";

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({order} : OrderCardProps) {

    const statusToCookColor = (status: string) => {
        switch (status) {
            case "pending":
                return "grey";
            case "cooking":
                return "orange";
            case "delivering":
                return "green";
            case "done":
                return "green";
            default:
                return "grey";
        }
    }

    const statusToDeliverColor = (status: string) => {
        switch (status) {
            case "pending":
                return "grey";
            case "cooking":
                return "grey";
            case "delivering":
                return "orange";
            case "done":
                return "green";
            default:
                return "grey";
        }
    }

    return order!=undefined ? (
        <div className="w-100 b bg-dark p-24 br-8 flex flex-col g-16">
            <div style={{height: "24px"}} className="w-100 flex jc-space-between ai-center g-8">
                <span className="t-14 c-white t-ellipsis">Commande de {order.name} · {displayTime(order.realDateTime)}</span>
                <div className="flex ai-center g-8">
                    <Tag text="Cuisine" color={statusToCookColor(order.status)} bgColor={`${statusToCookColor(order.status)}-20`} />
                    {
                        order.address && <Tag text="Livraison" color={statusToDeliverColor(order.status)} bgColor={`${statusToDeliverColor(order.status)}-20`} />
                    }
                </div>
            </div>
            <div className="flex jc-space-between g-8">
                <div className="flex flex-col g-16">
                    {order?.menuItems && (<div className="flex g-16">
                        <PizzaIcon />
                        <div className="flex flex-col">
                            {
                                order?.menuItems?.MenuOne ? <span className="t-14 tlh-150 t-ellipsis">x{order.menuItems.MenuOne} Menu 1</span> : ""
                            }
                            {
                                order?.menuItems?.MenuTwo ? <span className="t-14 tlh-150 t-ellipsis">x{order.menuItems.MenuTwo} Menu 2</span> : ""
                            }
                            {
                                order?.menuItems?.MenuThree ? <span className="t-14 tlh-150 t-ellipsis">x{order.menuItems.MenuThree} Menu 3</span> : ""
                            }
                            {
                                order?.menuItems?.MenuFour ? <span className="t-14 tlh-150 t-ellipsis">x{order.menuItems.MenuFour} Menu 4</span> : ""
                            }
                        </div>
                    </div>)}
                    {order?.drinkItems && (<div className="flex g-16">
                        <DrinkIcon />
                        <div className="flex flex-col">
                            {
                                order?.drinkItems?.DrinkOne ? <span className="t-14 tlh-150 t-ellipsis">x{order.drinkItems.DrinkOne} Drink 1</span> : ""
                            }
                            {
                                order?.drinkItems?.DrinkTwo ? <span className="t-14 tlh-150 t-ellipsis">x{order.drinkItems.DrinkTwo} Drink 2</span> : ""
                            }
                            {
                                order?.drinkItems?.DrinkThree ? <span className="t-14 tlh-150 t-ellipsis">x{order.drinkItems.DrinkThree} Drink 3</span> : ""
                            }
                            {
                                order?.drinkItems?.DrinkFour ? <span className="t-14 tlh-150 t-ellipsis">x{order.drinkItems.DrinkFour} Drink 4</span> : ""
                            }
                        </div>
                    </div>)}
                    {order?.dessertItems && (<div className="flex g-16">
                        <CookieIcon />
                        <div className="flex flex-col">
                            {
                                order?.dessertItems?.DessertOne ? <span className="t-14 tlh-150 t-ellipsis">x{order.dessertItems.DessertOne} Dessert 1</span> : ""
                            }
                            {
                                order?.dessertItems?.DessertTwo ? <span className="t-14 tlh-150 t-ellipsis">x{order.dessertItems.DessertTwo} Dessert 2</span> : ""
                            }
                            {
                                order?.dessertItems?.DessertThree ? <span className="t-14 tlh-150 t-ellipsis">x{order.dessertItems.DessertThree} Dessert 3</span> : ""
                            }
                            {
                                order?.dessertItems?.DessertFour ? <span className="t-14 tlh-150 t-ellipsis">x{order.dessertItems.DessertFour} Dessert 4</span> : ""
                            }
                        </div>
                    </div>)}
                </div>
                <Tag text={`${order.cookTime.toString()} min`} color="black" bgColor="white" />
            </div>
            <div className="flex jc-space-between g-8">
                <div className="flex flex-col g-16">
                    {order?.address && (
                        <div className="flex g-16">
                            <MapPinIcon/>
                            <div className="flex flex-col">
                                <span className="t-14 tlh-150 t-ellipsis">{order.address.number} {order.address.street} {order.address.postCode} {order.address.city}</span>
                            </div>
                        </div>
                    )}
                </div>
                <Tag text={`2 min`} color="black" bgColor="white" />
            </div>
        </div>
    ) : 
    (
        <div>
            Order not found
        </div>
    );
}