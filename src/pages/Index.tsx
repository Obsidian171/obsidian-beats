import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, Disc3 } from "lucide-react";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ArtistCard from "@/components/ArtistCard";
import SongCard from "@/components/SongCard";
import ChartList from "@/components/ChartList";
import { artists, songs } from "@/data/mockData";

const Index = () => {
  const latestReleases = [...songs]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 4);

  const topArtists = artists.slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9]">
              <span className="text-foreground">Obsidian</span>
              <br />
              <span className="text-gradient">Records</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-md mx-auto font-light leading-relaxed">
              Музыкальный лейбл нового поколения
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/releases"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Слушать
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/artists"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-border text-sm font-semibold text-foreground hover:bg-card transition-colors"
              >
                Артисты
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24 grid grid-cols-3 gap-8 max-w-sm mx-auto"
          >
            {[
              { icon: Users, label: "Артистов", value: artists.length },
              { icon: Disc3, label: "Треков", value: songs.length },
              { icon: TrendingUp, label: "Plays", value: "0" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon size={18} className="text-primary mx-auto mb-2 opacity-60" />
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {latestReleases.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 py-16">
          <SectionHeader title="Новые релизы" subtitle="Свежие треки от наших артистов">
            <Link to="/releases" className="text-xs text-primary hover:underline flex items-center gap-1">
              Все релизы <ArrowRight size={12} />
            </Link>
          </SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {latestReleases.map((song, i) => (
              <SongCard key={song.id} song={song} index={i} />
            ))}
          </div>
        </section>
      )}

      {songs.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 py-16">
          <SectionHeader title="Топ чарты" subtitle="Самые популярные треки">
            <Link to="/charts" className="text-xs text-primary hover:underline flex items-center gap-1">
              Все чарты <ArrowRight size={12} />
            </Link>
          </SectionHeader>
          <div className="max-w-2xl rounded-2xl bg-card/50 py-2">
            <ChartList songs={songs.slice(0, 5)} sortKey="weeklyPlays" />
          </div>
        </section>
      )}

      {topArtists.length > 0 && (
        <section className="container mx-auto px-4 lg:px-8 py-16">
          <SectionHeader title="Артисты" subtitle="Наши таланты">
            <Link to="/artists" className="text-xs text-primary hover:underline flex items-center gap-1">
              Все артисты <ArrowRight size={12} />
            </Link>
          </SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {topArtists.map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} index={i} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
