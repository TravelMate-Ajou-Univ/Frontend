"use client";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { deleteCollection } from "@/service/axios/bookmark";

type Props = {
  id: number;
};

export default function TrashIcon({ id }: Props) {
  const [check, setCheck] = useState(false);
  const checkDelete = () => {
    setCheck(!check);
  };

  return (
    <section className="flex relative">
      {check ? (
        <div className="flex flex-col gap-1">
          <button
            onClick={() => deleteCollection(id)}
            className="hover:text-red-400"
          >
            삭제
          </button>
          <button onClick={checkDelete} className="hover:text-red-400">
            취소
          </button>
        </div>
      ) : (
        <BsTrash
          onClick={checkDelete}
          className="w-[1.25rem] h-[1.25rem] z-50 hover:text-red-400"
        />
      )}
    </section>
  );
}
