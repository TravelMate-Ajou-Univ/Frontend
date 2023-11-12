import Image from "next/image";
import travelIcon from "/public/image/travelIcon.png";
import Article from "@/components/article/detail/Article";

interface Props {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params: { slug } }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="flex flex-row gap-3 my-4">
        <Image className="w-12" src={travelIcon} alt="쉐어 포스팅 아이콘" />
        <section className="flex flex-col justify-end">
          <p className="text-xl font-bold">쉐어 포스팅</p>
          <p className="text-sm text-gray-500">
            모두가 함께 만들어 나가는 여행 정보 게시판
          </p>
        </section>
      </h1>
      <Article articleId={slug} />
    </div>
  );
}
