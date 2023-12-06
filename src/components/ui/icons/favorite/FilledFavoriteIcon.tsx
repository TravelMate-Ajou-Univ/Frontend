import { IoFlag } from "react-icons/io5";

interface Props {
  className?: string;
}

export default function FilledFavoriteIcon({ className = "" }: Props) {
  return (
    <IoFlag className={className + " text-secondary md:w-6 w-4 md:h-6 h-4"} />
  );
}
