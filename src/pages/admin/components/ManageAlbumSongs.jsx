import { Minus, Plus, Settings } from "lucide-react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";

const ManageAlbumSongsDialog = ({ album }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { songs, addSongToAlbum, removeSongFromAlbum, isLoading, fetchAlbums } =
    useMusicStore();

  const albumSongIds =
    album.songs?.map((s) => (typeof s === "string" ? s : s._id)) || [];

  const handleAdd = async (songId) => {
    await addSongToAlbum(album._id, songId);
    fetchAlbums();
  };

  const handleRemove = async (songId) => {
    await removeSongFromAlbum(album._id, songId);
    fetchAlbums();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-700 bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
        >
          <Settings className="mr-2 size-4" />
          Manage Songs
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-h-[80vh] flex-col border-zinc-700 bg-zinc-900 text-zinc-100">
        <DialogHeader>
          <DialogTitle>Manage Songs for {album.title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[400px]">
          <div className="space-y-3 pr-4"></div>
          <div className="space-y-3 pr-4">
            {songs.map((song) => {
              const isAdded = albumSongIds.includes(song._id);
              return (
                <div
                  key={song._id}
                  className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-800/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className="size-10 rounded object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">{song.title}</p>
                      <p className="text-xs text-zinc-400">{song.artist}</p>
                    </div>
                  </div>
                  <Button
                    variant={isAdded ? "destructive" : "secondary"}
                    size="sm"
                    onClick={() =>
                      isAdded ? handleRemove(song._id) : handleAdd(song._id)
                    }
                    disabled={isLoading}
                    className={
                      !isAdded
                        ? "bg-emerald-600 text-white hover:bg-emerald-700"
                        : ""
                    }
                  >
                    {isAdded ? (
                      <Minus className="size-4" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ManageAlbumSongsDialog;
