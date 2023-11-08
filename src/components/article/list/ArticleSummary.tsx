import Keyword from "@/components/ui/Keyword";

interface Props {
  title: string;
  keywords: string[];
}

export default function ArticleSummary({ title, keywords }: Props) {
  return (
    <article className="flex flex-col gap-2 p-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      <ul>
        {keywords.map((keyword, index) => (
          <li className="inline-block mr-2.5 mb-1" key={index}>
            <Keyword keyword={keyword} />
          </li>
        ))}
      </ul>
    </article>
  );
}
