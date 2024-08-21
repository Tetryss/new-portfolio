"use client";
import React, { useEffect, useState } from "react";
import projectsData from "./projects.json";

type proj = {
  image: string;
  description: string;
  title: string;
  link: string;
};
export default function Page() {
  const [projects, setProjects] = useState<proj[]>([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const isMobile = window.matchMedia("(max-width: 600px)").matches; //Checks if the client is mobile device

  function clickHandler(e: React.MouseEvent<HTMLDivElement>) {
    const elems = document.querySelectorAll(".selected-active");
    elems.forEach((elem) => {
      const temp = elem as HTMLDivElement;
      temp.classList.toggle("selected-active");
    });
    e.stopPropagation(); //SEE IF THIS BREAKS STUFF (it literally does not stop bubbling gg)
    const target = e.target as HTMLDivElement;
    target.classList.toggle("selected-active");
  }

  function scaleOnClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.toggle("mobile-show");
    const rect = target.getBoundingClientRect();
    const centerX = (window.innerWidth - rect.width) / 2 - rect.left;
    const centerY = (window.innerHeight - rect.height + 460) / 2 - rect.top;

    target.style.transform = `translate(${centerX}px, ${
      centerY + 5
    }px) scale(3)`;

    // remove the styles when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (!target.contains(event.target as Node)) {
        target.style.transform = ""; // reset the transform
        target.classList.toggle("mobile-show");
        document.removeEventListener("click", handleClickOutside);
      }
    };

    document.addEventListener("click", handleClickOutside);
  }

  // Function to interpolate between two colors
  function interpolateColor(
    color1: [number, number, number],
    color2: [number, number, number],
    factor: number
  ) {
    const result = color1.map((c, i) => {
      return Math.round(c + (color2[i] - c) * factor);
    });
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  }

  return (
    <>
      <div>
        {isMobile ? (
          <div className="absolute top-[4rem] h-[50vh] w-screen flex flex-wrap justify-center items-center gap-1">
            {projects.map((data, index) => {
              const factor = index / (projects.length - 1);
              const backgroundColor = interpolateColor(
                [162, 20, 175],
                [249, 115, 22],
                factor
              );
              return (
                <div
                  key={index}
                  onClick={scaleOnClick}
                  style={{ backgroundColor: backgroundColor }}
                  className="overflow-hidden px-1 font-bold font-mono w-32 h-28 rounded-lg shadow-xl transition-all duration-300"
                >
                  {data.title}
                  <img
                    className="opacity-0 rounded-lg"
                    src={data.image}
                    alt="Project Image"
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="w-[20%] h-screen block float-left items-center">
              {projects.map((data, index) => {
                const factor = index / (projects.length - 1);
                const backgroundColor = interpolateColor(
                  [162, 20, 175],
                  [249, 115, 22],
                  factor
                );
                return (
                  <div
                    onClick={clickHandler}
                    key={index}
                    style={{
                      transform: `translateY(${
                        -(projects.length - 1 - index) * 1.7
                      }rem)`,
                      backgroundColor: backgroundColor,
                      writingMode: "vertical-lr",
                    }}
                    className="hover:ring-2 ring-white p-2 font-bold w-[20rem] h-[15rem] absolute rounded-xl shadow-xl hover:ml-16 hover:cursor-pointer transition-all duration-300 ease-in-out bottom-[7rem] left-6"
                  >
                    <h1 className="right-1 bottom-1 absolute line-clamp-1">
                      {data.title}
                    </h1>
                    {data.image ? (
                      <img
                        className="hidden h-2/3 m-2 rounded-2xl"
                        src={data.image}
                        alt={`image of ${data.title} project`}
                      />
                    ) : (
                      ""
                    )}
                    <p className="invisible p-2">{data.description}</p>
                    <a
                      className=" font-mono absolute block w-full invisible text-2xl hover:text-orange-500 transition-all text-fuchsia-700 text-center bottom-[-3rem]"
                      href={data.link ? data.link : ""}
                      target={data.link ? "_blank" : ""}
                    >
                      {data.link
                        ? "Link to Project"
                        : "This project does not have a link"}
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="h-screen content-center">
              <p className="text-center font-bold text-6xl">
                <span className="bg-gradient-to-r from-orange-500 to-fuchsia-700 bg-clip-text text-transparent">
                  Choose
                </span>{" "}
                a card!
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
