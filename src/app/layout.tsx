import type { Metadata } from "next";
import { Navbar } from "./Navbar";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navtwo } from "./Navtwo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Jan Achumbre's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navtwo />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
