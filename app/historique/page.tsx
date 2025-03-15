"use client";

import { use, useEffect, useState } from "react";
import StatsBar from "../components/StatsBar";
import StatsItem from "../components/StatsItem";
import { useSimulationsStore } from "../store/simulations";

export default function Historique() {
  const { addSimulation } = useSimulationsStore();
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);

    const fetchSimulations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/simulations?page=1&limit=10");
        const data = await response.json();

        data.forEach((simulation: any) => {
          addSimulation(simulation);
        });
      } catch (error) {
        console.log("Error fetching simulations:", error);
      }
    };

    fetchSimulations();
  }, []);

  return (
    <>{
      domLoaded &&
      <div className="flex flex-col g-16 h-100 p-32">
        <div style={{ height: "32px" }} className="flex jc-space-between ai-center g-16">
          <span className="c-white tw-600">Simulations</span>
        </div>
        <StatsBar />
        <div className="flex flex-col gap-8">
            {
              Array.from(new Map(useSimulationsStore.getState().simulations.map(simulation => [simulation.id, simulation])).values())
                .sort((a, b) => new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime())
                .map((simulation, index) => (
                  <StatsItem key={index} simulation={simulation} index={index + 1} />
                ))
            }
        </div>
      </div>
    }</>
  );
}