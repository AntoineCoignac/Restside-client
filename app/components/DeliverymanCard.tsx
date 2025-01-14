import { MapPinIcon, TicketIcon } from "@heroicons/react/20/solid";
import Tag from "./Tag";
import ProgressTimeBar from "./ProgressTimeBar";
import { Deliveryman } from "../store/deliverymen";

interface DeliverymanCardProps {
    deliveryman: Deliveryman;
}

export default function DeliverymanCard({deliveryman} : DeliverymanCardProps) {

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
            <div className="flex jc-space-between g-8">
                <div className="flex g-16">
                    <TicketIcon/>
                    <div className="flex flex-col">
                        <span className="t-14 tlh-150 t-ellipsis">Commande de John</span>
                    </div>
                </div>
            </div>
            <div className="flex jc-space-between g-8">
                <div className="flex g-16">
                    <MapPinIcon/>
                    <div className="flex flex-col">
                        <span className="t-14 tlh-150 t-ellipsis">12 Avenue de Fougères 53000 Laval</span>
                    </div>
                </div>
            </div>
            <div className="w-100 tabulation">
                <ProgressTimeBar startTime={"2025-01-11T18:22:00.7849703Z"} endTime={"2025-01-11T18:42:00.7849703Z"} currentTime={"2025-01-11T18:32:45.7849703Z"} />
            </div>
        </div>
    ) : (
        <div>
            Order not found
        </div>
    );
}