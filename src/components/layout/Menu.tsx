import Link from "next/link";
import MenuProfile from "./MenuProfile";
import XIcon from "../ui/icons/XIcon";
import MenuBackground from "./MenuBackground";
import useClickOutside from "@/hooks/useClickOutside";
import MarkedMapIcon from "../ui/icons/MarkedMapIcon";
import WritingIcon from "@/components/ui/icons/WritingIcon";
import { deleteCookie } from "cookies-next";
import { useAppDispatch } from "@/hooks/redux";
import { userLogout } from "@/redux/features/userSlice";

interface Props {
  closeMenu: () => void;
}

export default function Menu({ closeMenu }: Props) {
  const ref = useClickOutside(closeMenu);
  const dispatch = useAppDispatch();

  const logout = () => {
    deleteCookie("refreshToken");
    dispatch(userLogout());
    closeMenu();
    window.location.href = "/";
  };

  return (
    <MenuBackground>
      <section
        ref={ref}
        className="absolute right-0 flex flex-col gap-16 bg-white w-80 h-full px-5 py-5 rounded-l-xl shadow-2xl animate-menuSlide"
      >
        <div className="flex flex-row justify-between items-center">
          <MenuProfile />
          <XIcon onClick={closeMenu} />
        </div>
        <nav className="px-5 text-gray-800 flex-grow">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                href="/article/new"
                className="flex gap-2 items-center"
                onClick={closeMenu}
              >
                <WritingIcon />
                게시글 작성
              </Link>
            </li>
            <li>
              <Link
                href="/bookmark/list/me/all"
                className="flex gap-2 items-center"
                onClick={closeMenu}
              >
                <MarkedMapIcon />
                북마크컬렉션 목록
              </Link>
            </li>
          </ul>
        </nav>
        <button className="self-end" onClick={logout}>
          로그아웃
        </button>
      </section>
    </MenuBackground>
  );
}
