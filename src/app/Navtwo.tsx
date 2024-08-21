"use client";
import Link from "next/link";
import React from "react";

export const Navtwo = () => {
  return (
    <nav className="fixed flex gap-10 m-2 ml-7 md:text-2xl font-mono bg-gradient-to-r from-orange-500 to-fuchsia-700 bg-clip-text">
      <Link href="/" className="hover:text-transparent transition-all">
        Home
      </Link>
      <Link href="/projects" className="hover:text-transparent transition-all ">
        Projects
      </Link>
      <Link
        href="/experience"
        className="hover:text-transparent transition-all"
      >
        Experience
      </Link>
    </nav>
  );
};
