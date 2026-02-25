import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import useAuthStore from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayStore";

import FeaturedSection from "./components/FeaturedSection";
import SectionGrid from "./components/SectionGrid";
import SectionGridAlbum from "./components/SectionGridAlbum";
import SectionGridPlaylist from "./components/SectionGridPlaylist";

const HomePage = () => {
  const {
    trendingSongs,
    fetchTrendingSongs,
    fetchFeaturedSongs,
    isLoading,
    featuredSongs,
    fetchGetMadeForYouSongs,
    featuredAlbums,
    madeForYouSongs,
    fetchFeaturedAlbums,
    featuredPlaylists,
    fetchFeaturedPlaylists,
  } = useMusicStore();
  const { initializeQueue } = usePlayStore();
  const { user } = useAuthStore();
  const [greeting, setGreeting] = useState("Good Morning");
  const [tagline, settagline] = useState("");

  const updateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setGreeting("Good Evening");
    } else {
      setGreeting("Good Night");
    }
  };

  useEffect(() => {
    updateGreeting();
  }, []);

  useEffect(() => {
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchGetMadeForYouSongs();
    fetchFeaturedAlbums();
    fetchFeaturedPlaylists();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchFeaturedAlbums]);

  useEffect(() => {
    if (trendingSongs?.length > 0 && featuredSongs?.length > 0) {
      const allSongs = [...featuredSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, featuredSongs, trendingSongs]);

  return (
    <main className="bg-background h-full overflow-hidden rounded-md">
      <ScrollArea className="h-[calc(100vh-180px)] md:px-10">
        <div className="flex flex-col p-4 sm:p-6">
          <FeaturedSection title="Quick picks" isLoading={isLoading} />
          <div>
            <SectionGrid
              title="Trending songs for you"
              songs={trendingSongs}
              isLoading={isLoading}
            />
            <SectionGridAlbum
              title="Featured albums for you"
              albums={featuredAlbums}
              isLoading={isLoading}
            />
            <SectionGrid
              title="Music for you"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            <SectionGridPlaylist
              title="Some Playlists for You"
              playlists={featuredPlaylists}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
export default HomePage;
