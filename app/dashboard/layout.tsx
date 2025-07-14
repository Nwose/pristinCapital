"use client";

import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <div
          className={`${
            isMobile
              ? isCollapsed
                ? "hidden"
                : "fixed top-0 left-0 z-50"
              : "relative"
          } h-full`}
        >
          <Sidebar
            isCollapsed={isMobile ? false : isCollapsed}
            onToggle={toggleSidebar}
          />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header onMenuClick={() => setIsCollapsed(false)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
}
