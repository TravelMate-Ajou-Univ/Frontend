import MyArticleList from "@/components/article/list/MyArticleList";
import PageTitle from "@/components/PageTitle";
import SharePostingTitle from "@/components/SharePostingTitle";

export default function MyArticlePage() {
  return (
    <div className="flex flex-col gap-4">
      <SharePostingTitle />
      <hr />
      <PageTitle>내가 작성한 포스팅</PageTitle>
      <section className="flex flex-col w-full">
        <MyArticleList />
      </section>
    </div>
  );
}
