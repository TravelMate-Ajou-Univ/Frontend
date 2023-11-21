import ArticleList from "@/components/article/list/ArticleList";
import Search from "@/components/Search/Search";
import SharePostingTitle from "@/components/SharePostingTitle";

export default function ArticleListPage() {
  return (
    <div className="flex flex-col gap-4">
      <Search />
      <SharePostingTitle />
      <section className="flex flex-col items-center w-full">
        <ArticleList />
      </section>
    </div>
  );
}
