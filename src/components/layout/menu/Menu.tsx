import MenuProfile from "./MenuProfile";
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
import ChatIcon from "@/components/ui/icons/ChatIcon";
import FriendsOnlyIcon from "@/components/ui/icons/FriendsOnlyIcon";
import CharacterIcon from "@/components/ui/icons/CharacterIcon";
import MenuClass from "./MenuClass";
import SignOutIcon from "@/components/ui/icons/SignOutIcon";
import FilledFavoriteIcon from "@/components/ui/icons/favorite/FilledFavoriteIcon";

interface Props {
  closeMenu: () => void;
}

const MENU_CLASSIFICATION_CLASS =
  "flex flex-col sm:gap-3 gap-2 sm:text-base text-sm";

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
        className="absolute right-0 flex flex-col gap-16 bg-white w-80 h-full px-5 pt-8 pb-5 rounded-l-xl shadow-2xl animate-menuSlide"
      >
        <MenuProfile />
        <nav className="px-5 text-gray-800 flex-grow">
          <ul className="flex flex-col gap-4 divide-y text-secondary">
            <section>
              <MenuClass>포스팅</MenuClass>
              <div className={MENU_CLASSIFICATION_CLASS}>
                <MenuItem href="/article/new" onClick={closeMenu}>
                  <WritingIcon />
                  포스팅 작성
                </MenuItem>
                <MenuItem href="/article/list" onClick={closeMenu}>
                  <PaperPlane />
                  포스팅 목록
                </MenuItem>
              </div>
            </section>
            <section>
              <MenuClass>채팅/친구</MenuClass>
              <div className={MENU_CLASSIFICATION_CLASS}>
                <MenuItem href="/chat/list" onClick={closeMenu}>
                  <ChatIcon />
                  채팅 목록
                </MenuItem>
                <MenuItem href="/friends" onClick={closeMenu}>
                  <FriendsOnlyIcon />
                  친구 목록
                </MenuItem>
              </div>
            </section>
            <section>
              <MenuClass>내 항목</MenuClass>
              <div className={MENU_CLASSIFICATION_CLASS}>
                <MenuItem href="/article/list/me" onClick={closeMenu}>
                  <DocsIcon />
                  내가 작성한 포스팅
                </MenuItem>
                <MenuItem href="/article/list/favorite" onClick={closeMenu}>
                  <FilledFavoriteIcon />
                  즐겨찾기
                </MenuItem>
                <MenuItem href="/bookmark/list/me/all" onClick={closeMenu}>
                  <MarkedMapIcon />
                  북마크 컬렉션
                </MenuItem>
                <MenuItem href="/me" onClick={closeMenu}>
                  <CharacterIcon />내 정보
                </MenuItem>
              </div>
            </section>
          </ul>
        </nav>
        <button
          className="self-end flex gap-1 sm:text-base text-sm text-secondary hover:text-secondaryHover transition-colors ease-in-out"
          onClick={logout}
        >
          <SignOutIcon /> 로그아웃
        </button>
      </section>
    </MenuBackground>
  );
}
