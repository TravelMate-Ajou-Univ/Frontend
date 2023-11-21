import ChatRoomListHeader from "@/components/chat/ChatRoomListHeader";
import ChatRoomList from "@/components/chat/ChatRoomList";

export default function ChatListPage() {
  return (
    <section className="flex flex-col w-[70%] m-auto">
      <ChatRoomListHeader />
      <ChatRoomList />
    </section>
  );
}
