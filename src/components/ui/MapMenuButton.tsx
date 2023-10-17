import React from "react";
import PlusIcon from "./icons/PlusIcon";
import MinusIcon from "./icons/MinusIcon";
import GpsIcon from "./icons/GpsIcon";

type Props = {
  upSize: () => void;
  downSize: () => void;
  gpsToggle: boolean;
  toggleGPS: () => void;
};
export default function MapMenuButton({
  upSize,
  downSize,
  gpsToggle,
  toggleGPS
}: Props) {
  return (
    <div className="absolute left-3 top-2 z-10 flex flex-col w-12  bg-white rounded-sm text-slate-500">
      <PlusIcon upSize={upSize} />
      <MinusIcon downSize={downSize} />
      <GpsIcon gpsToggle={gpsToggle} toggleGPS={toggleGPS} />
    </div>
  );
}
