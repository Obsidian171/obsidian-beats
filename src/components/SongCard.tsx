import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { Song } from "@/data/mockData";
import { formatPlays } from "@/data/mockData";

interface SongCardProps {
  song: Song;
  index?: number;
}

const SongCard = ({ song, index = 0 }: SongCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 neon-border-hover hover:-translate-y-1"
    >
      <div className="aspect-square bg-obsidian-light relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center gradient-obsidian">
          <span className="font-display text-3xl font-bold text-primary/30">♪</span>
        </div>
      </div>
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
