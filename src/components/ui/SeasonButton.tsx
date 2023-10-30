import FallIcon from "./icons/FallIcon";
import SpringIcon from "./icons/SpringIcon";
import SummerIcon from "./icons/SummerIcon";
import WinterIcon from "./icons/WinterIcon";

export default function SeasonButton() {
  const seasons = [
    {
      icon: <SpringIcon />
    },
    {
      icon: <SummerIcon />
    },
    {
      icon: <FallIcon />
    },
    {
      icon: <WinterIcon />
    }
  ];
  return (
    <ul className="absolute right-3 top-2 z-10 flex flex-col w-12 bg-white rounded-sm opacity-70">
      {seasons.map((season, index) => (
        <li key={index}>{season.icon}</li>
      ))}
    </ul>
  );
}
