export interface User {
  id: number;
  userName: string;
  profileImageId: string;
  level?: "USER" | "ADMIN";
}
