import Map from "@/components/Map";
import { getAllBookmarks } from "@/service/bookmarkCollection";

export default async function page() {
  // const testData = await getAllBookmarks(3);
  // console.log(testData);
  // console.log(typeof testData[0].location.latitude);

  return (
    <div className="h-[100vh] w-[100%]">
      page
      {/* <Map bookmarks={bookmarks} modifyState={true} /> */}
    </div>
  );
}
