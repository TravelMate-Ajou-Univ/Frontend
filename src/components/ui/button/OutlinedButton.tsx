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
      return "md:px-4 px-3 py-1 md:text-base text-sm";
    } else {
      return "px-2 py-0.5 text-sm";
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
