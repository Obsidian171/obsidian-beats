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
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/artists/${artist.id}`}
        className="group block rounded-2xl bg-card overflow-hidden hover-lift card-shine"
      >
        <div className="aspect-square bg-secondary relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-subtle">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <span className="text-3xl font-bold text-gradient">
                {artist.name.charAt(0)}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>
        <div className="p-3.5">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {artist.name}
          </h3>
          {latestSong && (
            <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
              <Music size={11} className="text-primary flex-shrink-0" />
              <span className="truncate">{latestSong.title}</span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ArtistCard;
