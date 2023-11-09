import Keyword from "@/components/ui/Keyword";

interface Props {
  title: string;
  keywords: { id: number; name: string }[];
}

export default function ArticleSummary({ title, keywords = [] }: Props) {
  return (
    <article className="flex flex-col gap-2 p-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      <ul>
        {keywords.map(keyword => (
          <li className="inline-block mr-2.5 mb-1" key={keyword.id}>
            <Keyword keyword={keyword.name} />
          </li>
        ))}
      </ul>
    </article>
  );
}
