import Article from "@/components/article/detail/Article";
import SharePostingTitle from "@/components/SharePostingTitle";

interface Props {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params: { slug } }: Props) {
  return (
    <div className="flex flex-col w-[53rem] mx-auto">
      <SharePostingTitle />
      <Article articleId={slug} />
    </div>
  );
}
