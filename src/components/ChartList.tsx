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
    <div className="space-y-2">
      {sorted.map((song, i) => (
        <motion.div
          key={song.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="group flex items-center gap-4 p-3 rounded-lg border border-border bg-card hover:bg-obsidian-light transition-all duration-200 neon-border-hover"
        >
          <div className="w-8 text-center font-display text-lg font-bold text-primary">
            {i + 1}
          </div>
          <div className="w-12 h-12 rounded-md bg-obsidian-light flex items-center justify-center flex-shrink-0">
            <span className="font-display text-lg text-primary/30">♪</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-sm font-semibold tracking-wider text-foreground truncate">
              {song.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">{song.artistName}</p>
          </div>
          <div className="text-sm text-muted-foreground font-medium whitespace-nowrap">
            {formatPlays(song[sortKey])}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChartList;
