import { AiOutlineClose } from "react-icons/ai";

interface Props {
  onClick?: () => void;
}

export default function XIcon({ onClick }: Props) {
  return (
    <button onClick={onClick ? onClick : () => {}}>
      <AiOutlineClose />
    </button>
  );
}
