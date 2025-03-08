"use client";

import { UserIcon } from "@heroicons/react/20/solid";
import { useCooksStore } from "../store/cooks";
import { useDeliverymenStore } from "../store/deliverymen";
import EmployeeItem from "../components/EmployeeItem";
import { useEffect, useState } from "react";
import { useSettingsStore } from "../store/settings";
import { v4 as uuidv4 } from 'uuid';
import {faker} from "@faker-js/faker";
import { endOfDay } from "date-fns";

export default function Parametres() {
  const cooks = useCooksStore((state) => state.cooks);
  const deliverymen = useDeliverymenStore((state) => state.deliverymen);
  const addCook = useCooksStore((state) => state.addCook);
  const addDeliveryman = useDeliverymenStore((state) => state.addDeliveryman);
  const removeCook = useCooksStore((state) => state.removeCook);
  const removeDeliveryman = useDeliverymenStore((state) => state.removeDeliveryman);

  const [domLoaded, setDomLoaded] = useState(false);
  const [cookCount, setCookCount] = useState(cooks.length);
  const [deliverymanCount, setDeliverymanCount] = useState(deliverymen.length);

  const {
    nbOrdersMin,
    nbOrdersMax,
    startTime,
    endTime,
    duration,
    setNbOrdersMin,
    setNbOrdersMax,
    setStartTime,
    setEndTime,
    setDuration,
  } = useSettingsStore();

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    console.log("Settings updated:", {
      nbOrdersMin,
      nbOrdersMax,
      startTime,
      endTime,
      duration,
    });
  }, [nbOrdersMin, nbOrdersMax, startTime, endTime, duration]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "nbordersmin":
        setNbOrdersMin(Number(value));
        break;
      case "nbordersmax":
        setNbOrdersMax(Number(value));
        break;
      case "starttime":
        setStartTime(`${new Date().toISOString().split('T')[0]}T${value}:00Z`);
        break;
      case "endtime":
        setEndTime(`${new Date().toISOString().split('T')[0]}T${value}:00Z`);
        break;
      case "duration":
        setDuration(Number(value));
        break;
      default:
        break;
    }
  };

  const handleCookCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);
    setCookCount(count);
    const currentCount = cooks.length;
    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        addCook({ id: uuidv4(), name: faker.person.firstName(), status: "pending" });
      }
    } else {
      for (let i = currentCount; i > count; i--) {
        removeCook(cooks[i - 1].id);
      }
    }
  };

  const handleDeliverymanCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Number(e.target.value);
    setDeliverymanCount(count);
    const currentCount = deliverymen.length;
    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        addDeliveryman({ id: uuidv4(), name: faker.person.firstName(), status: "pending" });
      }
    } else {
      for (let i = currentCount; i > count; i--) {
        removeDeliveryman(deliverymen[i - 1].id);
      }
    }
  };

  const handleCookDelete = (id: string) => {
    removeCook(id);
    setCookCount(cooks.length - 1);
  };

  const handleDeliverymanDelete = (id: string) => {
    removeDeliveryman(id);
    setDeliverymanCount(deliverymen.length - 1);
  };

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
                <input placeholder={"10"} value={nbOrdersMin} type="number" name="nbordersmin" onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="nbordersmax">Nombre de commandes maximum</label>
                <input placeholder={"20"} value={nbOrdersMax} type="number" name="nbordersmax" onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="starttime">Début du service</label>
                <input defaultValue={new Date(startTime).toISOString().substring(11, 16)} type="time" name="starttime" onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="endtime">Fin du service</label>
                <input defaultValue={new Date(endTime).toISOString().substring(11, 16)} type="time" name="endtime" onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="duration">Durée de la simulation (secondes)</label>
                <input placeholder="180" value={duration} type="number" name="duration" onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="flex g-32 p-32 w-100">
            <div className="flex flex-col w-100 g-16">
              <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
                <span className="c-white tw-600">Cusiniers</span>
                <div className="flex ai-center">
                  <UserIcon className="c-white" />
                  <input style={{ width: "43px" }} min={1} max={99} type="number" placeholder="4" value={cookCount} onChange={handleCookCountChange} className="transparent-input" />
                </div>
              </div>
              {
                cooks.map((cook) => (
                  <EmployeeItem key={cook.id} employee={cook} handleDelete={handleCookDelete} />
                ))
              }
            </div>
            <div className="flex flex-col w-100 g-16">
              <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
                <span className="c-white tw-600">Livreurs</span>
                <div className="flex ai-center">
                  <UserIcon className="c-white" />
                  <input style={{ width: "43px" }} min={1} max={99} type="number" placeholder="4" value={deliverymanCount} onChange={handleDeliverymanCountChange} className="transparent-input" />
                </div>
              </div>
              {
                deliverymen.map((deliveryman) => (
                  <EmployeeItem key={deliveryman.id} employee={deliveryman} handleDelete={handleDeliverymanDelete} />
                ))
              }
            </div>
          </div>
        </div>
      }
    </>
  );
}