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
        <h1 className="font-display text-2xl font-bold tracking-wider">ПЕСНИ</h1>
        <button
          onClick={() => { setShowForm(true); setForm({ title: "", artistId: "", releaseDate: "" }); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-neon font-display text-xs font-semibold tracking-wider text-primary-foreground"
        >
          <Plus size={16} /> ДОБАВИТЬ
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-bold tracking-wider">НОВАЯ ПЕСНЯ</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <input
              placeholder="Название песни"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <select
              value={form.artistId}
              onChange={(e) => setForm({ ...form, artistId: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
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
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <div className="text-xs text-muted-foreground">
              🎵 Загрузка обложки и MP3 будет доступна после подключения Firebase Storage
            </div>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg gradient-neon font-display text-xs font-semibold tracking-wider text-primary-foreground"
            >
              СОХРАНИТЬ
            </button>
          </div>
        </motion.div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider">НАЗВАНИЕ</th>
              <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider">АРТИСТ</th>
              <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider hidden sm:table-cell">PLAYS</th>
              <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider hidden md:table-cell">ДАТА</th>
              <th className="w-12"></th>
            </tr>
          </thead>
          <tbody>
            {songList.map((song) => (
              <tr key={song.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 text-foreground font-medium">{song.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{song.artistName}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{formatPlays(song.plays)}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{new Date(song.releaseDate).toLocaleDateString("ru-RU")}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(song.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSongs;
