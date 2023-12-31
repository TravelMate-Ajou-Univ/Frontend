import Link from "next/link";

interface Props {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function MenuItem({ href, onClick, children }: Props) {
  return (
    <li>
      <Link
        href={href}
        className="flex gap-2 items-center hover:text-secondaryHover transition-colors ease-in-out"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
}
