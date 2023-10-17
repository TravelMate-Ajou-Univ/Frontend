import { AiOutlineMinus } from "react-icons/ai";

type Props = {
  downSize: () => void;
};

export default function MinusIcon({ downSize }: Props) {
  return (
    <AiOutlineMinus
      className="w-full h-full p-2 border-b-2"
      onClick={downSize}
    />
  );
}
