import ActivitySection from "@/components/myPage/ActivitySection";
import Profile from "@/components/myPage/Profile";
import React from "react";

export default function MyPage() {
  return (
    <div className="lg:w-mainSection md:w-mainSectionMd sm:w-mainSectionSm w-full mx-auto">
      <Profile />
      <ActivitySection />
    </div>
  );
}
