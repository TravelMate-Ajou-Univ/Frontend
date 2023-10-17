import FallIcon from "./icons/FallIcon";
import SpringIcon from "./icons/SpringIcon";
import SummerIcon from "./icons/SummerIcon";
import WinterIcon from "./icons/WinterIcon";

export default function SeasonButton() {
  return (
    <div className="absolute right-3 top-2 z-10 flex flex-col w-12 bg-white rounded-sm opacity-70">
      <SpringIcon />
      <SummerIcon />
      <FallIcon />
      <WinterIcon />
    </div>
  );
}
