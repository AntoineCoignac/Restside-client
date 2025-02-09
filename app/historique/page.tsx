"use client";

import { useEffect, useState } from "react";
import StatsBar from "../components/StatsBar";
import StatsItem from "../components/StatsItem";
import { useSimulationsStore } from "../store/simulations";

export default function Historique() {
  const simulations = useSimulationsStore(state => state.simulations);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
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
            simulations.map((simulation, index) => (
              <StatsItem key={simulation.id} simulation={simulation} index={index + 1} />
            ))
          }
        </div>
      </div>
    }</>
  );
}