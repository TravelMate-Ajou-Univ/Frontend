import MuiMasonry from "@/components/MuiMasonry";
import ArticlePreview from "./ArticlePreview";
import { articles } from "@/data/articles";

export default function ArticleList() {
  //TODO: fetch articles from server

  return (
    <MuiMasonry>
      {articles.map(article => (
        <ArticlePreview article={article} key={article.id} />
      ))}
    </MuiMasonry>
  );
}
