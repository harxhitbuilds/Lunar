import { Search as SearchIcon } from "lucide-react";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAuthStore from "@/stores/useAuthStore";
import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayStore } from "@/stores/usePlayStore";

const Search = () => {
  const [query, setquery] = useState("");
  const { searchResults, searchSong, isLoading, error } = useMusicStore();
  const { initializeQueue, playAlbum } = usePlayStore();
  const { user } = useAuthStore();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        searchSong(query);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchSong, query]);

  useEffect(() => {
    if (searchResults?.length > 0) {
      initializeQueue(searchResults);
    }
  }, [searchResults, initializeQueue]);

  const handleSongClick = (song, index) => {
    if (searchResults?.length === 0) return;
    playAlbum(searchResults, index);
  };

  const handleInputChange = (e) => {
    setquery(e.target.value);
  };
  return (
    <div className="mb-8 h-[100vh] overflow-y-auto bg-black px-4">
      <div className="sticky top-0 z-20 pb-4">
        <div className="p-8" />
        <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
          Looking for songs{user?.firstName ? `, ${user.firstName}` : ""}?
        </h2>
        <div className="relative mx-auto mb-4 flex max-w-md items-center gap-2">
          <Input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="What do you want to play?"
            className="w-full rounded-full py-2 pr-4 pl-10 text-white"
          />
          <SearchIcon className="absolute left-3 text-white" />
        </div>
      </div>
      {error && (
        <div className="mb-4 text-center text-lg text-red-500">{error}</div>
      )}
      <div className="mx-auto w-full max-w-lg">
        <ScrollArea className="relative w-full">
          {query && searchResults?.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div
                key={searchResults[0]._id}
                onClick={() => handleSongClick(searchResults[0], 0)}
                className="relative mt-4 flex cursor-pointer items-center overflow-hidden rounded-md bg-zinc-800/50 p-4 transition-colors hover:bg-blue-800/20"
                style={{ height: "200px" }}
              >
                <img
                  src={searchResults[0].coverImage}
                  alt={searchResults[0].title}
                  className="h-40 w-40 flex-shrink-0 object-cover"
                />
                <div className="flex-1 pl-6">
                  <p className="truncate text-xl font-bold">
                    {searchResults[0].title}
                  </p>
                  <p className="truncate text-sm text-zinc-400">
                    {searchResults[0].artist}
                  </p>
                </div>
              </div>

              {searchResults?.slice(1).map((song, index) => (
                <div
                  key={song._id}
                  onClick={() => handleSongClick(song, index + 1)}
                  className="relative flex cursor-pointer items-center overflow-hidden rounded-md bg-zinc-800/50 p-2 transition-colors hover:bg-zinc-700/50"
                >
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className="h-16 w-16 flex-shrink-0 object-cover sm:h-20 sm:w-20"
                  />
                  <div className="flex-1 p-4">
                    <p className="truncate font-medium">{song.title}</p>
                    <p className="truncate text-sm text-zinc-400">
                      {song.artist}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : !query && !isLoading ? (
            <div className="mt-10 flex flex-col gap-4">
              <div
                className="relative mt-4 flex animate-pulse items-center overflow-hidden rounded-md bg-zinc-800/50 p-4"
                style={{ height: "200px" }}
              >
                <div className="h-40 w-40 flex-shrink-0 bg-zinc-800" />
                <div className="flex-1 space-y-2 pl-6">
                  <div className="h-6 w-3/4 rounded bg-zinc-800" />
                  <div className="h-4 w-1/2 rounded bg-zinc-800" />
                </div>
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="relative flex animate-pulse items-center overflow-hidden rounded-md bg-zinc-800/50 p-2"
                >
                  <div className="h-16 w-16 flex-shrink-0 bg-zinc-800" />
                  <div className="flex-1 space-y-2 p-4">
                    <div className="h-4 w-3/4 rounded bg-zinc-800" />
                    <div className="h-3 w-1/2 rounded bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            query &&
            !isLoading && (
              <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-2xl font-semibold text-white">
                  Song not found
                </h2>
                <p className="max-w-md text-neutral-400">
                  Looks like this track got lost in the shuffle. Search for
                  something else.
                </p>
              </div>
            )
          )}
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full"></div>
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-16 w-full"></div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default Search;
