import RequestList from "@/components/article/request/list/RequestList";
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
    <div className="flex flex-col lg:w-mainSection md:w-mainSectionMd sm:w-mainSectionSm w-full mx-auto">
      <SharePostingTitle />
      {requestId ? (
        <Request articleId={articleId} requestId={requestId} />
      ) : (
        <RequestList articleId={articleId} />
      )}
    </div>
  );
}
