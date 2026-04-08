"use client";

import { usePathname } from "next/navigation";
import Navbar from "../navbar/navbar";
// import Navbar from "../navbar/navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";

  // Show Navbar only for routes under /product
  const showNavbar = pathname.startsWith("/product");

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}