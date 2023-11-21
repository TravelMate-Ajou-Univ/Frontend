import Request from "@/components/article/request/Request";
import SharePostingTitle from "@/components/SharePostingTitle";

interface Props {
  params: {
    slug: string;
  };
}

export default function RequestPage({ params: { slug } }: Props) {
  const [articleId, requestId] = slug;

  return (
    <div className="flex flex-col w-[53rem] mx-auto">
      <SharePostingTitle />
      {requestId && <Request articleId={articleId} requestId={requestId} />}
    </div>
  );
}
