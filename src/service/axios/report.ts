import { report } from "./api";

export const reportArticle = async (articleId: number, reason: string) => {
  try {
    const { status } = await report.reportArticle(articleId, reason);
    if (!status) throw new Error("다시 시도해주세요.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const reportUser = async (reportedUserId: number, reason: string) => {
  try {
    const { status } = await report.reportUser(reportedUserId, reason);
    if (!status) throw new Error("다시 시도해주세요.");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
