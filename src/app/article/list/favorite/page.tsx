import MyArticleList from "@/components/article/list/MyArticleList";
import PageTitle from "@/components/PageTitle";
import SharePostingTitle from "@/components/SharePostingTitle";

export default function MyArticlePage() {
  return (
    <div className="flex flex-col gap-4">
      <SharePostingTitle />
      <hr />
      <PageTitle>즐겨찾기 포스팅</PageTitle>
      <section className="flex flex-col w-full">
        <MyArticleList isFavorite />
      </section>
    </div>
  );
}
