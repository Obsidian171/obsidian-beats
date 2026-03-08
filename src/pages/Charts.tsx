import { useState } from "react";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import ChartList from "@/components/ChartList";
import { songs } from "@/data/mockData";

const tabs = [
  { key: "weeklyPlays" as const, label: "Неделя" },
  { key: "monthlyPlays" as const, label: "Месяц" },
  { key: "plays" as const, label: "Всё время" },
];

const Charts = () => {
  const [activeTab, setActiveTab] = useState<"plays" | "weeklyPlays" | "monthlyPlays">("weeklyPlays");

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

        {songs.length > 0 ? (
          <div className="max-w-2xl rounded-2xl bg-card/50 py-2">
            <ChartList songs={songs} sortKey={activeTab} />
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-20 text-sm">Чарты пока пусты</p>
        )}
      </section>
    </Layout>
  );
};

export default Charts;
