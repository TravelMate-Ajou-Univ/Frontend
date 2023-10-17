import { MdGpsFixed } from "react-icons/md";

type Props = {
  gpsToggle: boolean;
  toggleGPS: () => void;
};
export default function GpsIcon({ gpsToggle, toggleGPS }: Props) {
  return (
    <MdGpsFixed
      className={`w-full h-full p-2 ${getGpsStyle(gpsToggle)}`}
      onClick={toggleGPS}
    />
  );
}

function getGpsStyle(toggle: boolean): string {
  return toggle ? "text-red-600" : "";
}
