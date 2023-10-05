"use client";
import React, { useCallback, useEffect } from "react";
import "../../app/globals.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DrawerSidebar from "@/app/components/drawer-sidebar";
import Sidebar from "../components/sidebar";
import { useStore } from "@/store";
import Navbar from "../components/nav-bar";

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
      className={`${isSidebar ? "dashboardLayout" : "dashboardLayoutNotSidebar"}`}
    >
      <Sidebar />
      <DrawerSidebar />
      <main className={`grid content-start w-full`}>
        <Navbar />
        <div className="px-6 py-3 w-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
    </>
  );
};

export default Dashboardlayout;
