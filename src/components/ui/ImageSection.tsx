import { ChangeEvent } from "react";
import Image from "next/image";
import OutlinedButton from "./Button/OutlinedButton";

interface Props {
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  thumbnailPreview: string | null;
}

export default function ImageSection({ handleImage, thumbnailPreview }: Props) {
  return (
    <section>
      <OutlinedButton onClick={() => {}}>
        <label
          className="w-full h-full hover:cursor-pointer"
          htmlFor="thumbnail"
        >
          {thumbnailPreview ? "썸네일 변경" : "썸네일 등록"}
        </label>
      </OutlinedButton>
      <input
        id="thumbnail"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleImage}
      />
      {thumbnailPreview && (
        <Image
          className="mt-3"
          src={thumbnailPreview}
          alt="썸네일 이미지"
          width={250}
          height={250}
        />
      )}
    </section>
  );
}
