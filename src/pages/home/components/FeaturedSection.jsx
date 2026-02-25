import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";

import PlayButton from "./PlayButton";

const FeaturedSection = ({ title, isLoading }) => {
  const { featuredSongs } = useMusicStore();
  if (isLoading) {
    return <FeaturedGridSkeleton />;
  }
  return (
    <div className="my-6 flex flex-col gap-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredSongs?.map((song) => (
          <div
            key={song._id}
            className="group relative flex cursor-pointer items-center gap-2 overflow-hidden transition-colors"
          >
            <img
              src={song.coverImage}
              alt={song.title}
              className="h-12 w-12 flex-shrink-0 rounded-xs object-cover"
            />
            <div className="min-w-0 flex-1 pl-4">
              <p className="text-md truncate font-medium">{song.title}</p>
              <p className="text-md truncate overflow-hidden whitespace-nowrap text-zinc-400">
                {song.artist}
              </p>
            </div>
            <PlayButton song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default FeaturedSection;
