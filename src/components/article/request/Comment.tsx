import { User } from "@/model/user";
import Image from "next/image";
import DefaultProfile from "/public/image/defaultProfileImg.png";

interface Props {
  requestUser: User;
  requestComment: string;
}

export default function Comment({ requestUser, requestComment }: Props) {
  return (
    <section className="my-3">
      <h2 className="text-xl font-semibold mb-2">코멘트</h2>
      <div className="bg-white px-3 py-4 border">
        {requestUser && (
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 overflow-hidden rounded-full w-10 h-10 p-1">
              <Image
                src={
                  requestUser.profileImageId === ""
                    ? DefaultProfile
                    : process.env.NEXT_PUBLIC_SERVER_BASE_URL +
                      "attachments/" +
                      requestUser?.profileImageId
                }
                alt="프로필 이미지"
              />
            </div>
            <p>{requestUser?.userName}</p>
          </div>
        )}
        <p className="mt-3">{requestComment}</p>
      </div>
    </section>
  );
}
