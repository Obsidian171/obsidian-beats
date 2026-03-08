import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ChartList from "@/components/ChartList";
import MusicPlayer from "@/components/MusicPlayer";
import { songs, type Song } from "@/data/mockData";

const tabs = [
  { key: "weeklyPlays" as const, label: "Топ недели" },
  { key: "monthlyPlays" as const, label: "Топ месяца" },
  { key: "plays" as const, label: "За всё время" },
];

const Charts = () => {
  const [activeTab, setActiveTab] = useState<"plays" | "weeklyPlays" | "monthlyPlays">("weeklyPlays");
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <SectionHeader title="ЧАРТЫ" subtitle="Игровые музыкальные чарты Obsidian Records" />

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg font-display text-xs font-semibold tracking-wider transition-all ${
                activeTab === tab.key
                  ? "gradient-neon text-primary-foreground shadow-lg shadow-primary/20"
                  : "border border-border text-muted-foreground hover:text-foreground hover:border-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="max-w-2xl">
          <ChartList songs={songs} sortKey={activeTab} onPlay={setCurrentSong} />
        </div>
      </section>
      <MusicPlayer currentSong={currentSong} onClose={() => setCurrentSong(null)} />
    </Layout>
  );
};

export default Charts;
