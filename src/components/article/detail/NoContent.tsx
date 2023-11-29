interface Props {
  season: string;
  authorId: number;
  userId: number;
}

export default function NoContent({ season, authorId, userId }: Props) {
  return (
    <section className="w-full flex flex-col justify-center items-center md:h-96 h-64 text-gray-500 md:text-2xl text-xl text-center gap-4">
      <p>아직 {season} 포스팅이 작성되지 않았어요!</p>
      <p>
        {authorId === userId
          ? `지금 바로 ${season} 포스팅을 작성해보세요😁`
          : `포스팅 작성자에게 ${season} 포스팅을 직접 작성해서 제안해보세요😁`}
      </p>
    </section>
  );
}
