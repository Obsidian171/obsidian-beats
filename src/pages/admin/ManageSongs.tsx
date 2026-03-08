import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { songs as initialSongs, artists, formatPlays, type Song } from "@/data/mockData";

const ManageSongs = () => {
  const [songList, setSongList] = useState<Song[]>(initialSongs);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", artistId: "", releaseDate: "" });

  const handleSave = () => {
    if (!form.title.trim() || !form.artistId) return;
    const artist = artists.find((a) => a.id === form.artistId);
    const newSong: Song = {
      id: Date.now().toString(),
      title: form.title,
      artistId: form.artistId,
      artistName: artist?.name || "",
      coverURL: "",
      audioURL: "",
      releaseDate: form.releaseDate || new Date().toISOString().split("T")[0],
      plays: 0,
      weeklyPlays: 0,
      monthlyPlays: 0,
    };
    setSongList((prev) => [...prev, newSong]);
    setForm({ title: "", artistId: "", releaseDate: "" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setSongList((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Песни</h1>
        <button
          onClick={() => { setShowForm(true); setForm({ title: "", artistId: "", releaseDate: "" }); }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-primary text-xs font-semibold text-primary-foreground"
        >
          <Plus size={14} /> Добавить
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-5 rounded-2xl border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Новая песня</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3">
            <input
              placeholder="Название песни"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <select
              value={form.artistId}
              onChange={(e) => setForm({ ...form, artistId: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            >
              <option value="">Выберите артиста</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <input
              type="date"
              value={form.releaseDate}
              onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-primary text-xs font-semibold text-primary-foreground">
              Сохранить
            </button>
          </div>
        </motion.div>
      )}

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider">Название</th>
              <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider">Артист</th>
              <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Plays</th>
              <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider hidden md:table-cell">Дата</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody>
            {songList.map((song) => (
              <tr key={song.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3 font-medium">{song.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{song.artistName}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{formatPlays(song.plays)}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{new Date(song.releaseDate).toLocaleDateString("ru-RU")}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(song.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {songList.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">Нет песен</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSongs;
