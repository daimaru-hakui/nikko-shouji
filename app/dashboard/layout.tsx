"use client";
import React, { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import DrawerSidebar from "@/app/components/drawer-sidebar";
import Sidebar from "@/components/sidebar";
import { useStore } from "@/store";
import Navbar from "@/components/nav-bar";
import "../globals.css";
import { DefaultSpinner } from "@/components/default-spinner";

const Dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClientComponentClient();
  const isSidebar = useStore((state) => state.isSidebar);
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;
      setSession(session);
    };
    getSession();
  }, [setSession, supabase.auth]);

  console.log("dashboard");
  return (
    <>
      <DefaultSpinner />
      <div
        style={{ transition: "0.2s" }}
        className={`${isSidebar ? "sidebarTwoColumn" : "sidebarOneColumn"} `}
      >
        <Sidebar />
        <DrawerSidebar />
        <main className={`grid content-start w-full`}>
          <Navbar />
          <div className="w-full p-6 flex flex-col justify-start items-center overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboardlayout;
