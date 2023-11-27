import PageTitle from "@/components/PageTitle";
import ArticleForm from "@/components/article/new/ArticleForm";

export default function ArticleFormPage() {
  return (
    <section className="flex flex-col w-mainSection mx-auto">
      <PageTitle>게시글 작성</PageTitle>
      <ArticleForm />
    </section>
  );
}
