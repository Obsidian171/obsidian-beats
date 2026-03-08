import { motion } from "framer-motion";
import type { Song } from "@/data/mockData";
import { formatPlays } from "@/data/mockData";

interface ChartListProps {
  songs: Song[];
  sortKey: "plays" | "weeklyPlays" | "monthlyPlays";
}

const ChartList = ({ songs, sortKey }: ChartListProps) => {
  const sorted = [...songs].sort((a, b) => b[sortKey] - a[sortKey]);

  return (
    <div className="space-y-1">
      {sorted.map((song, i) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.04 }}
          className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-card transition-colors duration-200"
        >
          <div className={`w-7 text-center text-sm font-bold tabular-nums ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>
            {i + 1}
          </div>
          <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <span className="text-lg text-primary/20">♪</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-foreground truncate">
              {song.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">{song.artistName}</p>
          </div>
          <div className="text-xs text-muted-foreground font-medium tabular-nums whitespace-nowrap">
            {formatPlays(song[sortKey])}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChartList;
