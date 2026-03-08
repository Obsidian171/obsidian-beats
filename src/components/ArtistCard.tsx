import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Music } from "lucide-react";
import type { Artist } from "@/data/mockData";
import { getLatestSongByArtist } from "@/data/mockData";

interface ArtistCardProps {
  artist: Artist;
  index?: number;
}

const ArtistCard = ({ artist, index = 0 }: ArtistCardProps) => {
  const latestSong = getLatestSongByArtist(artist.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        to={`/artists/${artist.id}`}
        className="group block rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 neon-border-hover hover:-translate-y-1"
      >
        <div className="aspect-square bg-obsidian-light relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center">
              <span className="font-display text-2xl font-bold text-primary">
                {artist.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        </div>
        <div className="p-4">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground group-hover:text-primary transition-colors">
            {artist.name}
          </h3>
          {latestSong && (
            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Music size={12} className="text-primary" />
              <span className="truncate">{latestSong.title}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtistCard;
