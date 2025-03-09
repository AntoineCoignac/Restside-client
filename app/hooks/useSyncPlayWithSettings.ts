import { useEffect } from "react";
import { usePlayStore } from "../store/play";
import { useSettingsStore } from "../store/settings";

export function useSyncPlayWithSettings() {
  useEffect(() => {
    const { simulationId, setStartTime, setEndTime, setDuration, setCurrentTime, setStatus } = usePlayStore.getState();
    const { startTime, endTime, duration } = useSettingsStore.getState();

    if (simulationId) {
      setStartTime(startTime);
      setEndTime(endTime);
      setDuration(duration);
      setCurrentTime(startTime);
      setStatus("notStarted");
    }
  }, [usePlayStore.getState().simulationId]);
}