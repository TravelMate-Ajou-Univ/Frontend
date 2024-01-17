import { ImageType } from "@/model/image";
import { uploadImage } from "./axios/article";

export const getImgUrl = async (
  imgFile: File,
  imgType: ImageType
): Promise<string | null> => {
  const imgId = await uploadImage(imgFile, imgType);
  if (!imgId) return null;
  return `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${imgId}/?type=thumbnail`;
};
