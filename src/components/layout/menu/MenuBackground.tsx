import ModalPortal from "@/components/ui/ModalPortal";

interface Props {
  children: React.ReactNode;
}

export default function MenuBackground({ children }: Props) {
  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 h-full w-full z-50 bg-neutral-900/40">
        {children}
      </div>
    </ModalPortal>
  );
}
