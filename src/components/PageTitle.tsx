interface Props {
  children: React.ReactNode;
}

export default function PageTitle({ children }: Props) {
  return <h1 className="text-3xl font-bold my-4">{children}</h1>;
}