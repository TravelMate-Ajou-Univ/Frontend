import { LiaMapMarkedAltSolid } from "react-icons/lia";

interface Props {
  isChatting?: boolean;
}

export default function MarkedMapIcon({ isChatting = false }: Props) {
  if (isChatting) return <LiaMapMarkedAltSolid className="w-6 h-6" />;
  else return <LiaMapMarkedAltSolid className="md:w-6 w-4 md:h-6 h-4" />;
}
