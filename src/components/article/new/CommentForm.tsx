"use client";

interface Props {
  comment: string;
  setComment: (comment: string) => void;
}

export default function CommentForm({ comment, setComment }: Props) {
  return (
    <section>
      <label>코멘트</label>
      <textarea
        className="w-full border resize-none overflow-y-scroll h-40 focus:outline-none px-4 py-2 text-sm mt-1"
        placeholder="작성자에게 수정 요청에 대한 코멘트를 남겨주세요!"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
    </section>
  );
}
