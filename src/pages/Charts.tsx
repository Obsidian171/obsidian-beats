import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { useStore } from "@/hooks/useStore";
import { formatPlays } from "@/data/mockData";

const tabs = [
  { key: "weekly" as const, label: "Неделя" },
  { key: "monthly" as const, label: "Месяц" },
  { key: "alltime" as const, label: "Всё время" },
];

const Charts = () => {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "alltime">("weekly");
  const { chartEntries, songs } = useStore();

  const filtered = chartEntries
    .filter((e) => e.chartType === activeTab)
    .sort((a, b) => a.position - b.position);

  return (
    <Layout>
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <SectionHeader title="Чарты" subtitle="Музыкальные чарты Obsidian Records" />

        <div className="flex gap-1 mb-6 bg-card rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-gradient-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="max-w-2xl rounded-2xl bg-card/50 py-2">
            {filtered.map((entry) => {
              const song = songs.find((s) => s.id === entry.songId);
              if (!song) return null;
              return (
                <div key={entry.id} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-card transition-colors">
                  <div className={`w-7 text-center text-sm font-bold tabular-nums ${entry.position <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                    {entry.position}
                  </div>
                  <div className="w-11 h-11 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {song.coverURL ? (
                      <img src={song.coverURL} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-lg text-primary/20">♪</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground truncate">{song.title}</h4>
                    <p className="text-xs text-muted-foreground truncate">{song.artistName}</p>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium tabular-nums">{formatPlays(entry.plays)}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-20 text-sm">Чарты пока пусты</p>
        )}
      </section>
    </Layout>
  );
};

export default Charts;
