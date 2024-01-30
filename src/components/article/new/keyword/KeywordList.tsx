import Keyword from "@/components/ui/Keyword";
import { KeywordType } from "@/model/article";

type Props = {
  keywords: KeywordType[];
  removeKeyword: (index: number) => void;
};

export default function KeywordList({ keywords, removeKeyword }: Props) {
  return (
    <ul className="text-sm">
      {keywords?.map((keyword, index) => (
        <li
          className="inline-block md:mr-4 mr-2 mb-1.5 cursor-pointer"
          key={keyword.id}
          onClick={() => removeKeyword(index)}
        >
          <Keyword keyword={keyword.name} />
        </li>
      ))}
    </ul>
  );
}
