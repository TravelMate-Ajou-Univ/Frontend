import { BsSearch } from "react-icons/bs";

interface Props {
  className?: string;
}

export default function SearchIcon({ className = "" }: Props) {
  return (
    <BsSearch
      className={`md:w-6 w-4 md:h-6 h-4 text-[#60798D] + ${className}`}
    />
  );
}
