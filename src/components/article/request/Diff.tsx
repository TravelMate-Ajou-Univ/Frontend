interface Props {
  diff?: any;
}

export default function Diff({ diff }: Props) {
  return (
    <section>
      {diff &&
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
        )}
    </section>
  );
}
