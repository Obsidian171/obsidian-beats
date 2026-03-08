import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Disc3 } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ArtistCard from "@/components/ArtistCard";
import SongCard from "@/components/SongCard";
import ChartList from "@/components/ChartList";
import MusicPlayer from "@/components/MusicPlayer";
import { artists, songs, type Song } from "@/data/mockData";

const Index = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const latestReleases = [...songs]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 4);

  const topArtists = artists.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-magenta/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-xs text-muted-foreground mb-8">
              <Disc3 size={14} className="text-primary animate-spin" style={{ animationDuration: "3s" }} />
              GAMING MUSIC LABEL
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-wider text-glow leading-tight">
              OBSIDIAN
              <br />
              <span className="text-primary">RECORDS</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-light">
              Игровой музыкальный лейбл нового поколения
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/releases"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg gradient-neon font-display text-sm font-semibold tracking-wider text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all"
              >
                СЛУШАТЬ
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/artists"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-border font-display text-sm font-semibold tracking-wider text-foreground hover:border-primary hover:text-primary transition-all"
              >
                АРТИСТЫ
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto"
          >
            {[
              { icon: Users, label: "Артистов", value: artists.length },
              { icon: Disc3, label: "Треков", value: songs.length },
              { icon: TrendingUp, label: "Plays", value: "2.5M" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={20} className="text-primary mx-auto mb-2" />
                <div className="font-display text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New Releases */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="НОВЫЕ РЕЛИЗЫ" subtitle="Свежие треки от наших артистов">
          <Link to="/releases" className="text-sm text-primary hover:underline flex items-center gap-1">
            Все релизы <ArrowRight size={14} />
          </Link>
        </SectionHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {latestReleases.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} onPlay={setCurrentSong} />
          ))}
        </div>
      </section>

      {/* Top Charts */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="ТОП ЧАРТЫ" subtitle="Самые популярные треки недели">
          <Link to="/charts" className="text-sm text-primary hover:underline flex items-center gap-1">
            Все чарты <ArrowRight size={14} />
          </Link>
        </SectionHeader>
        <div className="max-w-2xl">
          <ChartList songs={songs.slice(0, 5)} sortKey="weeklyPlays" onPlay={setCurrentSong} />
        </div>
      </section>

      {/* Popular Artists */}
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="ПОПУЛЯРНЫЕ АРТИСТЫ" subtitle="Звёзды Obsidian Records">
          <Link to="/artists" className="text-sm text-primary hover:underline flex items-center gap-1">
            Все артисты <ArrowRight size={14} />
          </Link>
        </SectionHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {topArtists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </section>

      <MusicPlayer currentSong={currentSong} onClose={() => setCurrentSong(null)} />
    </Layout>
  );
};

export default Index;
