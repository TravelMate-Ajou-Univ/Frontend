import { Bookmark, BookmarkCollection, Pin } from "@/model/bookmark";
import axios from "axios";

type Props = {
  page: number;
  limit: number;
  visibility: "PUBLIC" | "FRIENDS_ONLY" | "PRIVATE" | "ALL";
};
export async function getMyCollectionList({
  page,
  limit,
  visibility
}: Props): Promise<BookmarkCollection[]> {
  try {
    const scope = visibility === "ALL" ? null : visibility;
    const response = await axios({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collections`,
      params: {
        page: page,
        limit: limit,
        visibility: scope
      }
    });
    return response.data.bookmarkCollections;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllBookmarks(id: number): Promise<Bookmark[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collection/${id}/bookmarks`
    );
    const datas = response.data;
    const bookmarks = datas.map(
      ({
        id,
        location,
        content
      }: {
        id: number;
        location: { latitude: string; longitude: string };
        content: string;
      }) => {
        const bookmark: Bookmark = {
          id,
          latitude: Number(location.latitude),
          longitude: Number(location.longitude),
          content
        };
        return bookmark;
      }
    );
    return bookmarks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteCollection(id: number) {
  try {
    await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collection/${id}`
    });
  } catch (error) {
    console.log(error);
  }
}

export async function modifyCollection(
  id: number,
  title: string,
  visibility: string,
  addPins: Pin[],
  subPins: Number[]
) {
  try {
    await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collection/${id}`,
      data: {
        title: title,
        visibility: visibility,
        locationsWithContent: addPins,
        bookmarkIdsToDelete: subPins
      }
    });
  } catch (error) {
    console.log(error);
  }
}
