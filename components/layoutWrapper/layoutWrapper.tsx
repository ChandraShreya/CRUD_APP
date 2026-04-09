"use client";

import { usePathname } from "next/navigation";
import Navbar from "../navbar/navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  const showNavbar = pathname.startsWith("/product");

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}