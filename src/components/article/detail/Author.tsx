import { User } from "@/model/user";
import {
  getBookmarkCollectionsById,
  getUserInfoById
} from "@/service/axios/userSign";
import { useEffect, useState } from "react";
import DefaultProfile from "/public/image/defaultProfileImg.png";
import Image from "next/image";
import Link from "next/link";
import useOutSideRef from "@/hooks/useClickOutside";
import { changProfileIdToProfileUrl } from "@/service/axios/profile";

interface Props {
  authorId: number;
}

export default function Author({ authorId }: Props) {
  const [author, setAuthor] = useState<User>({
    id: -1,
    userName: "",
    profileImageId: ""
  });
  const [bookmarkCollections, setBookmarkCollections] = useState<
    { id: number; title: string }[]
  >([]);
  const [isBookmarkCollectionsOpen, setIsBookmarkCollectionsOpen] =
    useState<boolean>(false);
  const ref = useOutSideRef(() => setIsBookmarkCollectionsOpen(false));

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserInfoById(authorId);
      if (!user) return;
      setAuthor(user);
      const data = await getBookmarkCollectionsById(authorId);
      if (!data) return;
      setBookmarkCollections(data);
    };

    getUser();
  }, [authorId]);

  return (
    <div className="relative flex flex-col items-center gap-2" ref={ref}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsBookmarkCollectionsOpen(!isBookmarkCollectionsOpen)}
        title="북마크 컬렉션 보기"
      >
        <div
          className={`bg-gray-200 overflow-hidden rounded-full md:w-8 md:h-8 w-6 h-6 ${
            author.profileImageId === "" ? "p-1" : ""
          }`}
        >
          <Image
            src={
              author.profileImageId === ""
                ? DefaultProfile
                : changProfileIdToProfileUrl(Number(author.profileImageId))
            }
            alt="프로필 이미지"
            width={40}
            height={40}
          />
        </div>
        <span className="md:text-base text-sm">{author.userName}</span>
      </div>
      {isBookmarkCollectionsOpen && (
        <ul className="absolute md:top-9 top-7 flex flex-col items-center w-full border divide-y md:text-sm text-xs text-gray-500 text-center bg-white">
          {bookmarkCollections.length === 0 ? (
            <div>
              <p>보유하고 있는</p>
              <p>북마크 컬렉션이 없습니다.</p>
            </div>
          ) : (
            bookmarkCollections.map(bookmarkCollection => (
              <li
                className="py-1 w-full hover:bg-gray-100"
                key={bookmarkCollection.id}
              >
                <Link href={`/bookmark/${bookmarkCollection.id}`}>
                  <p>{bookmarkCollection.title}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
