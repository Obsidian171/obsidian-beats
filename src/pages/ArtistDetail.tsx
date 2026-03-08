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
          <Link to="/artists" className="text-primary hover:underline mt-4 inline-block text-sm">
            Вернуться к артистам
          </Link>
        </div>
      </Layout>
    );
  }

  const totalPlays = artistSongs.reduce((sum, s) => sum + s.plays, 0);

  return (
    <Layout>
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <Link to="/artists" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={14} /> Все артисты
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="w-44 h-44 rounded-2xl bg-card border border-border flex items-center justify-center flex-shrink-0">
            <span className="text-5xl font-bold text-gradient">{artist.name.charAt(0)}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{artist.name}</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">{artist.description}</p>
            <div className="mt-5 flex gap-8">
              <div>
                <div className="text-xl font-bold">{artistSongs.length}</div>
                <div className="text-xs text-muted-foreground">Треков</div>
              </div>
              <div>
                <div className="text-xl font-bold">{formatPlays(totalPlays)}</div>
                <div className="text-xs text-muted-foreground">Прослушиваний</div>
              </div>
            </div>
          </div>
        </motion.div>

        {artistSongs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold tracking-tight mb-4">Дискография</h2>
            <div className="rounded-2xl bg-card/50 py-1">
              {artistSongs.map((song, i) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-card rounded-xl transition-colors"
                >
                  <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <span className="text-lg text-primary/20">♪</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{song.title}</h4>
                    <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(song.releaseDate).toLocaleDateString("ru-RU")}
                      </span>
                      <span className="flex items-center gap-1">
                        <Headphones size={10} />
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
