import { checkDuplicateName } from "@/service/axios/profile";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {
  nickname: string;
  setNickname: (name: string) => void;
};

type BannerData = {
  message: string;
  status: "success" | "fail";
};

export default function NicknameForm({ nickname, setNickname }: Props) {
  const [banner, setBanner] = useState<BannerData | null>();
  const formhandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkDuplicateName(nickname)
      .then(res => {
        setBanner({ message: "사용가능한 닉네임입니다.", status: "success" });
      })
      .catch(err => {
        setBanner({
          message: err.response.data.message as string,
          status: "fail"
        });
      })
      .finally(() => {
        setTimeout(() => {
          setBanner(null);
        }, 3000);
      });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = e.target;
    setNickname(value);
  };

  return (
    <form onSubmit={formhandler}>
      <input
        type="text"
        value={nickname}
        onChange={onChange}
        className="text-3xl font-bold text-center"
      />
      {banner ? (
        banner.status === "success" ? (
          <p className="text-green-400">{banner.message}</p>
        ) : (
          <p className="text-red-400">{banner.message}</p>
        )
      ) : null}
    </form>
  );
}
