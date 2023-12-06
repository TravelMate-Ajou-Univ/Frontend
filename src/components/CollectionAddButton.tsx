"use client";
import React, { useState } from "react";
import CollectionModal from "./CollectionModal";

export default function CollectionAddButton() {
  const [modalBtn, setModalBtn] = useState(false);
  const toggleButton = () => {
    setModalBtn(!modalBtn);
  };
  return (
    <div className="self-end relative">
      <button className="w-fit border-2 rounded-md p-2" onClick={toggleButton}>
        <p className="lg:text-lg md:text-base text-sm">북마크 컬렉션 추가</p>
      </button>
      {modalBtn ? <CollectionModal toggleButton={toggleButton} /> : null}
    </div>
  );
}
