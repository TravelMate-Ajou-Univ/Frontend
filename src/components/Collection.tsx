import { BookmarkCollection } from "@/model/bookmark";
import BookmarkCollectionIcon from "./ui/icons/BookmarkCollectionIcon";
import Link from "next/link";
import PublicIcon from "./ui/icons/PublicIcon";
import FriendsOnlyIcon from "./ui/icons/FriendsOnlyIcon";
import PrivateIcon from "./ui/icons/PrivateIcon";

type Props = {
  bookmarkCollection: BookmarkCollection;
};

export default function Collection({ bookmarkCollection }: Props) {
  return (
    <section className="w-full h-full mb-4">
      <div className="flex flex-col justify-center items-center">
        <Link
          href={{
            pathname: `/bookmark/${bookmarkCollection.title}`,
            query: {
              title: bookmarkCollection.title,
              visibility: bookmarkCollection.visibility,
              id: bookmarkCollection.id
            }
          }}
        >
          <BookmarkCollectionIcon />
        </Link>
      </div>
      <div className="flex justify-center items-center mt-1">
        <p className="w-[5rem] text-md text-center font-semibold px-1 truncate">
          {bookmarkCollection.title}
        </p>
        {bookmarkCollection.visibility === "public" ? (
          <PublicIcon />
        ) : bookmarkCollection.visibility === "friends_only" ? (
          <FriendsOnlyIcon />
        ) : (
          <PrivateIcon />
        )}
      </div>
    </section>
  );
}
