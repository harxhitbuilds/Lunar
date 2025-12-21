import { LayoutDashboardIcon, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useAuthStore from "@/stores/useAuthStore";
import Lunar from "@/assets/lunar.png";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

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
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-transparent
      z-10
      border-b border-zinc-800
      px-4
    "
    >
      <div className="flex gap-2 items-center text-2xl">
        <div className="h-5 w-5 flex items-center justify-center">
          <img src={Lunar} className="object-contain invert" alt="Lunar Logo" />
        </div>
        <h1 className="michroma text-[16px] ">Lunar</h1>
      </div>
      <div className="flex items-center gap-8">
        {isAdmin && (
          <Link
            to={"/admin"}
            className="flex items-center bg-zinc-800 px-2 py-2 rounded-sm text-xs inter"
          >
            <LayoutDashboardIcon className="size-3 mr-2" />
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
          <Button variant="outline" onClick={handleSignUp}>
            SignUp
          </Button>
        )}
      </div>
    </div>
  );
};
export default Topbar;
