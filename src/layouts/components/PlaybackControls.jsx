import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayStore } from "@/stores/usePlayStore";

import useMobile from "../hooks/isMobile";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlaybackControls = () => {
  const { toggle, isPlaying, playNext, playPrevious, currentSong } =
    usePlayStore();

  const { isMobile } = useMobile(768);

  const [volume, setvolume] = useState(75);
  const [duration, setduration] = useState(0);
  const [currentTime, setcurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setcurrentTime(audio.currentTime);
    const updateDuration = () => setduration(audio.duration);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    const handleEnded = () => {
      usePlayStore.setState({ isPlaying: false });
    };
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]);

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time[0];
    }
  };

  return (
    <>
      {!isMobile && (
        <>
          <footer className="fixed bottom-0 left-0 z-50 h-20 w-full border-t border-zinc-900 bg-zinc-950 px-4 sm:h-24">
            <div className="mx-auto flex h-full max-w-[1800px] items-center justify-between">
              <div className="hidden w-[30%] min-w-[180px] items-center gap-4 sm:flex">
                {currentSong && (
                  <>
                    <img
                      src={currentSong?.coverImage}
                      alt={currentSong?.title}
                      className="h-14 w-14 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="cursor-pointer truncate font-medium hover:underline">
                        {currentSong?.title}
                      </div>
                      <div className="cursor-pointer truncate text-sm text-zinc-400 hover:underline">
                        {currentSong?.artist}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex max-w-full flex-1 flex-col items-center gap-2 sm:max-w-[45%]">
                <div className="flex items-center gap-4 sm:gap-6">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden text-zinc-400 hover:text-white sm:inline-flex"
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-zinc-400 hover:text-white"
                    onClick={playPrevious}
                    disabled={!currentSong}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full p-4 text-white hover:bg-white/80"
                    onClick={toggle}
                    disabled={!currentSong}
                    variant="outline"
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-zinc-400 hover:text-white"
                    onClick={playNext}
                    disabled={!currentSong}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hidden text-zinc-400 hover:text-white sm:inline-flex"
                  >
                    <Repeat className="h-4 w-4" />
                  </Button>
                </div>

                <div className="hidden w-full items-center gap-2 sm:flex">
                  <div className="text-xs text-zinc-400">
                    {formatTime(currentTime)}
                  </div>
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    className="w-full hover:cursor-grab active:cursor-grabbing"
                    onValueChange={handleSeek}
                  />
                  <div className="text-xs text-zinc-400">
                    {formatTime(duration)}
                  </div>
                </div>
              </div>
              <div className="hidden w-[30%] min-w-[180px] items-center justify-end gap-4 sm:flex">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                >
                  <Mic2 className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                >
                  <ListMusic className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                >
                  <Laptop2 className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-zinc-400 hover:text-white"
                  >
                    <Volume1 className="h-4 w-4" />
                  </Button>

                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    className="w-24 hover:cursor-grab active:cursor-grabbing"
                    onValueChange={(value) => {
                      setvolume(value[0]);
                      if (audioRef.current) {
                        audioRef.current.volume = value[0] / 100;
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </footer>
        </>
      )}
      {isMobile && (
        <>
          <footer className="flex h-24 flex-col items-center justify-center border-t border-zinc-800 bg-zinc-900 px-4">
            <div className="flex w-full items-center gap-2">
              <div className="text-xs text-zinc-400">
                {formatTime(currentTime)}
              </div>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="flex-1 hover:cursor-grab active:cursor-grabbing"
                onValueChange={handleSeek}
              />
              <div className="text-xs text-zinc-400">
                {formatTime(duration)}
              </div>
            </div>

            <div className="mt-4 flex w-full items-center justify-between px-2">
              <div className="flex items-center gap-4">
                {currentSong && (
                  <div className="flex flex-col">
                    <div className="max-w-[12rem] overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap text-white">
                      {currentSong.title}
                    </div>
                    <div className="max-w-[12rem] overflow-hidden text-xs text-ellipsis whitespace-nowrap text-zinc-400">
                      {currentSong.artist}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                  onClick={playPrevious}
                  disabled={!currentSong}
                >
                  <SkipBack className="h-5 w-5" />
                </Button>

                <Button
                  size="icon"
                  className="h-10 w-10 rounded-full bg-white text-black hover:bg-white/80"
                  onClick={toggle}
                  disabled={!currentSong}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                  onClick={playNext}
                  disabled={!currentSong}
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
};
export default PlaybackControls;
