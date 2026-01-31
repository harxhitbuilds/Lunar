import { Music } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import AddSongDialog from "./AddSongDialog";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
  return (
    <Card className="bg-zinc-950">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Music className="size-5 text-emerald-500" />
              Songs Library
            </CardTitle>
            <CardDescription>Manage your music tracks</CardDescription>
          </div>
          <AddSongDialog />
        </div>
      </CardHeader>
      <CardContent>
        <div className="max-h-[420px] overflow-auto">
          <SongsTable />
        </div>
      </CardContent>
    </Card>
  );
};
export default SongsTabContent;
