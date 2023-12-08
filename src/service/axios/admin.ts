import { admin } from "./api";

export const isAdmin = async () => {
  try {
    const { status } = await admin.isAdmin();
    if (status) return true;
  } catch (error: any) {
    if (error.response.status === 401) return false;
    console.error(error);
    return false;
  }
};

export const getUsers = async (page: number, limit: number) => {
  try {
    const { data } = await admin.getUsers(page, limit);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getArticleReports = async (page: number, limit: number) => {
  try {
    const { data } = await admin.getArticleReports(page, limit);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUserReports = async (page: number, limit: number) => {
  try {
    const { data } = await admin.getUserReports(page, limit);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const blockUser = async (userId: number, reason: string) => {
  try {
    const { status } = await admin.blockUser(userId, reason);
    if (!status) throw new Error("다시 시도해주세요.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const unblockUser = async (userId: number) => {
  try {
    const { status } = await admin.unblockUser(userId);
    if (!status) throw new Error("다시 시도해주세요.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
