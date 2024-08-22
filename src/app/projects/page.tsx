"use client";
import React, { useEffect, useRef, useState } from "react";
import projectsData from "./projects.json";

type proj = {
  image: string;
  description: string;
  title: string;
  link: string;
};
export default function Page() {
  const [projects, setProjects] = useState<proj[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const circle = useRef<HTMLDivElement>(null);
  const radius = 140;

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

  // Ensuring data is set
  useEffect(() => {
    setProjects(projectsData);
  }, []);

  // Ensuring Circle reference is set
  useEffect(() => {
    if (isMobile && circle) {
      console.log("Circle is set!");
      setProjects((prevProjects) => [...prevProjects]); // Needed to re-render
    }
  }, [isMobile, circle.current]);

  return (
    <>
      <div>
        {isMobile ? (
          <div
            ref={circle}
            className=" relative top-[5rem] h-[20rem] w-[20rem] mx-auto"
          >
            {projects.map((data, index) => {
              const factor = index / (projects.length - 1);
              const backgroundColor = interpolateColor(
                [162, 20, 175],
                [249, 115, 22],
                factor
              );
              let xi = 0;
              let yi = 0;

              if (circle.current) {
                const rect = circle.current.getBoundingClientRect();
                const centerX = rect.width / 2.5;
                const centerY = rect.height / 2.5;
                const angle = (2 * Math.PI * index) / projects.length;

                // Position calculations for circle
                xi = centerX + radius * Math.cos(angle);
                yi = centerY + radius * Math.sin(angle);
              }

              return (
                <div
                  onClick={presentClick}
                  key={index}
                  style={{
                    backgroundColor: backgroundColor,
                    transform: `translate(${xi}px, ${yi}px)`,
                  }}
                  className="overflow-hidden absolute w-16 h-16 rounded-full hover:ring-2 ring-white animate-pulse"
                >
                  <img
                    className="opacity-0 rounded-lg"
                    src={data.image}
                    alt="Project Image"
                  />
                  <p
                    key={data.title}
                    className="opacity-0 text-center text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] font-mono"
                  >
                    {data.title}
                  </p>
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
function presentClick(e: React.MouseEvent<HTMLDivElement>) {
  const target = e.currentTarget as HTMLDivElement;

  // Toggle the 'mobile-show' class on all other elements
  const elems = document.querySelectorAll<HTMLDivElement>(".mobile-show");
  elems.forEach((elem) => {
    if (elem !== target) {
      elem.classList.remove("mobile-show");
    }
  });

  // Toggle the class on the clicked element
  target.classList.toggle("mobile-show");
}

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
