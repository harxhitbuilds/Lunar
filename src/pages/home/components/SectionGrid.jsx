import { Button } from "@/components/ui/button";
import { usePlayStore } from "@/stores/usePlayStore";

import SectionGridSkeleton from "../../../components/skeletons/SectionGridSkeleton";
import PlayButton from "./PlayButton";

const SectionGrid = ({ title, songs, isLoading }) => {
  const { playAll } = usePlayStore();
  const handlePlayAll = (songs) => {
    playAll(songs);
    console.log("button got clicked");
  };
  if (isLoading) {
    return <SectionGridSkeleton />;
  }
  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button
          variant="outline"
          className="rounded-4xl text-sm"
          onClick={() => handlePlayAll(songs)}
        >
          Play all
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {songs?.map((song) => (
          <div
            key={song._id}
            className="group cursor-pointer rounded-md p-4 transition-all hover:bg-zinc-950"
          >
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg">
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="h-full w-full rounded-xs object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="mr-2 min-w-0 flex-1">
                <h3 className="truncate font-medium">{song.title}</h3>
                <p className="test-sm truncate text-zinc-400">{song.artist}</p>
              </div>
              <PlayButton song={song} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SectionGrid;
