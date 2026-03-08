import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Headphones } from "lucide-react";
import Layout from "@/components/Layout";
import { getArtistById, getSongsByArtist, formatPlays } from "@/data/mockData";

const ArtistDetail = () => {
  const { id } = useParams();

  const artist = getArtistById(id || "");
  const artistSongs = getSongsByArtist(id || "");

  if (!artist) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Артист не найден</p>
          <Link to="/artists" className="text-primary hover:underline mt-4 inline-block">
            Вернуться к артистам
          </Link>
        </div>
      </Layout>
    );
  }

  const totalPlays = artistSongs.reduce((sum, s) => sum + s.plays, 0);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <Link to="/artists" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} /> Все артисты
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="w-48 h-48 rounded-xl bg-obsidian-light border border-border neon-border flex items-center justify-center flex-shrink-0">
            <span className="font-display text-5xl font-bold text-primary">
              {artist.name.charAt(0)}
            </span>
          </div>

          <div className="flex-1">
            <h1 className="font-display text-3xl md:text-4xl font-black tracking-wider text-glow">
              {artist.name}
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl">
              {artist.description}
            </p>
            <div className="mt-6 flex gap-6">
              <div className="text-center">
                <div className="font-display text-xl font-bold text-foreground">{artistSongs.length}</div>
                <div className="text-xs text-muted-foreground">Треков</div>
              </div>
              <div className="text-center">
                <div className="font-display text-xl font-bold text-foreground">{formatPlays(totalPlays)}</div>
                <div className="text-xs text-muted-foreground">Прослушиваний</div>
              </div>
            </div>
          </div>
        </motion.div>

        {artistSongs.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display text-xl font-bold tracking-wider text-foreground mb-6">ДИСКОГРАФИЯ</h2>
            <div className="space-y-2">
              {artistSongs.map((song, i) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-obsidian-light transition-all neon-border-hover"
                >
                  <div className="w-14 h-14 rounded-md bg-obsidian-light flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xl text-primary/30">♪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-sm font-semibold tracking-wider text-foreground truncate">
                      {song.title}
                    </h4>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(song.releaseDate).toLocaleDateString("ru-RU")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Headphones size={12} />
                        {formatPlays(song.plays)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ArtistDetail;
