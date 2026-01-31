import { HomeIcon, icons, Library, ListMusic, Search } from "lucide-react";

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton ";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useMusicStore } from "@/stores/useMusicStore";

export const navItems = [
  { to: "/", icon: HomeIcon, label: "Home" },
  { to: "/albums", icon: Library, label: "Albums" },
  { to: "/playlists", icon: ListMusic, label: "Playlists" },
  { to: "/search", icon: Search, label: "Search" },
];

const LeftSidebar = () => {
  const { isLoadingAlbums, fetchAlbums, albums } = useMusicStore();
  const location = useLocation();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  asChild
                  isActive={location.pathname === item.to}
                  tooltip={item.label}
                  className="flex min-h-[48px] items-center gap-3 pl-5"
                >
                  <Link to={item.to}>
                    <item.icon className="!h-5 !w-5 shrink-0" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup className="flex-1">
        <SidebarGroupContent>
          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="space-y-2">
              {isLoadingAlbums ? (
                <PlaylistSkeleton />
              ) : (
                albums.map((album) => (
                  <Link
                    to={`/albums/${album._id}`}
                    key={album?._id}
                    className="group flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-zinc-800"
                  >
                    <img
                      src={album?.coverImage}
                      alt="Playlist img"
                      className="size-12 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="hidden min-w-0 flex-1 md:block">
                      <p className="truncate font-medium">{album?.title}</p>
                      <p className="truncate text-sm text-zinc-400">
                        Album • {album?.artist}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default LeftSidebar;
