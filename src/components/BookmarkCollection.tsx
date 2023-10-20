import { BookmarkCollection } from "@/model/bookmark";
import React from "react";
import BookmakrCollectionIcon from "./ui/icons/BookmakrCollectionIcon";
import PublicIcon from "./ui/icons/PublicIcon";
import FriendsOnlyIcon from "./ui/icons/FriendsOnlyIcon";
import PrivateIcon from "./ui/icons/PrivateIcon";
import Link from "next/link";

type Props = {
  bookmarkCollection: BookmarkCollection;
};

export default function BookmarkCollection({ bookmarkCollection }: Props) {
  return (
    <Link href={`bookmarkCollection/${bookmarkCollection.title}`}>
      <div className="flex flex-col justify-center items-center my-2">
        <BookmakrCollectionIcon />
        <div className="flex justify-center items-center mt-1">
          <p className="w-[6rem] text-xl text-center font-semibold px-1 truncate">
            {bookmarkCollection.title}
          </p>
          {bookmarkCollection.visibility === "PUBLIC" ? (
            <PublicIcon />
          ) : bookmarkCollection.visibility === "FRIENDS_ONLY" ? (
            <FriendsOnlyIcon />
          ) : (
            <PrivateIcon />
          )}
        </div>
      </div>
    </Link>
  );
}
