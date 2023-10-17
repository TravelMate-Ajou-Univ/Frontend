import { AiOutlinePlus } from "react-icons/ai";

export default function PlusIcon() {
  return (
    <AiOutlinePlus
      onClick={() => {
        console.log("hi");
      }}
    />
  );
}
