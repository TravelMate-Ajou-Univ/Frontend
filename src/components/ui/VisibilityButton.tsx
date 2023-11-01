import Link from "next/link";
import FriendsOnlyIcon from "./icons/FriendsOnlyIcon";
import PrivateIcon from "./icons/PrivateIcon";
import PublicIcon from "./icons/PublicIcon";

type Props = {
  scope: "PUBLIC" | "FRIENDS_ONLY" | "PRIVATE" | "ALL";
};
export default function VisibilityButton({ scope }: Props) {
  const view_scopes = [
    {
      icon: <p>ALL</p>,
      value: "ALL",
      description: "전체 보기"
    },
    {
      icon: <PrivateIcon />,
      value: "PRIVATE",
      description: "나만 공개"
    },
    {
      icon: <FriendsOnlyIcon />,
      value: "FRIENDS_ONLY",
      description: "친구 공개"
    },
    {
      icon: <PublicIcon />,
      value: "PUBLIC",
      description: "모두 공개"
    }
  ];

  const highlightHandler = (value: string): string => {
    if (value === scope) {
      return "text-red-500";
    }
    return "";
  };
  return (
    <ul className="flex gap-4">
      {view_scopes.map(view => (
        <li key={view.value} className={highlightHandler(view.value)}>
          <Link
            href={`/bookmark/list/${view.value}`}
            className="flex flex-col items-center"
          >
            {view.icon}
            {view.description}
          </Link>
        </li>
      ))}
    </ul>
  );
}
