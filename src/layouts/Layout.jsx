import { Home, Library, Loader, Menu, Search, X } from "lucide-react";
import { motion } from "motion/react";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

import Lunar from "@/assets/lunar.png";
import Topbar from "@/components/Topbar";
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import AudioPlayer from "./components/AudioPlayer";
import LeftSidebar from "./components/LeftSidebar";
import PlaybackControls from "./components/PlaybackControls";
import useMobile from "./hooks/isMobile";

const MainLayout = () => {
  const { isMobile } = useMobile(768);
  const [menuOpen, setMenuOpen] = useState(false);

  if (isMobile === null) {
    return (
      <div className="h-dvh w-full items-center justify-center bg-black">
        <Loader className="animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden text-white">
      <SidebarProvider>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <Sidebar className="bg-background border-r border-zinc-800">
            <SidebarHeader className="px-4 pt-6 pb-4">
              <div className="flex items-center gap-2 px-3">
                <div className="flex h-5 w-5 items-center justify-center">
                  <img
                    src={Lunar}
                    className="object-contain invert"
                    alt="Lunar Logo"
                  />
                </div>
                <h1 className="michroma text-lg font-bold">Lunar</h1>
              </div>
            </SidebarHeader>
            <LeftSidebar />
          </Sidebar>
          <SidebarInset className="overflow-auto">
            <Topbar />
            <Outlet />
          </SidebarInset>
        </div>
        <PlaybackControls />
      </SidebarProvider>

      {isMobile && (
        <>
          <button
            className="fixed right-4 bottom-40 z-50 cursor-pointer rounded-full bg-white p-4 text-black shadow-lg focus:outline-none"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? (
              <X size={20} className="text-black" />
            ) : (
              <Menu size={20} className="text-black" />
            )}
          </button>

          <motion.div
            className="fixed right-4 bottom-56 z-40 flex flex-col items-center space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: menuOpen ? 1 : 0,
              y: menuOpen ? 0 : 50,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {menuOpen && (
              <>
                {[
                  { to: "/", icon: <Home size={20} /> },
                  { to: "/search", icon: <Search size={20} /> },
                  { to: "/playlist", icon: <Library size={20} /> },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    className="rounded-full bg-zinc-800 p-3 hover:bg-emerald-900"
                    initial={{ opacity: 0, y: 50 * (index + 1) }}
                    animate={{
                      opacity: menuOpen ? 1 : 0,
                      y: menuOpen ? 0 : 50 * (index + 1),
                    }}
                    transition={{ delay: 0.1 * index, duration: 0.2 }}
                  >
                    <Link to={item.to} onClick={() => setMenuOpen(false)}>
                      {item.icon}
                    </Link>
                  </motion.div>
                ))}
              </>
            )}
          </motion.div>
        </>
      )}

      <AudioPlayer />
    </div>
  );
};

export default MainLayout;
