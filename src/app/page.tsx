"use client";
import { useEffect, useState } from "react";
import Laptop from "./components/Laptop";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 600px)").matches);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="h-screen w-screen mx-auto content-center hover:cursor-default">
        <h1 className="p-2 pl-7 text-7xl inline-block font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-fuchsia-700">
          Jan Achumbre
        </h1>
        <h2 className="p-1 pl-7 text-3xl font-bold font-mono ">
          <span className="bg-gradient-to-r from-orange-500 to-fuchsia-700 bg-clip-text text-transparent">
            Entry
          </span>{" "}
          Full-Stack Developer
        </h2>
        <p className="p-7 md:w-1/3 sm:w-full text-lg text-gray-300 ">
          After graduating from college, I immediately began working on websites
          and web applications. I love designing user interfaces as well as fun
          and interactive components. I also do graphic designing as a side
          hobby.
        </p>
      </div>

      {/* Don't want this big'ol laptop on phones */}
      {!isMobile && (
        <Laptop className="md:h-2/3 md:w-2/3 md:absolute sm:h-1/3 right-1 md:top-[10rem] animate-ltor " />
      )}
    </>
  );
}
