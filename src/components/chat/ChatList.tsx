import Image from "next/image";
import defaultProfileImg from "/public/image/defaultProfileImg.png";

export default function ChatList() {
  return (
    <section className="w-full h-[33rem]">
      <ul className="flex flex-col border-2 rounded-md bg-white h-full relative">
        <li key={1} className="justify-end flex items-start">
          <p className="border-2 rounded-md m-1 p-2 w-[15rem] break-words">
            tesiorehgvuaerbgviualegbioae;rnggeg;earbio;aernrbh
            erLabvu;aebhalitfaergaervglearbigonearobnraoit;nabmjkbnjsklrnjk
          </p>
          <div className="flex items-center">
            <Image
              src={defaultProfileImg}
              className="bg-gray-100 rounded-full m-2"
              width={30}
              height={30}
              alt="my Image"
            />
          </div>
        </li>
        <li key={2} className="justify-end flex ">
          <div className="border-2 rounded-md m-1 p-2">test</div>
          <div className="flex items-center">
            <Image
              src={defaultProfileImg}
              className="bg-gray-100 rounded-full"
              width={30}
              height={30}
              alt="my Image"
            />
          </div>
        </li>
      </ul>
    </section>
  );
}
