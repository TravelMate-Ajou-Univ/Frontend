interface Props {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function OutlinedButton({
  onClick,
  children,
  className = ""
}: Props) {
  return (
    <button
      className={
        className +
        " rounded-lg bg-white border border-secondary text-secondary px-4 py-0.5 hover:bg-gray-100 ease-in-out transition-colors font-semibold"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
