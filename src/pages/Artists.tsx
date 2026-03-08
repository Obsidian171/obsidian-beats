import Layout from "@/components/Layout";
import ArtistCard from "@/components/ArtistCard";
import SectionHeader from "@/components/SectionHeader";
import { artists } from "@/data/mockData";

const Artists = () => (
  <Layout>
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <SectionHeader title="Артисты" subtitle="Все артисты лейбла Obsidian Records" />
      {artists.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-20 text-sm">Артистов пока нет</p>
      )}
    </section>
  </Layout>
);

export default Artists;
