interface Props {
  keyword: string;
  big?: boolean;
  isSelected?: boolean;
}

export default function Keyword({
  keyword,
  big = false,
  isSelected = false
}: Props) {
  return (
    <span
      className={`border rounded-full text-secondary 
      ${big ? "px-4 py-1" : "text-xs px-2 py-0.5"} ${
        isSelected && "bg-gray-200"
      }`}
    >
      {big && <span className="text-primary"># </span>}
      {keyword}
    </span>
  );
}
