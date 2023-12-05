import { ArticleRequestType } from "@/model/article";
import { User } from "@/model/user";
import { getUserInfoById } from "@/service/axios/userSign";
import Image from "next/image";
import { useEffect, useState } from "react";
import DefaultProfile from "/public/image/defaultProfileImg.png";
import { initialUser } from "@/redux/features/userSlice";
import Link from "next/link";
import { changProfileIdToProfileUrl } from "@/service/axios/profile";

interface Props {
  request: ArticleRequestType;
}

export default function RequestPreview({ request }: Props) {
  const [user, setUser] = useState<User>(initialUser);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const getAuthor = async () => {
      const data = await getUserInfoById(request.userId);
      if (!data) return;
      setUser(data);
    };

    getAuthor();
    const curTime = new Date(request.updatedAt).toLocaleString().split(" ");
    setDate(curTime[0] + " " + curTime[1] + " " + curTime[2]);
    setTime(
      curTime[3] +
        " " +
        curTime[4].split(":")[0] +
        ":" +
        curTime[4].split(":")[1]
    );
  }, [request]);

  return (
    <Link
      className="w-full bg-white p-4 flex flex-col gap-4 shadow-md rounded-lg hover:shadow-lg ease-in-out transition-all"
      href={`/article/request/${request.articleId}/${request.id}`}
    >
      <section className="flex items-center gap-2">
        <div className="bg-gray-200 overflow-hidden rounded-full w-10 h-10 p-1">
          <Image
            src={
              user.profileImageId === ""
                ? DefaultProfile
                : changProfileIdToProfileUrl(Number(user.profileImageId))
            }
            alt="프로필 이미지"
          />
        </div>
        <p className="flex-grow">{user.userName}</p>
        <section className="text-gray-600 text-sm text-end leading-4">
          <p>{date}</p>
          <p>{time}</p>
        </section>
      </section>
      {request.comment && (
        <article className="bg-black/5 border p-2 whitespace-pre-wrap">
          {request.comment}
        </article>
      )}
    </Link>
  );
}
