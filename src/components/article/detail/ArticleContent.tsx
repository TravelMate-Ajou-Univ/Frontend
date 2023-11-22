import { ArticleDetailType, SeasonType } from "@/model/article";
import NoContent from "./NoContent";
import Dompurify from "dompurify";

interface Props {
  article: ArticleDetailType;
  season: SeasonType | "";
  userId: number;
}

export default function ArticleContent({
  article: { spring, summer, fall, winter, authorId },
  season,
  userId
}: Props) {
  switch (season) {
    case "SPRING":
      return spring && spring.content !== "" ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(spring.content)
            }}
          />
        )
      ) : (
        <NoContent season="봄" authorId={authorId} userId={userId} />
      );
    case "SUMMER":
      return summer && summer.content !== "" ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(summer.content)
            }}
          />
        )
      ) : (
        <NoContent season="여름" authorId={authorId} userId={userId} />
      );
    case "FALL":
      return fall && fall.content !== "" ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(fall.content)
            }}
          />
        )
      ) : (
        <NoContent season="가을" authorId={authorId} userId={userId} />
      );
    case "WINTER":
      return winter && winter.content !== "" ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(winter.content)
            }}
          />
        )
      ) : (
        <NoContent season="겨울" authorId={authorId} userId={userId} />
      );
    default:
      return <></>;
  }
}
