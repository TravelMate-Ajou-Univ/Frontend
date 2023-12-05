import { AiOutlineAlert } from "react-icons/ai";

interface Props {
  className?: string;
}

export default function AlertIcon({ className = "" }: Props) {
  return <AiOutlineAlert className={`${className} text-red-400 w-6 h-6`} />;
}
