import { AdminListType } from "@/model/admin";

interface Props {
  listType: AdminListType;
  setListType: (type: AdminListType) => void;
}

const BUTTON_CLASS = "w-full h-12 flex-grow ";

export default function ListTypeNav({ listType, setListType }: Props) {
  return (
    <nav className="w-full flex border-2 divide-x-2">
      <button
        className={
          BUTTON_CLASS + (listType === "USER" ? "bg-gray-200" : "bg-white")
        }
        onClick={() => setListType("USER")}
      >
        유저
      </button>
      <button
        className={
          BUTTON_CLASS +
          (listType === "USER_REPORT" ? "bg-gray-200" : "bg-white")
        }
        onClick={() => setListType("USER_REPORT")}
      >
        유저 신고 목록
      </button>
      <button
        className={
          BUTTON_CLASS +
          (listType === "ARTICLE_REPORT" ? "bg-gray-200" : "bg-white")
        }
        onClick={() => setListType("ARTICLE_REPORT")}
      >
        게시글 신고 목록
      </button>
    </nav>
  );
}
