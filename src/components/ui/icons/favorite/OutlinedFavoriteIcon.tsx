import { IoFlagOutline } from "react-icons/io5";

interface Props {
  className?: string;
}

export default function OutlinedFavoriteIcon({ className = "" }: Props) {
  return <IoFlagOutline className={className + " text-secondary w-6 h-6"} />;
}
