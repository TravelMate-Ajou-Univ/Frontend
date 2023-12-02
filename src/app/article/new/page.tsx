import PageTitle from "@/components/PageTitle";
import ArticleForm from "@/components/article/new/ArticleForm";

export default function ArticleFormPage() {
  return (
    <section className="flex flex-col lg:w-mainSection md:w-mainSectionMd sm:w-mainSectionSm w-full mx-auto">
      <PageTitle>게시글 작성</PageTitle>
      <ArticleForm />
    </section>
  );
}
