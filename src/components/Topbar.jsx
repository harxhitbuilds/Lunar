import { LayoutDashboardIcon } from "lucide-react";

import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Lunar from "@/assets/lunar.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/stores/useAuthStore";

import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

const Topbar = () => {
  const { isAdmin, logout, user, signup } = useAuthStore();
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      await signup();
    } catch (error) {
      console.log("Signup error: ", error);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div className="bg-background sticky top-0 z-10 flex items-center justify-between border-b border-zinc-800 p-4 px-4">
      <SidebarTrigger className="hidden md:flex" />

      <div className="flex items-center gap-2 px-3 md:hidden">
        <div className="flex h-5 w-5 items-center justify-center">
          <img src={Lunar} className="object-contain invert" alt="Lunar Logo" />
        </div>
        <h1 className="michroma text-lg font-bold">Lunar</h1>
      </div>

      <div className="flex items-center gap-8">
        {isAdmin && (
          <Link
            to={"/admin"}
            className="inter flex items-center rounded-sm bg-zinc-800 px-2 py-2 text-xs"
          >
            <LayoutDashboardIcon className="mr-2 size-3" />
            Admin Dashboard
          </Link>
        )}

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  className="cursor-pointer"
                  src={user?.profile}
                  alt="User Profile"
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="cursor-pointer">
              <DropdownMenuLabel onClick={() => navigate("/profile")}>
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel onClick={handleLogout}>
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!user && (
          <Button
            variant="outline"
            className="rounded-sm"
            onClick={handleSignUp}
          >
            <FaGoogle /> <span className="pb-1">SignUp</span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default Topbar;
