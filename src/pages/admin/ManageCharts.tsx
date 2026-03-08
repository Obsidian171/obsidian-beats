import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { formatPlays } from "@/data/mockData";
import type { ChartEntry } from "@/data/mockData";

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const chartLabels: Record<string, string> = {
  weekly: "Топ недели",
  monthly: "Топ месяца",
  alltime: "За всё время",
};

const emptyForm = { songId: "", chartType: "weekly" as const, position: "1", plays: "0" };

const ManageCharts = () => {
  const { chartEntries, songs, addChartEntry, updateChartEntry, deleteChartEntry } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [filterChart, setFilterChart] = useState<string>("weekly");

  const handleSave = () => {
    if (!form.songId) return;
    const data = {
      songId: form.songId,
      chartType: form.chartType as "weekly" | "monthly" | "alltime",
      position: parseInt(form.position) || 1,
      plays: parseInt(form.plays) || 0,
    };

    if (editId) {
      updateChartEntry(editId, data);
    } else {
      const entry: ChartEntry = { id: Date.now().toString(), ...data };
      addChartEntry(entry);
    }
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (entry: ChartEntry) => {
    setForm({
      songId: entry.songId,
      chartType: entry.chartType,
      position: entry.position.toString(),
      plays: entry.plays.toString(),
    });
    setEditId(entry.id);
    setShowForm(true);
  };

  const filtered = chartEntries
    .filter((e) => e.chartType === filterChart)
    .sort((a, b) => a.position - b.position);

  const getSongInfo = (songId: string) => songs.find((s) => s.id === songId);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Чарты</h1>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ ...emptyForm, chartType: filterChart as any }); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-primary text-xs font-semibold text-primary-foreground"
        >
          <Plus size={14} /> Добавить в чарт
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-5 rounded-2xl border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">{editId ? "Редактировать" : "Добавить в чарт"}</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3">
            <select value={form.songId} onChange={(e) => setForm({ ...form, songId: e.target.value })} className={inputClass}>
              <option value="">Выберите песню</option>
              {songs.map((s) => (
                <option key={s.id} value={s.id}>{s.title} — {s.artistName}</option>
              ))}
            </select>
            <select value={form.chartType} onChange={(e) => setForm({ ...form, chartType: e.target.value as any })} className={inputClass}>
              <option value="weekly">Топ недели</option>
              <option value="monthly">Топ месяца</option>
              <option value="alltime">За всё время</option>
            </select>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">Позиция</label>
                <input type="number" min="1" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">Прослушивания</label>
                <input type="number" value={form.plays} onChange={(e) => setForm({ ...form, plays: e.target.value })} className={inputClass} />
              </div>
            </div>
            <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-primary text-xs font-semibold text-primary-foreground">
              Сохранить
            </button>
          </div>
        </motion.div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 bg-card rounded-xl p-1 w-fit">
        {Object.entries(chartLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilterChart(key)}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              filterChart === key
                ? "bg-gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-1">
        {filtered.map((entry) => {
          const song = getSongInfo(entry.songId);
          return (
            <div key={entry.id} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-card transition-colors">
              <div className={`w-7 text-center text-sm font-bold tabular-nums ${entry.position <= 3 ? "text-primary" : "text-muted-foreground"}`}>
                {entry.position}
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
                {song?.coverURL ? (
                  <img src={song.coverURL} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm text-primary/20">♪</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium truncate">{song?.title || "Удалённая песня"}</h4>
                <p className="text-[11px] text-muted-foreground truncate">{song?.artistName}</p>
              </div>
              <div className="text-xs text-muted-foreground tabular-nums">{formatPlays(entry.plays)}</div>
              <button onClick={() => handleEdit(entry)} className="text-muted-foreground hover:text-foreground transition-colors p-1.5">
                <Edit2 size={14} />
              </button>
              <button onClick={() => deleteChartEntry(entry.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5">
                <Trash2 size={14} />
              </button>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Чарт пуст — добавьте песни</p>
        )}
      </div>
    </div>
  );
};

export default ManageCharts;
