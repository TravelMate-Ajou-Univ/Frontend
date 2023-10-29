import { BookmarkCollection } from "@/model/bookmark";
import axios from "axios";

export async function getMyCollectionList(): Promise<BookmarkCollection[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collections`
    );

    return response.data;
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
  visibility: string
) {
  try {
    await axios({
      method: "patch",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me/bookmark-collection/${id}`,
      data: {
        title: title,
        visibility: visibility,
        locationsWithContent: [
          {
            latitude: 12.524,
            longitude: 10.125,
            content: "뭘까용?3"
          }
        ],
        bookmarkIdsToDelete: [1, 2, 3]
      }
    });
  } catch (error) {
    console.log(error);
  }
}
