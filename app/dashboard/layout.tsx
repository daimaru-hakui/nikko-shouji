"use client";
import React, { useCallback, useEffect } from "react";
// import "../../app/globals.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DrawerSidebar from "@/app/components/drawer-sidebar";
import Sidebar from "../components/sidebar";
import { useStore } from "@/store";
import Navbar from "../components/nav-bar";
import "../globals.css";

const Dashboardlayout = ({ children }: { children: React.ReactNode; }) => {
  const supabase = createClientComponentClient();
  const isSidebar = useStore((state) => state.isSidebar);
  const setSession = useStore((state) => state.setSession);

  const getSession = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    setSession(session);
  }, [supabase, setSession]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  console.log("dashboard");
  return (
    <>
      <div
        style={{ transition: "0.2s" }}
        className={`${isSidebar ? "sidebarTwoColumn" : "sidebarOneColumn"} `}
      >
        <Sidebar />
        <DrawerSidebar />
        <main
          className={`grid content-start w-full`}
        >
          <Navbar />
          <div className="p-6 md:p-12 w-full flex flex-col justify-start items-center">{children}</div>
        </main>
      </div>
    </>
  );
};

export default Dashboardlayout;
