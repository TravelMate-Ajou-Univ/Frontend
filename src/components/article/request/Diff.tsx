import Dompurify from "dompurify";
import React from "react";

interface Props {
  diff?: any;
  originArticle: string;
}

function Diff({ diff, originArticle }: Props) {
  return (
    <section>
      {diff &&
        (diff.hunks.length <= 0 ? (
          <article>
            <h1 className="text-sm text-gray-500 mb-4">
              <i>글 변경사항이 없습니다.</i>
            </h1>
            <div
              dangerouslySetInnerHTML={{
                __html: Dompurify.sanitize(originArticle)
              }}
            />
          </article>
        ) : (
          diff.hunks[0]?.changes.map(
            (
              { type, content }: { type: string; content: string },
              index: number
            ) => {
              return (
                <div
                  className={
                    "flex justify-between items-center w-full px-2 my-0.5 " +
                    (type === "insert"
                      ? "bg-green-300"
                      : type === "delete"
                      ? "bg-red-300"
                      : "")
                  }
                  key={index}
                >
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                  {type !== "normal" &&
                    (type === "insert" ? (
                      <span className="mr-1.5">＋</span>
                    ) : (
                      <span className="mr-1.5">－</span>
                    ))}
                </div>
              );
            }
          )
        ))}
    </section>
  );
}

export default React.memo(Diff);
