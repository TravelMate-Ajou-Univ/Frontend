import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  upSize: () => void;
};
export default function PlusIcon({ upSize }: Props) {
  return (
    <AiOutlinePlus className="w-full h-full p-2 border-b-2" onClick={upSize} />
  );
}
