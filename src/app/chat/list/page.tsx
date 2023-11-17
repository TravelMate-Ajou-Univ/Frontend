import ChatRoomHeader from "@/components/chat/ChatRoomHeader";
import ChatRoomList from "@/components/chat/ChatRoomList";

export default function ChatListPage() {
  return (
    <section className="flex flex-col w-[70%] m-auto">
      <ChatRoomHeader />
      <ChatRoomList />
    </section>
  );
}
