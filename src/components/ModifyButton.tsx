import { Pin } from "@/model/bookmark";
import { deleteCollection, modifyCollection } from "@/service/bookmark";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";

type Props = {
  id: number;
  title: string;
  visibility: string;
  addPins: Pin[];
  subPins: Number[];
  modifyState: Boolean;
  setModifyState: (state: SetStateAction<boolean>) => void;
};
export default function ModifyButton({
  id,
  title,
  visibility,
  addPins,
  subPins,
  modifyState,
  setModifyState
}: Props) {
  const router = useRouter();

  const deleteHandler = async () => {
    const result = confirm(`${title} bookmark를 삭제하시겠습니까?`);

    if (result === true) {
      await deleteCollection(id);
      router.push("/bookmark/list/ALL");
    }
  };

  const toggleHandler = () => {
    setModifyState(!modifyState);
  };

  const modifyHandler = async () => {
    const result = confirm(`${title} bookmark를 수정하시겠습니까?`);
    if (result === false) {
      return;
    }
    await modifyCollection(id, title, visibility, addPins, subPins);
    toggleHandler();
    router.push(
      `/bookmark/${title}?title=${title}&visibility=${visibility}&id=${id}`
    );
  };
  return (
    <div className="self-end flex font-bold gap-3 mr-[13rem]">
      <button
        onClick={deleteHandler}
        className="border-2 px-3 py-2 rounded-lg hover:text-red-400"
      >
        삭제
      </button>
      {modifyState ? (
        <button
          onClick={modifyHandler}
          className="border-2 px-3 py-2 rounded-lg hover:text-red-400"
        >
          완료
        </button>
      ) : (
        <button
          onClick={toggleHandler}
          className="border-2 px-3 py-2 rounded-lg hover:text-red-400"
        >
          수정
        </button>
      )}
    </div>
  );
}
