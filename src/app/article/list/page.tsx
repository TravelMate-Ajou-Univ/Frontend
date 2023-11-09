import Image from "next/image";
import travleIcon from "/public/image/travelIcon.png";
import ArticleList from "@/components/article/list/ArticleList";
import Search from "@/components/Search/Search";

export default function ArticleListPage() {
  return (
    <div className="flex flex-col gap-4">
      <Search />
      <h1 className="flex gap-3 my-4">
        <Image className="w-14" src={travleIcon} alt="여행 아이콘" />
        <div className="flex flex-col self-end">
          <p className="text-2xl font-bold">쉐어포스팅</p>
          <p>모두가 함께 만들어 나가는 여행 정보 게시판</p>
        </div>
      </h1>
      <section className="flex flex-col items-center w-full">
        <ArticleList />
      </section>
    </div>
  );
}
