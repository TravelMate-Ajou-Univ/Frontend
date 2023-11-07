interface Props {
  keyword: string;
}

export default function Keyword({ keyword }: Props) {
  return (
    <span>
      <i>
        <span className="text-primary"># </span>
        {keyword}
      </i>
    </span>
  );
}
