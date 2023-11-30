import ActivitySection from "@/components/myPage/ActivitySection";
import Profile from "@/components/myPage/Profile";
import React from "react";

export default function MyPage() {
  return (
    <div className="w-mainSection mx-auto">
      <Profile />
      <ActivitySection />
    </div>
  );
}
