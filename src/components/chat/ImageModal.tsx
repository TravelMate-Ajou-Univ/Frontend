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
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full h-full bg-black/40"
      >
        <div className="flex flex-col my-[2rem] justify-center items-center">
          <button
            onClick={() => cancleHandler(false)}
            className="self-end text-2xl font-bold mr-[4rem] text-red-400"
          >
            X
          </button>
          <Image
            src={imageUrl}
            height={500}
            width={500}
            alt="zoom in image"
            className="w-fit h-[40rem]"
          />
        </div>
      </div>
    </ModalPortal>
  );
}
