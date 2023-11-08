import Chat from "@/components/chat/Chat";

interface Props {
  params: {
    slug: string;
  };
}

export default function ChatPage({ params: { slug } }: Props) {
  const roomid = slug;

  return (
    <>
      <Chat roomid={roomid} />
    </>
  );
}
