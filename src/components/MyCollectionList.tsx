import Collection from "@/components/Collection";
import { getMyCollectionList } from "@/service/bookmarkCollection";
import AddCollectonButton from "./AddCollectonButton";

export default async function MyCollectionList() {
  const data = await getMyCollectionList();

  return (
    <section className="w-full p-4">
      <div className="flex flex-col w-[60%] mx-auto">
        <AddCollectonButton />
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
