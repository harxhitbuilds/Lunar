import { Plus, Upload } from "lucide-react";

import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMusicStore } from "@/stores/useMusicStore";

const AddPlaylistDialog = () => {
  const [playlistDialogOpen, setPlaylistDialogOpen] = useState(false);
  const [files, setFiles] = useState({ image: null });
  const [newPlaylist, setNewPlaylist] = useState({
    title: "",
    artist: "",
  });
  const imageInputRef = useRef(null);
  const { addPlaylist, isLoading } = useMusicStore();

  const handleSubmit = async () => {
    if (!newPlaylist.title.trim()) {
      toast.error("Please enter a playlist title");
      return;
    }
    if (!newPlaylist.artist.trim()) {
      toast.error("Please enter an artist name");
      return;
    }

    try {
      const formData = new FormData();
      if (files.image) {
        formData.append("coverImage", files.image);
      }
      formData.append("title", newPlaylist.title.trim());
      formData.append("artist", newPlaylist.artist.trim());

      await addPlaylist(formData);

      setFiles({ image: null });
      setNewPlaylist({ title: "", artist: "" });
      setPlaylistDialogOpen(false);
    } catch (error) {
      console.error("Error uploading playlist:", error);
    }
  };

  return (
    <Dialog open={playlistDialogOpen} onOpenChange={setPlaylistDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 text-black hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Playlist
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-auto border-zinc-700 bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Add New Playlist</DialogTitle>
          <DialogDescription>
            Add a new playlist to your music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              setFiles((prev) => ({
                ...prev,
                image: e.target.files?.[0] || null,
              }))
            }
          />

          <div
            className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 p-6"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-2 inline-block rounded-full bg-zinc-800 p-3">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="mb-2 text-sm text-zinc-400">Upload Image</div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newPlaylist.title}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, title: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newPlaylist.artist}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, artist: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setPlaylistDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Playlist"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlaylistDialog;
