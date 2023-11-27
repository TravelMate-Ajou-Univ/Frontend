import PageTitle from "@/components/PageTitle";
import Editable from "@/components/article/new/Editable";

interface Props {
  params: {
    slug: string;
  };
}

export default function EditPage({ params: { slug } }: Props) {
  return (
    <section className="flex flex-col w-mainSection mx-auto">
      <PageTitle>게시글 수정</PageTitle>
      <Editable id={slug} />
    </section>
  );
}
