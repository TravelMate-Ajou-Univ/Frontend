export type FriendType = {
  id: number;
  nickname: string;

  // Todo : profileImageId에 대한 처리
  // profileImageId: string | null;
  profileImageId: number | null;
};

export type FriendWithPkType = FriendType & {
  pk: number;
};
export type FriendsListType = {
  friends: FriendType[];
  count: number;
};

export type FriendsWithPkListType = {
  friends: FriendWithPkType[];
  count: number;
};
