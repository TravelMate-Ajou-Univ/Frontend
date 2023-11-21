import Link from "next/link";
import MenuProfile from "./MenuProfile";
import XIcon from "@/components/ui/icons/XIcon";
import MenuBackground from "./MenuBackground";
import useClickOutside from "@/hooks/useClickOutside";
import MarkedMapIcon from "@/components/ui/icons/MarkedMapIcon";
import WritingIcon from "@/components/ui/icons/WritingIcon";
import PaperPlane from "@/components/ui/icons/PaperPlane";
import { deleteCookie } from "cookies-next";
import { useAppDispatch } from "@/hooks/redux";
import { userLogout } from "@/redux/features/userSlice";
import MenuItem from "./MenuItem";
import DocsIcon from "@/components/ui/icons/DocsIcon";

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
            <MenuItem href="/article/new" onClick={closeMenu}>
              <WritingIcon />
              게시글 작성
            </MenuItem>
            <MenuItem href="/article/list" onClick={closeMenu}>
              <PaperPlane />
              게시글 목록
            </MenuItem>
            <MenuItem href="/article/list/me" onClick={closeMenu}>
              <DocsIcon />
              내가 작성한 포스팅
            </MenuItem>
            <MenuItem href="/bookmark/list/me/all" onClick={closeMenu}>
              <MarkedMapIcon />
              북마크컬렉션 목록
            </MenuItem>
          </ul>
        </nav>
        <button className="self-end" onClick={logout}>
          로그아웃
        </button>
      </section>
    </MenuBackground>
  );
}
