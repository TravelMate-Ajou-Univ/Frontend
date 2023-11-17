export type FriendType = {
  id: number;
  nickname: string;

  // Todo : profileImageId에 대한 처리
  profileImageId: string | null;
};
export type FriendsListType = {
  friends: FriendType[];
  count: number;
};
