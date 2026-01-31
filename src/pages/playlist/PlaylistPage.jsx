import { Clock, Pause, Play, Shuffle } from "lucide-react";

import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayStore";

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const PlaylistPage = () => {
  const { currentSong, isPlaying, toggle, playPlaylist, shufflePlaylist } =
    usePlayStore();
  const { id } = useParams();
  const { currentPlaylist, fetchPlaylistById, isLoadingCurrentPlaylist } =
    useMusicStore();

  useEffect(() => {
    fetchPlaylistById(id);
  }, [fetchPlaylistById, id]);

  if (isLoadingCurrentPlaylist) {
    return null;
  }

  const handlePlaySong = (index) => {
    if (!currentPlaylist) return;
    playPlaylist(currentPlaylist?.songs, index);
  };

  const handleShufflePlaylist = () => {
    if (!currentPlaylist) return;
    shufflePlaylist(currentPlaylist?.songs, 0);
  };

  const handlePlayAlbum = () => {
    const isCurrentPlaylistPlaying = currentPlaylist?.songs.some(
      (song) => song._id === currentSong?._id,
    );
    if (isCurrentPlaylistPlaying) {
      toggle();
    } else {
      playPlaylist(currentPlaylist?.songs);
    }
  };

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        {/* Main Content */}
        <div className="relative min-h-full">
          {/* bg gradient */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex gap-6 p-6 pb-8">
              <img
                src={currentPlaylist?.coverImage}
                alt={currentPlaylist?.title}
                className="h-[240px] w-[240px] rounded shadow-xl"
              />
              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="my-4 text-7xl font-bold">
                  {currentPlaylist?.title}
                </h1>
                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentPlaylist?.artist}
                  </span>
                  <span>• {currentPlaylist?.songs?.length} songs</span>
                </div>
              </div>
            </div>

            {/* play button */}
            <div className="flex items-center gap-6 px-6 pb-4">
              <Button
                onClick={handlePlayAlbum}
                size="icon"
                className="h-14 w-14 rounded-full bg-white transition-all hover:scale-105 hover:bg-zinc-400"
              >
                {isPlaying &&
                currentPlaylist?.songs.some(
                  (song) => song._id === currentSong?._id,
                ) ? (
                  <Pause className="h-7 w-7 text-black" />
                ) : (
                  <Play className="h-7 w-7 text-black" />
                )}
              </Button>
              <Button
                onClick={handleShufflePlaylist}
                size="icon"
                className="h-14 w-14 rounded-full bg-white transition-all hover:scale-105 hover:bg-zinc-400"
              >
                <Shuffle
                  className="h-14 w-14 rounded-full transition-all hover:scale-105 hover:bg-zinc-400"
                  size="icon"
                />
              </Button>
            </div>

            {/* Table Section */}
            <div className="bg-black/20 backdrop-blur-sm">
              {/* table header */}
              <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 border-b border-white/5 px-10 py-2 text-sm text-zinc-400">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* songs list */}

              <div className="px-6">
                <div className="space-y-2 py-4">
                  {currentPlaylist?.songs?.map((song, index) => {
                    const isCurrentSong = currentSong?._id === song._id;
                    return (
                      <div
                        key={song._id}
                        onClick={() => {
                          handlePlaySong(index);
                        }}
                        className={`group grid cursor-pointer grid-cols-[16px_4fr_2fr_1fr] gap-4 rounded-md px-4 py-2 text-sm text-zinc-400 hover:bg-white/5`}
                      >
                        <div className="flex items-center justify-center">
                          {isCurrentSong && isPlaying ? (
                            <Pause className="h-4 w-4 text-green-500" />
                          ) : (
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                          )}
                          {!currentSong && (
                            <Play className="hidden h-4 w-4 group-hover:block" />
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={song.coverImage}
                            alt={song.title}
                            className="size-10"
                          />

                          <div>
                            <div className={`font-medium text-white`}>
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {song?.createdAt?.split("T")[0]}
                        </div>
                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
export default PlaylistPage;
