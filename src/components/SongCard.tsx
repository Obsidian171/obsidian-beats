import { motion } from "framer-motion";
import { Play, Calendar } from "lucide-react";
import type { Song } from "@/data/mockData";
import { formatPlays } from "@/data/mockData";

interface SongCardProps {
  song: Song;
  index?: number;
  onPlay?: (song: Song) => void;
}

const SongCard = ({ song, index = 0, onPlay }: SongCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 neon-border-hover hover:-translate-y-1"
    >
      {/* Cover */}
      <div className="aspect-square bg-obsidian-light relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gradient-obsidian">
          <span className="font-display text-3xl font-bold text-primary/30">♪</span>
        </div>
        {/* Play overlay */}
        <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onPlay?.(song)}
            className="w-14 h-14 rounded-full gradient-neon flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-110 transition-transform"
          >
            <Play size={24} className="text-primary-foreground ml-1" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground truncate">
          {song.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{song.artistName}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(song.releaseDate).toLocaleDateString("ru-RU")}</span>
          </div>
          <span>{formatPlays(song.plays)} plays</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SongCard;
