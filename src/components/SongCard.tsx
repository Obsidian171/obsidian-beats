import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { Song } from "@/data/mockData";
import { formatPlays } from "@/data/mockData";

interface SongCardProps {
  song: Song;
  index?: number;
}

const SongCard = ({ song, index = 0 }: SongCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className="group rounded-2xl bg-card overflow-hidden hover-lift card-shine"
  >
    <div className="aspect-square bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-subtle">
        <span className="text-4xl font-bold text-primary/20">♪</span>
      </div>
    </div>
    <div className="p-3.5">
      <h3 className="text-sm font-semibold text-foreground truncate">
        {song.title}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5 truncate">{song.artistName}</p>
      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-1">
          <Calendar size={11} />
          <span>{new Date(song.releaseDate).toLocaleDateString("ru-RU")}</span>
        </div>
        <span>{formatPlays(song.plays)}</span>
      </div>
    </div>
  </motion.div>
);

export default SongCard;
