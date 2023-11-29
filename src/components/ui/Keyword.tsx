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
      className={`border rounded-full text-secondary bg-white 
      ${
        big
          ? "md:px-4 px-3 md:py-1 py-0.5 md:text-base text-sm"
          : "text-xs px-2 py-0.5"
      } ${isSelected && "bg-gray-200"}`}
    >
      {big && <span className="text-primary"># </span>}
      {keyword}
    </span>
  );
}
