import { BsSearch } from "react-icons/bs";

interface Props {
  className?: string;
}

export default function SearchIcon({ className = "" }: Props) {
  return <BsSearch className={`w-6 h-6 text-[#60798D] + ${className}`} />;
}
