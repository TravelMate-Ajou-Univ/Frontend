import { useAppSelector } from "@/hooks/redux";
import { deleteCollection, modifyCollection } from "@/service/axios/bookmark";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";

type Props = {
  id: number;
  title: string;
  visibility: string;
  modifyState: Boolean;
  setModifyState: (state: SetStateAction<boolean>) => void;
};
export default function BookmarkButton({
  id,
  title,
  visibility,
  modifyState,
  setModifyState
}: Props) {
  const { deleteBookmarks, pins } = useAppSelector(state => state.mapSlice);
  const router = useRouter();

  const deleteHandler = async () => {
    const answer = confirm(`${title} bookmark를 삭제하시겠습니까?`);

    if (answer === true) {
      await deleteCollection(id);
      router.push("/bookmark/list/me/all");
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
    await modifyCollection(id, title, visibility, pins, deleteBookmarks);

    toggleHandler();
  };
  return (
    <div className="self-end">
      {modifyState ? (
        <div className="flex self-end font-bold gap-3">
          <button
            onClick={toggleHandler}
            className="border-2 px-3 py-2 rounded-lg hover:text-red-400"
          >
            취소
          </button>
          <button
            onClick={modifyHandler}
            className="border-2 px-3 py-2 rounded-lg hover:text-red-400"
          >
            완료
          </button>
        </div>
      ) : (
        <div className="flex self-end font-bold gap-3">
          <button
            onClick={deleteHandler}
            className="border-2 px-3 py-2 rounded-lg hover:text-red-400"
          >
            삭제
          </button>
          <button
            onClick={toggleHandler}
            className="border-2 px-3 py-2 rounded-lg hover:text-red-400"
          >
            수정
          </button>
        </div>
      )}
    </div>
  );
}
