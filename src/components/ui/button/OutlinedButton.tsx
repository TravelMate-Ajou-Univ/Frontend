interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "mid" | "small";
}

export default function OutlinedButton({
  onClick,
  children,
  className = "",
  size = "mid"
}: Props) {
  const btnSize = (size: "mid" | "small"): string => {
    if (size === "mid") {
      return "px-4 py-1";
    } else {
      return "px-2 py-0.5";
    }
  };
  return (
    <button
      className={
        className +
        ` rounded-lg bg-white border border-secondary text-secondary hover:bg-gray-100 ease-in-out transition-colors font-semibold ${btnSize(
          size
        )}`
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
