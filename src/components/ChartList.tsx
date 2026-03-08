import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Song } from "@/data/mockData";
import { formatPlays } from "@/data/mockData";

interface ChartListProps {
  songs: Song[];
  sortKey: "plays" | "weeklyPlays" | "monthlyPlays";
  onPlay?: (song: Song) => void;
}

const ChartList = ({ songs, sortKey, onPlay }: ChartListProps) => {
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
          {/* Position */}
          <div className="w-8 text-center font-display text-lg font-bold text-primary">
            {i + 1}
          </div>

          {/* Cover */}
          <div className="w-12 h-12 rounded-md bg-obsidian-light flex items-center justify-center flex-shrink-0 overflow-hidden">
            <span className="font-display text-lg text-primary/30">♪</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-sm font-semibold tracking-wider text-foreground truncate">
              {song.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">{song.artistName}</p>
          </div>

          {/* Plays */}
          <div className="text-sm text-muted-foreground font-medium whitespace-nowrap">
            {formatPlays(song[sortKey])}
          </div>

          {/* Play button */}
          <button
            onClick={() => onPlay?.(song)}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:border-primary hover:text-primary"
          >
            <Play size={14} className="ml-0.5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default ChartList;
