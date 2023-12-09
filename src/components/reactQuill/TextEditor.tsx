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

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const editor = quillRef.current?.getEditor();
        if (!editor) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64Image = reader.result;
          if (!base64Image) return;
          const range = editor.getSelection();
          if (!range) return;
          editor.insertEmbed(range.index, "image", base64Image);

          const response = await fetch(base64Image?.toString());
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: "image" });
          const imgId = await uploadImage(file, "article");
          if (!imgId) throw new Error();
          const imgURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}attachments/${imgId}/?type=article`;

          const img = document.createElement("img");
          img.setAttribute("src", imgURL);
          img.setAttribute("alt", "image");
          img.setAttribute("width", "0");
          img.setAttribute("height", "0");
          const node = document.getElementById("imgLoader") as HTMLElement;
          node.appendChild(img);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler
        }
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
      <div id="imgLoader"></div>
    </div>
  );
}
