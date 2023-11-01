"use client";

import { BookmarkCollection } from "@/model/bookmark";
import React, { useState } from "react";
import BookmarkCollectionIcon from "./ui/icons/BookmarkCollectionIcon";
import PublicIcon from "./ui/icons/PublicIcon";
import FriendsOnlyIcon from "./ui/icons/FriendsOnlyIcon";
import PrivateIcon from "./ui/icons/PrivateIcon";
import Link from "next/link";

type Props = {
  bookmarkCollection: BookmarkCollection;
};

export default function Collection({ bookmarkCollection }: Props) {
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <section>
      <div className="flex flex-col items-center my-2">
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
      <div className="flex justify-center items-center mt-1 relative">
        <p className="w-[5rem] text-md text-center font-semibold px-1 truncate">
          {bookmarkCollection.title}
        </p>
        <div onClick={toggleVisible} className="absolute right-2">
          {bookmarkCollection.visibility === "PUBLIC" ? (
            <PublicIcon />
          ) : bookmarkCollection.visibility === "FRIENDS_ONLY" ? (
            <FriendsOnlyIcon />
          ) : (
            <PrivateIcon />
          )}
        </div>
      </div>
    </section>
  );
}
