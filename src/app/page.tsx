import HomeMap from "@/components/home/HomeMap";
import HomeTitle from "@/components/home/HomeTitle";
import HomeBG from "@/components/layout/HomeBG";

export default function page() {
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <HomeBG />
      <HomeTitle />
      <HomeMap />
    </div>
  );
}
