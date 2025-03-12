import { MapPinIcon, TicketIcon } from "@heroicons/react/20/solid";
import { Cook } from "../store/cooks";
import Tag from "./Tag";
import ProgressTimeBarLittle from "./ProgressTimeBarLittle";

interface CookCardProps {
    cook: Cook;
}

export default function CookCard({cook} : CookCardProps) {

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

    return cook!=undefined ? (
        <div className="w-100 b bg-dark p-24 br-8 flex flex-col g-16">
            <div style={{height: "24px"}} className="w-100 flex jc-space-between ai-center g-8">
                <div className="flex ai-center g-12">
                    <img style={{width: "24px", minWidth: "24px", height: "24px"}} className="br-24" src={`https://www.tapback.co/api/avatar/${cook.name.toLowerCase().replaceAll(" ", "")}.webp`} alt={cook.name} />
                    <span className="c-white">{cook.name}</span>
                </div>
                <Tag text={statusToCookText(cook.status)} color={statusToCookColor(cook.status)} bgColor={`${statusToCookColor(cook.status)}-20`} />
            </div>
            <div className="flex jc-space-between g-8">
                <div className="flex g-16">
                    <TicketIcon/>
                    <div className="flex flex-col">
                        <span className="t-14 tlh-150 t-ellipsis">Commande de John</span>
                    </div>
                </div>
            </div>
            <div className="w-100 tabulation">
                <ProgressTimeBarLittle startTime={"2025-01-11T18:22:00.7849703Z"} endTime={"2025-01-11T18:42:00.7849703Z"} currentTime={"2025-01-11T18:32:45.7849703Z"} />
            </div>
            <div className="flex jc-space-between g-8">
                <div className="flex g-16">
                    <MapPinIcon/>
                    <div className="flex flex-col">
                        <span className="t-14 tlh-150 t-ellipsis">12 Avenue de Fougères 53000 Laval</span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>
            Order not found
        </div>
    );
}