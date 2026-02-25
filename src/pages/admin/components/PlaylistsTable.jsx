import { Music, Trash2 } from "lucide-react";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";

import MangePlaylistSongsDialog from "./MangePlaylistSongs";

const PlaylistsTable = () => {
  const { fetchPlaylists, playlists, deletePlaylist } = useMusicStore();
  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playlists?.map((playlist) => (
          <TableRow key={playlist._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={playlist.coverImage}
                alt={playlist.title}
                className="h-10 w-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{playlist.title}</TableCell>
            <TableCell>{playlist.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Music className="h-4 w-4" />
                {playlist.songs.length} songs
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <MangePlaylistSongsDialog playlist={playlist} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deletePlaylist(playlist._id)}
                  className="text-red-400 hover:bg-red-400/10 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default PlaylistsTable;
