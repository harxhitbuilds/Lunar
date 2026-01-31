import { Plus, Upload } from "lucide-react";

import { useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMusicStore } from "@/stores/useMusicStore";

const AddSongDialog = () => {
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [files, setFiles] = useState({ audio: null, image: null });
  const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    duration: "",
    album: "none",
    playlists: [],
  });
  const { albums, fetchPlaylists, playlists } = useMusicStore();

  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const { uploadSong, isLoading } = useMusicStore();

  useEffect(() => {
    if (songDialogOpen) fetchPlaylists();
  }, [songDialogOpen, fetchPlaylists]);

  const handleSubmit = async () => {
    // Validation
    if (!files.audio) {
      toast.error("Please select an audio file");
      return;
    }
    if (!newSong.title.trim()) {
      toast.error("Please enter a song title");
      return;
    }
    if (!newSong.artist.trim()) {
      toast.error("Please enter an artist name");
      return;
    }
    if (!newSong.duration || parseInt(newSong.duration) <= 0) {
      toast.error("Please enter a valid duration");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("audioFile", files.audio);
      if (files.image) {
        formData.append("coverImage", files.image);
      }
      formData.append("title", newSong.title.trim());
      formData.append("artist", newSong.artist.trim());
      formData.append("duration", newSong.duration);
      if (newSong.album !== "none") {
        formData.append("albumId", newSong.album);
      }

      newSong.playlists.forEach((playlistId) =>
        formData.append("playlistIds", playlistId),
      );

      await uploadSong(formData);

      // Reset form on success
      setFiles({ audio: null, image: null });
      setNewSong({
        title: "",
        artist: "",
        duration: "",
        album: "none",
        playlists: [],
      });
      setSongDialogOpen(false);
    } catch (error) {
      console.error("Error uploading song:", error);
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 text-black hover:bg-emerald-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-auto border-zinc-700 bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle>
          <DialogDescription>
            Add a new song to your music library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={(e) =>
              setFiles((prev) => ({
                ...prev,
                audio: e.target.files?.[0] || null,
              }))
            }
          />

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

          {/* image upload area */}
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

          {/* Audio upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
                className="w-full"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20)
                  : "Choose Audio File"}
              </Button>
            </div>
          </div>

          {/* other fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newSong.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (seconds)</label>
            <Input
              type="number"
              min="0"
              value={newSong.duration}
              onChange={(e) =>
                setNewSong({ ...newSong, duration: e.target.value || "0" })
              }
              className="border-zinc-700 bg-zinc-800"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>
            <Select
              value={newSong.album}
              onValueChange={(value) =>
                setNewSong({ ...newSong, album: value })
              }
            >
              <SelectTrigger className="border-zinc-700 bg-zinc-800">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="border-zinc-700 bg-zinc-800">
                <SelectItem value="none">No Album (Single)</SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Add to Playlists (Optional)
            </label>
            <div className="flex max-h-40 flex-col gap-2 overflow-y-auto rounded border border-zinc-700 bg-zinc-800 p-2">
              {playlists.map((playlist) => (
                <label key={playlist._id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={playlist._id}
                    checked={newSong.playlists.includes(playlist._id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setNewSong((prev) => ({
                        ...prev,
                        playlists: checked
                          ? [...prev.playlists, playlist._id]
                          : prev.playlists.filter((id) => id !== playlist._id),
                      }));
                    }}
                  />
                  <span>{playlist.title}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddSongDialog;
