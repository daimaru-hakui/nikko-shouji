"use client";
import { useStore } from "@/store";
import React from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./drop-down";

const Navbar = () => {
  const isSidebar = useStore((state) => state.isSidebar);
  const toggleIsSidebar = useStore((state) => state.toggleSidebar);

  return (
    <div
      className="flex items-center justify-between w-full h-10 sticky top-0 z-20 bg-white shadow-sm"
    >
      <div className="p-2">
        <BiMenuAltLeft
          style={{ fontSize: "24px", transition: "0.2s" }}
          className="cursor-pointer"
          onClick={() => toggleIsSidebar()}
        />
      </div>
      {isSidebar}
      <nav className="flex">
      </nav>
      <DropDown />
    </div>
  );
};

export default Navbar;