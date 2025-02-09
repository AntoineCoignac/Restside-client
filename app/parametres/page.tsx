"use client";

import { UserIcon } from "@heroicons/react/20/solid";
import { useCooksStore } from "../store/cooks";
import { useDeliverymenStore } from "../store/deliverymen";
import EmployeeItem from "../components/EmployeeItem";
import { useEffect, useState } from "react";

export default function Parametres() {
  const cooks = useCooksStore((state) => state.cooks);
  const deliverymen = useDeliverymenStore((state) => state.deliverymen);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);


  return (
    <>
      {domLoaded &&
        <div className="flex h-full">
          <div style={{ width: "400px", minWidth: "400px" }} className="flex flex-col g-16 p-32 b-right">
            <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
              <span className="c-white tw-600">Paramètres de la simulation</span>
            </div>
            <div className="flex flex-col g-24">
              <div className="field">
                <label htmlFor="nbordersmin">Nombre de commandes minimum</label>
                <input placeholder={"10"} defaultValue={10} type="number" name="nbordersmin" />
              </div>
              <div className="field">
                <label htmlFor="nbordersmax">Nombre de commandes maximum</label>
                <input placeholder={"20"} defaultValue={20} type="number" name="nbordersmax" />
              </div>
              <div className="field">
                <label htmlFor="starttime">Début du service</label>
                <input defaultValue="18:00" type="time" name="starttime" />
              </div>
              <div className="field">
                <label htmlFor="endtime">Fin du service</label>
                <input defaultValue="23:00" type="time" name="endtime" />
              </div>
              <div className="field">
                <label htmlFor="duration">Durée de la simulation (secondes)</label>
                <input placeholder="180" defaultValue={180} type="number" name="duration" />
              </div>
            </div>
          </div>
          <div className="flex g-32 p-32 w-100">
            <div className="flex flex-col w-100 g-16">
              <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
                <span className="c-white tw-600">Cusiniers</span>
                <div className="flex ai-center">
                  <UserIcon className="c-white" />
                  <input style={{ width: "43px" }} min={1} max={99} type="number" placeholder="4" defaultValue={4} className="transparent-input" />
                </div>
              </div>
              {
                cooks.map((cook) => (
                  <EmployeeItem key={cook.id} employee={cook} handleDelete={() => { }} />
                ))
              }
            </div>
            <div className="flex flex-col w-100 g-16">
              <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
                <span className="c-white tw-600">Livreurs</span>
                <div className="flex ai-center">
                  <UserIcon className="c-white" />
                  <input style={{ width: "43px" }} min={1} max={99} type="number" placeholder="4" defaultValue={4} className="transparent-input" />
                </div>
              </div>
              {
                deliverymen.map((deliveryman) => (
                  <EmployeeItem key={deliveryman.id} employee={deliveryman} handleDelete={() => { }} />
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}