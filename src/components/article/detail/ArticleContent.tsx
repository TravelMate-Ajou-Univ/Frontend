import { ArticleDetailType, SeasonType } from "@/model/article";
import NoContent from "./NoContent";
import Dompurify from "dompurify";

interface Props {
  article: ArticleDetailType;
  season: SeasonType | "";
}

export default function ArticleContent({
  article: { spring, summer, fall, winter },
  season
}: Props) {
  switch (season) {
    case "SPRING":
      return spring ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(spring.content)
            }}
          />
        )
      ) : (
        <NoContent season="봄" />
      );
    case "SUMMER":
      return summer ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(summer.content)
            }}
          />
        )
      ) : (
        <NoContent season="여름" />
      );
    case "FALL":
      return fall ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(fall.content)
            }}
          />
        )
      ) : (
        <NoContent season="가을" />
      );
    case "WINTER":
      return winter ? (
        typeof window !== "undefined" && (
          <div
            dangerouslySetInnerHTML={{
              __html: Dompurify.sanitize(winter.content)
            }}
          />
        )
      ) : (
        <NoContent season="겨울" />
      );
    default:
      return <></>;
  }
}
