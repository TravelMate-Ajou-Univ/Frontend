import Link from "next/link";
import FriendsOnlyIcon from "./icons/FriendsOnlyIcon";
import PrivateIcon from "./icons/PrivateIcon";
import PublicIcon from "./icons/PublicIcon";

type Props = {
  user: string;
  scope: string;
};
export default function VisibilityButton({ scope, user }: Props) {
  const view_scopes = [
    {
      icon: <p>ALL</p>,
      value: "all",
      description: "전체 보기"
    },
    {
      icon: <PrivateIcon />,
      value: "private",
      description: "나만 공개"
    },
    {
      icon: <FriendsOnlyIcon />,
      value: "friends_only",
      description: "친구 공개"
    },
    {
      icon: <PublicIcon />,
      value: "public",
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
            href={`/bookmark/list/${user}/${view.value}`}
            className="flex flex-col items-center"
          >
            <div className="h-[1.5rem]">{view.icon}</div>
            {view.description}
          </Link>
        </li>
      ))}
    </ul>
  );
}
