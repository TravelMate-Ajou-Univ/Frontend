import { FriendType, FriendsListType } from "./../../model/friend";
import { api } from "./api";

type FriendsListProps = {
  page: number;
  limit: number;
};

export const getMyFriendsList = async ({
  page,
  limit
}: FriendsListProps): Promise<FriendsListType> => {
  try {
    const response = await api({
      method: "get",
      url: "/users/me/friends",
      params: {
        page,
        limit
      }
    });
    const data = response.data;
    console.log(data);

    const friends: FriendType[] = data.friends.map((data: any) => {
      return {
        id: data.friend.id,
        nickname: data.friend.nickname,
        profileImageId: data.friend.profileImageId
      };
    });

    return {
      friends,
      count: data.count
    };
  } catch (error) {
    console.error(error);
    return {
      friends: [],
      count: 0
    };
  }
};
