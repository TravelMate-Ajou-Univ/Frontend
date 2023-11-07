interface Props {
  onClick: () => void;
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
        " rounded-lg bg-secondary text-white px-4 py-1 hover:bg-primary ease-in-out transition-colors font-semibold"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
