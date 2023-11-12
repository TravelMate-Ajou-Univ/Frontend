import { ArticleDetailType, SeasonType } from "@/model/article";
import NoContent from "./NoContent";

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
        <div dangerouslySetInnerHTML={{ __html: spring.content }} />
      ) : (
        <NoContent season="봄" />
      );
    case "SUMMER":
      return summer ? (
        <div dangerouslySetInnerHTML={{ __html: summer.content }} />
      ) : (
        <NoContent season="여름" />
      );
    case "FALL":
      return fall ? (
        <div dangerouslySetInnerHTML={{ __html: fall.content }} />
      ) : (
        <NoContent season="가을" />
      );
    case "WINTER":
      return winter ? (
        <div dangerouslySetInnerHTML={{ __html: winter.content }} />
      ) : (
        <NoContent season="겨울" />
      );
    default:
      return <></>;
  }
}
