import ModalPortal from "../ModalPortal";
import FilledButton from "../button/FilledButton";
import OutlinedButton from "../button/OutlinedButton";

interface Props {
  name: string;
  setReason: (content: string) => void;
  cancel: () => void;
  submit: () => void;
}

export default function BanModal({ name, setReason, cancel, submit }: Props) {
  return (
    <ModalPortal>
      <div className="fixed left-0 top-0 h-full w-full z-50 bg-neutral-900/40">
        <section className="flex flex-col gap-10 absolute bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[33rem] h-[40rem] shadow-xl px-12 py-16 rounded-xl border-[2.5px] border-secondary">
          <h1 className="text-center text-2xl font-bold">{name} 정지 사유</h1>
          <form
            className="flex-grow flex flex-col"
            onSubmit={e => e.preventDefault()}
          >
            <textarea
              className="text-sm w-full flex-grow border rounded-md p-2 resize-none focus:outline-none"
              placeholder="정지 사유를 입력해주세요."
              onChange={e => setReason(e.target.value)}
            />
          </form>
          <div className="self-center flex gap-2">
            <OutlinedButton onClick={cancel}>취소</OutlinedButton>
            <FilledButton onClick={submit}>완료</FilledButton>
          </div>
        </section>
      </div>
    </ModalPortal>
  );
}
