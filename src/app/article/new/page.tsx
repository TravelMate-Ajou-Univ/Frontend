import PageTitle from "@/components/PageTitle";
import ArticleForm from "@/components/article/ArticleForm";

export default function ArticleFormPage() {
  return (
    <section className="flex flex-col w-[53rem] mx-auto">
      <PageTitle>게시글 작성</PageTitle>
      <ArticleForm />
    </section>
  );
}
