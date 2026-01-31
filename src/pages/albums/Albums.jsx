import { useEffect } from "react";
import { Link } from "react-router-dom";

import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton ";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";

const Albums = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
  return (
    <div className="flex-1 rounded-lg p-4 pt-6 md:px-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center px-2 text-2xl text-white">
          <span className="mb-4 text-3xl font-bold md:inline">Albums's</span>
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <PlaylistSkeleton />
          ) : (
            albums?.map((album) => (
              <Link
                to={`/albums/${album._id}`}
                key={album._id}
                className="group flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-zinc-800"
              >
                <img
                  src={album.coverImage}
                  alt="Playlist img"
                  className="size-12 flex-shrink-0 rounded-md object-cover"
                />

                <div className="min-w-0 flex-1 md:block">
                  <p className="truncate font-medium">{album.title}</p>
                  <p className="truncate text-sm text-zinc-400">
                    Album • {album.artist}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
export default Albums;
