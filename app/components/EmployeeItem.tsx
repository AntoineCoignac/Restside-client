import { XMarkIcon } from "@heroicons/react/20/solid";
import { Cook } from "../store/cooks";
import { Deliveryman } from "../store/deliverymen";

interface EmployeeItemProps {
    employee: Cook | Deliveryman;
    handleDelete: (id: string) => void;
}

export default function EmployeeItem({employee, handleDelete} : EmployeeItemProps) {
    return (
        <div className="flex br-8 ai-center jc-space-between g-16 b bg-dark p-24">
            <div className="flex ai-center g-12">
                <img loading="eager" style={{width: "24px", minWidth: "24px", height: "24px"}} className="br-24" src={`https://www.tapback.co/api/avatar/${employee.name.toLowerCase().replaceAll(" ", "")}.webp`} alt={employee.name} />
                <span className="c-white">{employee.name}</span>
            </div>
            <button onClick={() => handleDelete(employee.id)} style={{width: "24px", minWidth: "24px", height: "24px"}} className="flex ai-center jc-center c-grey">
                <XMarkIcon/>
            </button>
        </div>
    )
}