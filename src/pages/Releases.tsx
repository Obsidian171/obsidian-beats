import { useState } from "react";
import Layout from "@/components/Layout";
import SongCard from "@/components/SongCard";
import SectionHeader from "@/components/SectionHeader";
import MusicPlayer from "@/components/MusicPlayer";
import { songs, type Song } from "@/data/mockData";

const Releases = () => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const sorted = [...songs].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="РЕЛИЗЫ" subtitle="Все релизы Obsidian Records" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {sorted.map((song, i) => (
            <SongCard key={song.id} song={song} index={i} onPlay={setCurrentSong} />
          ))}
        </div>
      </section>
      <MusicPlayer currentSong={currentSong} onClose={() => setCurrentSong(null)} />
    </Layout>
  );
};

export default Releases;
