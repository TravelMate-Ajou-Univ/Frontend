import { FormEvent, useState } from "react";
import FilledButton from "../ui/button/FilledButton";

interface Props {
  sendMessage: (message: string) => void;
}

export default function ChatForm({ sendMessage }: Props) {
  const [message, setMessage] = useState("");

  return (
    <form
      className="flex gap-2"
      onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
    >
      <input
        type="text"
        className="border rounded-md  flex-grow p-2"
        placeholder="Message.."
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <FilledButton
        onClick={() => {
          setMessage("");
          sendMessage(message);
        }}
      >
        전송
      </FilledButton>
    </form>
  );
}
