import { ListMusic } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddPlaylistDialog from "./AddPlaylistDialog";
import PlaylistsTable from "./PlaylistsTable";

const PlaylistsTabContent = () => {
  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ListMusic className="h-5 w-5 text-emerald-500" />
              Playlists Library
            </CardTitle>
            <CardDescription>Manage your playlist collection</CardDescription>
          </div>
          <AddPlaylistDialog />
        </div>
      </CardHeader>

      <CardContent>
        <PlaylistsTable />
      </CardContent>
    </Card>
  );
};
export default PlaylistsTabContent;
