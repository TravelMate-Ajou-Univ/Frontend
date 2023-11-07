import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  onClick?: () => void;
  noBorder?: boolean;
};
export default function PlusIcon({ onClick, noBorder = false }: Props) {
  return (
    <AiOutlinePlus
      className={`w-full h-full p-2 ${!noBorder && "border-b-2"}`}
      onClick={onClick ? onClick : () => {}}
    />
  );
}
