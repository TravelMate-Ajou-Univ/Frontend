interface Props {
  season: string;
}

export default function NoContent({ season }: Props) {
  return (
    <section className="w-full flex flex-col justify-center items-center h-96 text-gray-500 text-2xl gap-4">
      <p>아직 {season} 포스팅이 작성되지 않았어요!</p>
      <p>포스팅 작성자에게 {season} 포스팅을 직접 작성해서 제안해보세요😁</p>
    </section>
  );
}
