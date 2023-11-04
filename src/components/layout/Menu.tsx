import Link from "next/link";
import MenuProfile from "./MenuProfile";
import XIcon from "../ui/icons/XIcon";
import MenuBackground from "./MenuBackground";
import useClickOutside from "@/hooks/useClickOutside";
import MarkedMapIcon from "../ui/icons/MarkedMapIcon";

interface Props {
  closeMenu: () => void;
}

export default function Menu({ closeMenu }: Props) {
  const ref = useClickOutside(closeMenu);

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
        <nav className="px-5 text-gray-800">
          <ul>
            <li>
              <Link
                href="bookmark/list/me/all"
                className="flex gap-2 items-center"
                onClick={closeMenu}
              >
                <MarkedMapIcon />
                북마크컬렉션 목록
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </MenuBackground>
  );
}
