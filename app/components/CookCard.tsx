import { MapPinIcon, TicketIcon } from "@heroicons/react/20/solid";
import { Cook } from "../store/cooks";
import Tag from "./Tag";
import ProgressTimeBarLittle from "./ProgressTimeBarLittle";
import { useCookOrderRelationsStore } from "../store/relation/cookOrderRelations";
import { useOrdersStore } from "../store/orders";
import { usePlayStore } from "../store/play";

interface CookCardProps {
    cook: Cook;
}

export default function CookCard({ cook }: CookCardProps) {
    const cookOrderRelations = useCookOrderRelationsStore((state) => state.cookOrderRelations);
    const orders = useOrdersStore((state) => state.orders);

    const cookOrderRelation = cookOrderRelations.find((relation) => relation.cookId === cook.id);

    const order = cookOrderRelation ? orders.find((order) => order.id === cookOrderRelation.orderId) : null;

    const statusToCookColor = (status: string) => {
        switch (status) {
            case "pending":
                return "grey";
            case "cooking":
                return "orange";
            default:
                return "grey";
        }
    }

    const statusToCookText = (status: string) => {
        switch (status) {
            case "pending":
                return "Ne fait rien";
            case "cooking":
                return "En cuisine";
            default:
                return "Ne fait rien";
        }
    }

    return cook != undefined ? (
        <div className="w-100 b bg-dark p-24 br-8 flex flex-col g-16">
            <div style={{ height: "24px" }} className="w-100 flex jc-space-between ai-center g-8">
                <div className="flex ai-center g-12">
                    <img style={{ width: "24px", minWidth: "24px", height: "24px" }} className="br-24" src={`https://www.tapback.co/api/avatar/${cook.name.toLowerCase().replaceAll(" ", "")}.webp`} alt={cook.name} />
                    <span className="c-white">{cook.name}</span>
                </div>
                <Tag text={statusToCookText(cook.status)} color={statusToCookColor(cook.status)} bgColor={`${statusToCookColor(cook.status)}-20`} />
            </div>
            {order && cookOrderRelation && (
                <>
                    <div className="flex jc-space-between g-8">
                        <div className="flex g-16">
                            <TicketIcon />
                            <div className="flex flex-col">
                                <span className="t-14 tlh-150 t-ellipsis">Commande de {order.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-100 tabulation">
                        <ProgressTimeBarLittle startTime={cookOrderRelation.startDateTime} endTime={cookOrderRelation.endDateTime} currentTime={usePlayStore.getState().currentTime} />
                    </div>
                    {order.deliveryTime > 0 && (
                        <div className="flex jc-space-between g-8">
                            <div className="flex g-16">
                                <MapPinIcon />
                                <div className="flex flex-col">
                                    <span className="t-14 tlh-150 t-ellipsis">{order.address?.number} {order.address?.street} {order.address?.postCode} {order.address?.city}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </>)}
        </div>
    ) : (
        <div>
            Order not found
        </div>
    );
}