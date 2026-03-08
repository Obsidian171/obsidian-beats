import Layout from "@/components/Layout";
import SongCard from "@/components/SongCard";
import SectionHeader from "@/components/SectionHeader";
import { useStore } from "@/hooks/useStore";

const Releases = () => {
  const { songs } = useStore();
  const sorted = [...songs].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return (
    <Layout>
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <SectionHeader title="Релизы" subtitle="Все релизы Obsidian Records" />
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {sorted.map((song, i) => (
              <SongCard key={song.id} song={song} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-20 text-sm">Релизов пока нет</p>
        )}
      </section>
    </Layout>
  );
};

export default Releases;
