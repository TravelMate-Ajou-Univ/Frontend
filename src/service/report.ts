import { reportArticle, reportUser } from "./axios/report";

export const cancelReport = (toggleModal: () => void) => {
  if (confirm("신고를 취소하시겠습니까?")) toggleModal();
};

export const report = async (
  type: "article" | "user",
  id: number,
  reason: string,
  toggleModal: () => void
) => {
  const res =
    type === "article"
      ? await reportArticle(id, reason)
      : await reportUser(id, reason);
  if (res) {
    alert("신고가 접수되었습니다.\n신고 내용을 검토 후 조치하겠습니다.");
    toggleModal();
  } else {
    alert("신고 접수에 실패했습니다.\n잠시 후 다시 시도해주세요.");
  }
};
