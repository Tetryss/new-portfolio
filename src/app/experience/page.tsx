"use client";
import { useEffect, useState } from "react";
import experienceData from "./experiences.json";

type Entry = {
  Title: string;
  Date: string;
};

type DataFormat = {
  Topic: string;
  Entries: Entry[];
};

export default function Home() {
  const [data, setData] = useState<DataFormat[]>();

  useEffect(() => {
    setData(experienceData);
  }, []);

  function clickHandler(e: React.MouseEvent<HTMLDivElement>) {}

  return (
    <>
      {/* <img
        className="absolute w-1/6 -z-10 right-1 bottom-1 "
        src="https://i.imgur.com/OwZ76OW.gif"
        alt="IntroGif"
      /> */}
      <div className="w-full h-screen content-center font-mono">
        <div className="w-4/5 h-4/5 mx-auto flex justify-center gap-2 flex-col md:flex-row">
          {data?.map((item, index) => (
            <div
              className={`group bg-gray-800 cursor-pointer rounded-lg p-2 w-full md:w-1/5 h-fit px-5 hover:ring-2 ring-white`}
              key={index}
            >
              {/* TOPIC HERE */}
              <h2 className="text-4xl p-1 group-hover:text-transparent bg-gradient-to-r from-orange-500 to-fuchsia-700 bg-clip-text transition-all duration-500">
                {item.Topic}
              </h2>
              <hr className="rounded-lg h-1 border-transparent bg-gradient-to-r to-fuchsia-800 from-orange-500 w-1 group-hover:w-[16.5rem] transition-all duration-500" />
              {/* ENTRIES */}
              <div className="flex h-auto w-full flex-col">
                {item.Entries.map((item, index) => (
                  <div key={index} className="">
                    <h3 className="font-semibold text-[0rem] group-hover:text-base transition-all duration-500 opacity-40 hover:opacity-100 ease-out">
                      {item.Title} -{" "}
                      <span className="text-orange-500">{item.Date}</span>
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
