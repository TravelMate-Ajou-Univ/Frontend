"use client";

import { useEffect, useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import CustomToolbar from "./CustomToolbar";
import { uploadImage } from "@/service/axios/article";
import { ImageResize } from "quill-image-resize-module-ts";
Quill.register("modules/ImageResize", ImageResize);

interface Props {
  setContents: (contents: string) => void;
  receivedContent?: string;
}

export default function TextEditor({ setContents, receivedContent }: Props) {
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (!receivedContent) return;
    quillRef.current
      ?.getEditor()
      .clipboard.dangerouslyPasteHTML(receivedContent);
  }, [receivedContent]);

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar"
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
        onChange={setContents}
        placeholder="공유하고 싶은 여행 정보를 기록해주세요!"
      />
    </div>
  );
}
