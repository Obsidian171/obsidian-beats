import Layout from "@/components/Layout";
import ArtistCard from "@/components/ArtistCard";
import SectionHeader from "@/components/SectionHeader";
import { artists } from "@/data/mockData";

const Artists = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <SectionHeader title="АРТИСТЫ" subtitle="Все артисты лейбла Obsidian Records" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {artists.map((artist, i) => (
          <ArtistCard key={artist.id} artist={artist} index={i} />
        ))}
      </div>
    </section>
  </Layout>
);

export default Artists;
