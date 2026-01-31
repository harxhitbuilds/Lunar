import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({ bgColor, icon: Icon, iconColor, label, value }) => {
  return (
    <Card className="border-zinc-700/50 bg-zinc-800/50 transition-colors hover:bg-zinc-800/80">
      <CardContent className="">
        <div className="flex items-center gap-4">
          <div className={`rounded-lg p-3 ${bgColor}`}>
            <Icon className={`size-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default StatsCard;
