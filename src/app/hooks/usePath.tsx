"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const usePath = () => {
  const [path, setPath] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    setPath(pathname);
  }, [pathname]);
  return path;
};
