"use client";
import { useStore } from "@/store";
import React from "react";
import { BiMenuAltLeft, BiMenu } from "react-icons/bi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import DropDown from "./drop-down";

const Navbar = () => {
  const isSidebar = useStore((state) => state.isSidebar);
  const toggleIsSidebar = useStore((state) => state.toggleSidebar);
  const supabase = createClientComponentClient();
  const router = useRouter();

  return (
    <div 
    className="flex items-center justify-between w-full h-10 sticky top-0 z-10 bg-white"
    >
      <div className="p-2">
        <BiMenuAltLeft
          style={{ fontSize: "24px",transition: "0.2s" }}
          className="cursor-pointer"
          onClick={() => toggleIsSidebar()}
        />
      </div>
      {isSidebar}
      <nav className="flex">
      </nav>
     <DropDown/>
    </div>
  );
};

export default Navbar;