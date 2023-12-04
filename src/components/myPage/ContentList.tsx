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
        <ul>
          <MultiCarousel>
            {articles.map((article, index) => (
              <li key={index}>
                <Link
                  href={`/article/detail/${article.id}?season=${article.season}`}
                  className="flex flex-col justify-around items-center w-[12rem] h-[14rem] rounded-md overflow-hidden shadow-lg"
                >
                  <div className="h-full w-full overflow-hidden object-cover">
                    <Image
                      src={article.thumbnail}
                      alt="썸네일 사진"
                      className="w-full h-full"
                      width={1000}
                      height={1000}
                    />
                  </div>
                  <p className="text-center truncate w-[12rem] my-2 font-bold">
                    {article.title}
                  </p>
                </Link>
              </li>
            ))}
          </MultiCarousel>
        </ul>
      )}
    </div>
  );
}
