interface Props {
  children: React.ReactNode;
}

export default function MenuClass({ children }: Props) {
  return <h1 className="text-black text-xs mt-0.5 mb-1.5">{children}</h1>;
}
