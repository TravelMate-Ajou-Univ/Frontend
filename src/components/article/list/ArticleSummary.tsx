import Keyword from "@/components/ui/Keyword";

interface Props {
  title: string;
  keywords: { id: number; name: string }[];
  count?: number;
}

export default function ArticleSummary({
  title,
  keywords = [],
  count = -1
}: Props) {
  return (
    <article className="flex flex-col gap-2 p-4">
      <h1 className="text-lg font-semibold">
        {title}
        {count !== -1 && (
          <span className="border rounded-full px-1 text-red-500 text-sm font-normal ml-2">
            +{count}
          </span>
        )}
      </h1>
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
