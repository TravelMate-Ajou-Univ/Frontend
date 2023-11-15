import { ChangeEvent, SyntheticEvent, useState } from "react";
import PublicIcon from "./ui/icons/PublicIcon";
import PrivateIcon from "./ui/icons/PrivateIcon";
import FriendsOnlyIcon from "./ui/icons/FriendsOnlyIcon";
import { addCollection } from "@/service/axios/bookmark";
import { useDispatch } from "react-redux";
import { addBookmarkCollection } from "@/redux/features/bookmarkCollectionListSlice";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  toggleButton: () => void;
};

export default function CollectionModal({ toggleButton }: Props) {
  const dispatch = useDispatch();
  const { view } = useAppSelector(state => state.bookmarkCollectionListSlice);
  const visible_scopes = [
    {
      icon: <PrivateIcon />,
      value: "PRIVATE",
      description: "나만 공개"
    },
    {
      icon: <FriendsOnlyIcon />,
      value: "FRIENDS_ONLY",
      description: "친구 공개"
    },
    {
      icon: <PublicIcon />,
      value: "PUBLIC",
      description: "모두 공개"
    }
  ];
  const [visible, setVisible] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    visible: ""
  });
  const visibleSetting = (value: string, e: SyntheticEvent) => {
    setVisible(value);
    setForm(prev => ({ ...prev, visible: value }));
  };
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (form.visible === "") {
      alert("공개 범위를 설정하지 않았습니다.");
      return;
    }
    const res = await addCollection(form);
    if (res === null) {
      alert("생성 실패!");
    } else if (view === "all" || view === res?.visibility.toLowerCase()) {
      dispatch(addBookmarkCollection(res));
    }
    toggleButton();
  };

  return (
    <form className="absolute right-0 w-[12rem] mt-[1rem] flex flex-col p-3 items-center border-2 border-neutral-300 z-10 bg-white">
      <input
        className="w-full m-1 outline-none p-3 border-2 text-sm"
        type="text"
        id="title"
        name="title"
        placeholder="북마크 컬렉션 제목..."
        required
        value={form.title}
        onChange={onChange}
      />
      <p className="self-start my-1">공개 범위</p>
      <ul className="flex gap-2">
        {visible_scopes.map((scope, index) => (
          <li
            key={index}
            onClick={e => {
              visibleSetting(scope.value, e);
            }}
          >
            {visible === scope.value ? (
              <div className="flex flex-col items-center gap-1">
                <div className="text-yellow-600">{scope.icon}</div>
                <p className="text-xs">{scope.description}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1">
                <div>{scope.icon}</div>
                <p className="text-xs">{scope.description}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex self-end font-bold gap-3 mr-1 mt-1">
        <button onClick={toggleButton} className="hover:text-red-400">
          취소
        </button>
        <button onClick={onSubmit} className="hover:text-red-400">
          추가
        </button>
      </div>
    </form>
  );
}
