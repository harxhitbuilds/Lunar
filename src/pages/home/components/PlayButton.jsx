import { Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePlayStore } from "@/stores/usePlayStore";

const PlayButton = ({ song }) => {
  const { currentSong, isPlaying, setCurrentSong, toggle } = usePlayStore();
  const isCurrentSong = currentSong?._id === song._id;
  const handlePlay = () => {
    if (isCurrentSong) {
      toggle();
    } else {
      setCurrentSong(song);
    }
  };
  return (
    <Button
      onClick={handlePlay}
      variant="outline"
      className="right-2 bottom-3 cursor-pointer bg-transparent text-white"
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-3" />
      ) : (
        <Play className="size-3" />
      )}
    </Button>
  );
};
export default PlayButton;
