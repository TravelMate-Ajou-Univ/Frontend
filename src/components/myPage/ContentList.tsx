import { MyPageArticleType } from "@/model/article";
import MultiCarousel from "../ui/MultiCarousel";
import Link from "next/link";
import Image from "next/image";

type Props = {
  articles: MyPageArticleType[];
};

export default function ContentList({ articles }: Props) {
  const total = articles.length;

  return (
    <div>
      {total === 0 ? (
        <p className="text-center text-red-400 my-[5rem]">
          해당 게시글이 없습니다.
        </p>
      ) : (
        <section>
          <MultiCarousel>
            {articles.map((article, index) => (
              <Link
                key={index}
                href={`/article/detail/${article.id}?season=${article.season}`}
                className="flex flex-col justify-center items-center w-[10rem] h-[10rem] shadow-2xl"
              >
                <div className="h-[8rem] w-[8rem]">
                  <Image
                    src={article.thumbnail}
                    alt="썸네일 사진"
                    className="w-full h-full"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-center truncate w-[8rem] font-bold">
                  {article.title}
                </p>
              </Link>
            ))}
          </MultiCarousel>
        </section>
      )}
    </div>
  );
}
