"use client";
import Link from "next/link";
import Cloud from "./components/Cloud";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [active, setActive] = useState(false);
  const [wiggle, setWiggle] = useState(false);

  function clickHandler(e: React.MouseEvent) {
    setActive((x) => !x);
    setWiggle((x) => !x);
    localStorage.setItem("firstVisit", "1");
  }

  useEffect(() => {
    if (localStorage.getItem("firstVisit") == null) {
      setWiggle(true);
    } else {
      setWiggle(false);
    }
  }, [[], wiggle]);

  return (
    <>
      <div
        onClick={clickHandler}
        className={`${
          wiggle && !active ? "animate-wiggle" : null
        } cursor-pointer fixed bottom-4 left-4 m-2 z-10 select-none transition-all duration-300 ease-in-out`}
      >
        <Cloud
          className={`${
            active
              ? "scale-75 fill-orange-500"
              : "fill-white hover:fill-orange-500"
          } transition-all scale-125`}
        />
        <div
          className={`${
            active
              ? "scale-100 translate-y-[-7rem]"
              : "scale-0 translate-y-[-3rem]"
          } hover:font-bold hover:ring-2 ring-white text-white bg-gradient-to-r from-orange-500 to-fuchsia-700 rounded-full p-1 transition-all duration-200  absolute ease-in-out`}
        >
          <Link href="/projects">Projects</Link>
        </div>
        <div
          className={`${
            active
              ? "scale-100 translate-x-[5rem] translate-y-[-6rem]"
              : "scale-0 translate-y-[-3rem]"
          } hover:font-bold hover:ring-2 ring-white text-white bg-gradient-to-r from-orange-500 to-fuchsia-700 rounded-full p-1 transition-all duration-200 delay-75 absolute ease-in-out`}
        >
          <Link href="/">Home</Link>
        </div>
        <div
          className={`${
            active
              ? "scale-100 translate-x-[5rem] translate-y-[-3rem]"
              : "scale-0 translate-y-[-3rem] opacity-0"
          } hover:font-bold hover:ring-2 ring-white text-white bg-gradient-to-r from-orange-500 to-fuchsia-700 rounded-full p-1 transition-all duration-200 delay-150 absolute ease-in-out`}
        >
          <Link href="/experience">Experience</Link>
        </div>
      </div>
    </>
  );
};
