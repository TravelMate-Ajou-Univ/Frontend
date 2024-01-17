import { useId } from "react";
import KeywordInput from "../KeywordInput";
import KeywordList from "../KeywordList";
import { KeywordType } from "@/model/article";

type Props = {
  inputClassName?: string;
  keywords: KeywordType[];
  addKeyword: (keyword: string) => void;
  removeKeyword: (index: number) => void;
  disabled: boolean;
};

export default function KeywordInputContainer({
  inputClassName,
  keywords,
  addKeyword,
  removeKeyword,
  disabled
}: Props) {
  const keywordInputId = useId();

  return (
    <>
      <div className={inputClassName}>
        <label htmlFor={keywordInputId}>키워드 </label>
        <KeywordInput
          inputId={keywordInputId}
          addKeyword={addKeyword}
          disabled={disabled}
        />
      </div>
      <KeywordList keywords={keywords} removeKeyword={removeKeyword} />
    </>
  );
}
