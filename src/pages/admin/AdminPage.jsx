import { Album, ListMusic, Music } from "lucide-react";

import { useEffect } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";

import AlbumsTabContent from "./components/AlbumsTabContent";
import DashboardStats from "./components/DashboardStats";
import Header from "./components/Header";
import PlaylistsTabContent from "./components/PlaylistsTabContent";
import SongsTabContent from "./components/SongsTabContent";

const AdminPage = () => {
  const { fetchSongs, fetchAlbums, fetchStats, fetchPlaylists } =
    useMusicStore();
  const { isAdmin, isLoading } = useAuthStore();

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
    fetchStats();
    fetchPlaylists();
  }, [fetchSongs, fetchAlbums, fetchStats]);

  if (!isAdmin) return <div className="text-white">Unauthorized</div>;

  return (
    <div className="min-h-screen bg-black p-8 text-zinc-100">
      <Header />
      <DashboardStats />

      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="bg-zinc-800/50 p-1">
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700"
          >
            <Music className="mr-2 size-4" />
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700"
          >
            <Album className="mr-2 size-4" />
            Albums
          </TabsTrigger>

          <TabsTrigger
            value="playlists"
            className="data-[state=active]:bg-zinc-700"
          >
            <ListMusic className="mr-2 size-4" />
            Playlists
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs">
          <SongsTabContent />
        </TabsContent>

        <TabsContent value="albums">
          <AlbumsTabContent />
        </TabsContent>

        <TabsContent value="playlists">
          <PlaylistsTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminPage;
