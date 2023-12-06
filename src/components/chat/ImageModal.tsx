import React from "react";
import ModalPortal from "../ui/ModalPortal";
import Image from "next/image";

type Props = {
  imageUrl: string;
  cancleHandler: (state: boolean) => void;
};

export default function ImageModal({ imageUrl, cancleHandler }: Props) {
  return (
    <ModalPortal>
      <div
        onClick={() => cancleHandler(false)}
        className="fixed left-0 top-0 z-50 w-full h-full bg-black/40"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center md:w-[30rem] w-[20rem]">
          <Image
            src={imageUrl}
            height={500}
            width={500}
            alt="zoom in image"
            className="w-full h-full bg-gray-200"
          />
        </div>
      </div>
    </ModalPortal>
  );
}
