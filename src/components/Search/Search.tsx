"use client";

import { useEffect, useState } from "react";
import DropDown from "../ui/dropDown/DropDown";
import SearchIcon from "../ui/icons/SearchIcon";
import { locationList } from "@/lib/locationList";
import { seasonList } from "@/lib/seasonList";
import Keyword from "../ui/Keyword";
import { useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const [location, setLocation] = useState("전쳬");
  const [seasons, setSeasons] = useState<string[]>([]);
  const [word, setWord] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParams.get("word") && setWord(searchParams.get("word")!);
    if (!searchParams.get("location")) setLocation("전체");
    else setLocation(searchParams.get("location")!);
    searchParams.getAll("seasons").length !== 0 &&
      setSeasons(searchParams.getAll("seasons"));
    console.log(searchParams.getAll("seasons"));
  }, [searchParams]);

  const handleWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (word === "") return;
    const pathname = getPathname(word, location, seasons);
    router.push(pathname);
    // router.push(`/article/list?word=${word}&location=${location}`);
  };

  const handleLocation = (location: string) => {
    const pathname = getPathname(word, location, seasons);
    router.push(pathname);
    // if (location === "전체") router.push(`/article/list?word=${word}`);
    // else
    //   router.push(
    //     `/article/list?${
    //       word === "" ? "" : `word=${word}`
    //     }&location=${location}`
    //   );
  };

  const handleSeason = (season: string) => {
    let newSeasons;
    if (seasons.includes(season)) {
      newSeasons = seasons.filter(s => s !== season);
      setSeasons(newSeasons);
    } else {
      newSeasons = [...seasons, season];
      setSeasons(newSeasons);
    }

    const pathname = getPathname(word, location, newSeasons);
    // console.log(pathname);
    // const seasonQuery =
    //   newSeasons.length === 0
    //     ? [""]
    //     : newSeasons.map(season => `seasons=${season}&`);
    // // for (let i = 0; i < seasonQuery.length; i++) {
    // //   const query = seasonQuery[i].toString();
    // //   pathname.concat(query);
    // // }
    // console.log(seasonQuery);
    // const query = seasonQuery.join("");

    router.push(pathname);
  };

  const getPathname = (
    word: string,
    location: string,
    seasons: string[]
  ): string => {
    const pathname = "/article/list?";
    const wordQuery = word === "" ? "" : `word=${word}&`;
    const locationQuery = location === "전체" ? "" : `location=${location}&`;
    const seasonQuery =
      seasons.length === 0 ? [""] : seasons.map(season => `seasons=${season}&`);
    return pathname.concat(wordQuery, locationQuery, seasonQuery.join(""));
  };

  return (
    <section>
      <div className="flex gap-8 items-center mt-12">
        <span className="text-primary text-xl font-semibold">검색하기</span>
        <div className="flex-grow h-12 px-6 border rounded-full bg-white flex flex-row justify-between items-center gap-3">
          <SearchIcon />
          <form className="flex-grow" onSubmit={search}>
            <input
              className="w-full h-8 outline-none"
              type="text"
              placeholder="제목, 키워드로 쉐어포스팅을 검색해보세요!"
              value={word}
              onChange={handleWord}
            />
          </form>
          <DropDown
            selected={location}
            setSelected={handleLocation}
            list={["전체", ...locationList]}
            border={false}
          />
        </div>
      </div>
      <ul className="ml-32 mt-4">
        {seasonList.map((season, index) => (
          <li
            className="inline-block mx-2 cursor-pointer"
            key={index}
            onClick={() => handleSeason(season)}
          >
            <Keyword
              keyword={season}
              big
              isSelected={seasons.includes(season)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
