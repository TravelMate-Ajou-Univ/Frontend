interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function FilledButton({
  onClick,
  children,
  className = ""
}: Props) {
  return (
    <button
      className={
        className +
        " rounded-lg bg-secondary text-white md:px-4 px-3 py-1 md:text-base text-sm hover:bg-primary ease-in-out transition-colors font-semibold"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
