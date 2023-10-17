import React from "react";
import PlusIcon from "./icons/PlusIcon";
import MinusIcon from "./icons/MinusIcon";
import GpsIcon from "./icons/GpsIcon";

export default function MapMenuButton() {
  return (
    <div className="absolute left-3 top-2 z-10 flex flex-col gap-2 p-2 bg-white rounded-sm text-slate-500 opacity-70">
      <PlusIcon />
      <MinusIcon />
      <GpsIcon />
    </div>
  );
}
