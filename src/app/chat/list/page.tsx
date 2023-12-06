import ChatRoomListHeader from "@/components/chat/ChatRoomListHeader";
import ChatRoomList from "@/components/chat/ChatRoomList";

export default function ChatListPage() {
  return (
    <section className="flex flex-col lg:w-mainSection md:w-mainSectionMd sm:w-mainSectionSm w-full m-auto">
      <ChatRoomListHeader />
      <ChatRoomList />
    </section>
  );
}
