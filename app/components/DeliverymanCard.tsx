import { MapPinIcon, TicketIcon } from "@heroicons/react/20/solid";
import Tag from "./Tag";
import { Deliveryman } from "../store/deliverymen";
import ProgressTimeBarLittle from "./ProgressTimeBarLittle";
import { useDeliverymanOrderRelationsStore } from "../store/relation/deliverymanOrderRelations";
import { useOrdersStore } from "../store/orders";
import { usePlayStore } from "../store/play";

interface DeliverymanCardProps {
    deliveryman: Deliveryman;
}

export default function DeliverymanCard({deliveryman} : DeliverymanCardProps) {
    const deliverymanOrderRelations = useDeliverymanOrderRelationsStore((state) => state.deliverymanOrderRelations);
    const orders = useOrdersStore((state) => state.orders);

    const deliverymanOrderRelation = deliverymanOrderRelations.find((relation) => relation.deliverymanId === deliveryman.id);

    const order = deliverymanOrderRelation ? orders.find((order) => order.id === deliverymanOrderRelation.orderId) : null;

    const statusToDeliveryColor = (status: string) => {
        switch (status) {
            case "pending":
                return "grey";
            case "delivering":
                return "orange";
            default:
                return "grey";
        }
    }

    const statusToDeliveryText = (status: string) => {
        switch (status) {
            case "pending":
                return "Ne fait rien";
            case "delivering":
                return "En livraison";
            default:
                return "Ne fait rien";
        }
    }

    return deliveryman!=undefined ? (
        <div className="w-100 b bg-dark p-24 br-8 flex flex-col g-16">
            <div style={{height: "24px"}} className="w-100 flex jc-space-between ai-center g-8">
                <div className="flex ai-center g-12">
                    <img style={{width: "24px", minWidth: "24px", height: "24px"}} className="br-24" src={`https://www.tapback.co/api/avatar/${deliveryman.name.toLowerCase().replaceAll(" ", "")}.webp`} alt={deliveryman.name} />
                    <span className="c-white">{deliveryman.name}</span>
                </div>
                <Tag text={statusToDeliveryText(deliveryman.status)} color={statusToDeliveryColor(deliveryman.status)} bgColor={`${statusToDeliveryColor(deliveryman.status)}-20`} />
            </div>
            {order && deliverymanOrderRelation && (
                <>
            <div className="flex jc-space-between g-8">
                <div className="flex g-16">
                    <TicketIcon/>
                    <div className="flex flex-col">
                        <span className="t-14 tlh-150 t-ellipsis">Commande de {order.name}</span>
                    </div>
                </div>
            </div>
            <div className="flex jc-space-between g-8">
                <div className="flex g-16">
                    <MapPinIcon/>
                    <div className="flex flex-col">
                        <span className="t-14 tlh-150 t-ellipsis">{order.address?.number} {order.address?.street} {order.address?.postCode} {order.address?.city}</span>
                    </div>
                </div>
            </div>
            <div className="w-100 tabulation">
                <ProgressTimeBarLittle startTime={deliverymanOrderRelation.startDateTime} endTime={deliverymanOrderRelation.endDateTime} currentTime={usePlayStore.getState().currentTime} />
            </div>
            </>)}
        </div>
    ) : (
        <div>
            Order not found
        </div>
    );
}