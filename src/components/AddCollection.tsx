import { ChangeEvent, useState } from "react";
import PublicIcon from "./ui/icons/PublicIcon";
import PrivateIcon from "./ui/icons/PrivateIcon";
import FriendsOnlyIcon from "./ui/icons/FriendsOnlyIcon";
import axios from "axios";

type Props = {
  toggleButton: () => void;
};

export default function AddCollection({ toggleButton }: Props) {
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
  const visibleSetting = (value: string, e: any) => {
    setVisible(value);
    setForm(prev => ({ ...prev, visible: value }));
  };
  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  const onSubmit = () => {
    axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collection`,
      data: {
        title: form.title,
        visibility: form.visible
      }
    })
      .then(res => console.log)
      .catch(err => console.log);
  };
  return (
    <form className="absolute w-[13rem] ml-[-4rem] mt-[1rem] flex flex-col p-3 items-center border-2 border-neutral-300 z-10 bg-white">
      <input
        className="w-full m-1 outline-none p-3 border-2"
        type="text"
        id="title"
        name="title"
        placeholder="북마크 제목..."
        required
        value={form.title}
        onChange={onChange}
      />
      <p className="self-start my-1">공개 범위</p>
      <ul className="flex gap-3">
        {visible_scopes.map((scope, index) => (
          <li
            className="flex flex-col items-center"
            key={index}
            onClick={e => {
              visibleSetting(scope.value, e);
            }}
          >
            {visible === scope.value ? (
              <div className="text-yellow-600">{scope.icon}</div>
            ) : (
              <div>{scope.icon}</div>
            )}
            <p className="text-xs">{scope.description}</p>
          </li>
        ))}
      </ul>
      <div className="flex self-end font-bold gap-3 mr-1">
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
