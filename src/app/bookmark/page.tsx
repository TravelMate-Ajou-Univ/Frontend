import AddCollectonButton from "@/components/AddCollectonButton";
import Collection from "@/components/Collection";
import VisibilityButton from "@/components/ui/VisibilityButton";
import { getMyCollectionList } from "@/service/bookmarkCollection";

export default async function BookmarkPage() {
  const data = await getMyCollectionList({
    number: 1,
    limit: 20,
    visibility: "ALL"
  });

  return (
    <section className="w-full p-4">
      <div className="flex flex-col w-[60%] mx-auto">
        <div className="flex items-center">
          {/* <VisibilityButton /> */}
          <AddCollectonButton />
        </div>
        <div className="my-4 border-4 rounded-md p-7 ">
          <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {data.map((bookmarkCollection, index) => (
              <li key={index}>
                <Collection bookmarkCollection={bookmarkCollection} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
