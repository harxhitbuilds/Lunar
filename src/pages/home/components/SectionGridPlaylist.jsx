import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const SectionGridPlaylist = ({ title, playlists, isLoading }) => {
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          <Link to="/playlist">Show all</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {playlists?.map((playlist) => (
          <div
            key={playlist._id}
            className="group cursor-pointer rounded-md p-4 transition-all hover:bg-zinc-950"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg">
                <img
                  src={playlist.coverImage}
                  alt={playlist.title}
                  className="h-full w-full rounded-xs object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="mr-2 min-w-0 flex-1">
                <h3 className="truncate font-medium">{playlist.title}</h3>
                <p className="test-sm truncate text-zinc-400">
                  {playlist.artist}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SectionGridPlaylist;
