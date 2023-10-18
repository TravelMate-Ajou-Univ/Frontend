import Map from "@/components/Map";
import { Bookmark } from "@/model/bookmark";

export default function BookmarkPage() {
  // test bookmark
  const test_bookmark: Bookmark[] = [
    // {
    //   lat: 37.57979553563185,
    //   lng: 126.97706245552443
    // },
    // {
    //   lat: 37,
    //   lng: 126
    // },
    // {
    //   lat: 38,
    //   lng: 127
    // }
  ];

  return (
    <div className="w-full h-full">
      <Map bookmarks={test_bookmark} />
    </div>
  );
}
