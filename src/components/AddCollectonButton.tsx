"use client";
import React, { useState } from "react";
import AddCollection from "./AddCollection";

export default function AddCollectonButton() {
  const [modalBtn, setModalBtn] = useState(false);
  const toggleButton = () => {
    setModalBtn(!modalBtn);
  };
  return (
    <div className="self-end">
      <button className="w-fit border-2 rounded-md p-2" onClick={toggleButton}>
        <p>북마크 추가</p>
      </button>
      {modalBtn ? <AddCollection toggleButton={toggleButton} /> : <></>}
    </div>
  );
}
