"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import CustomToolbar from "./CustomToolbar";
import { uploadImage } from "@/service/axios/posting";
import { ImageResize } from "quill-image-resize-module-ts";
Quill.register("modules/ImageResize", ImageResize);

export default function TextEditor() {
  const [contents, setContents] = useState("");
  const quillRef = useRef<ReactQuill>(null);
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      if (!input.files) return;
      const file = input.files[0];

      try {
        const imgId = await uploadImage(file);
        if (!imgId) return;
        const editor = quillRef.current?.getEditor();
        if (!editor) return;
        const range = editor.getSelection();
        if (!range) return;
        editor.insertEmbed(
          range.index,
          "image",
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${imgId}/?type=article`
        );
      } catch (error) {
        alert("이미지 업로드에 실패했습니다.");
      }
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: { image: imageHandler }
      },
      ImageResize: { modules: ["Resize", "DisplaySize"] }
    };
  }, []);

  return (
    <div className="w-full h-full">
      <CustomToolbar />
      <ReactQuill
        className="h-[35rem]"
        ref={quillRef}
        modules={modules}
        value={contents}
        onChange={setContents}
        placeholder="공유하고 싶은 여행 정보를 기록해주세요!"
      />
    </div>
  );
}
