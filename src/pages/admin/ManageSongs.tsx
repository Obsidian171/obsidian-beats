import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import { formatPlays } from "@/data/mockData";
import type { Song } from "@/data/mockData";

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const emptyForm = { title: "", artistId: "", coverURL: "", audioURL: "", releaseDate: "", plays: "0", weeklyPlays: "0", monthlyPlays: "0" };

const ManageSongs = () => {
  const { songs, artists, addSong, updateSong, deleteSong } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const handleSave = () => {
    if (!form.title.trim() || !form.artistId) return;
    const artist = artists.find((a) => a.id === form.artistId);

    if (editId) {
      updateSong(editId, {
        title: form.title,
        artistId: form.artistId,
        artistName: artist?.name || "",
        coverURL: form.coverURL,
        audioURL: form.audioURL,
        releaseDate: form.releaseDate || new Date().toISOString().split("T")[0],
        plays: parseInt(form.plays) || 0,
        weeklyPlays: parseInt(form.weeklyPlays) || 0,
        monthlyPlays: parseInt(form.monthlyPlays) || 0,
      });
    } else {
      const newSong: Song = {
        id: Date.now().toString(),
        title: form.title,
        artistId: form.artistId,
        artistName: artist?.name || "",
        coverURL: form.coverURL,
        audioURL: form.audioURL,
        releaseDate: form.releaseDate || new Date().toISOString().split("T")[0],
        plays: parseInt(form.plays) || 0,
        weeklyPlays: parseInt(form.weeklyPlays) || 0,
        monthlyPlays: parseInt(form.monthlyPlays) || 0,
      };
      addSong(newSong);
    }
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (song: Song) => {
    setForm({
      title: song.title,
      artistId: song.artistId,
      coverURL: song.coverURL,
      audioURL: song.audioURL,
      releaseDate: song.releaseDate,
      plays: song.plays.toString(),
      weeklyPlays: song.weeklyPlays.toString(),
      monthlyPlays: song.monthlyPlays.toString(),
    });
    setEditId(song.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Песни</h1>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
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
            <h3 className="text-sm font-semibold">{editId ? "Редактировать" : "Новая песня"}</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3">
            <input placeholder="Название песни" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
            <select value={form.artistId} onChange={(e) => setForm({ ...form, artistId: e.target.value })} className={inputClass}>
              <option value="">Выберите артиста</option>
              {artists.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <input placeholder="URL обложки" value={form.coverURL} onChange={(e) => setForm({ ...form, coverURL: e.target.value })} className={inputClass} />
            {form.coverURL && (
              <div className="flex items-center gap-3">
                <img src={form.coverURL} alt="Превью" className="w-16 h-16 rounded-xl object-cover bg-secondary" onError={(e) => (e.currentTarget.style.display = "none")} />
                <span className="text-xs text-muted-foreground">Превью обложки</span>
              </div>
            )}
            <input placeholder="Ссылка на аудио / стриминг" value={form.audioURL} onChange={(e) => setForm({ ...form, audioURL: e.target.value })} className={inputClass} />
            <input type="date" value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })} className={inputClass} />

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">Прослушивания</label>
                <input type="number" value={form.plays} onChange={(e) => setForm({ ...form, plays: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">За неделю</label>
                <input type="number" value={form.weeklyPlays} onChange={(e) => setForm({ ...form, weeklyPlays: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="text-[11px] text-muted-foreground mb-1 block">За месяц</label>
                <input type="number" value={form.monthlyPlays} onChange={(e) => setForm({ ...form, monthlyPlays: e.target.value })} className={inputClass} />
              </div>
            </div>

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
              <th className="w-20"></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    {song.coverURL ? (
                      <img src={song.coverURL} alt="" className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-primary/30">♪</span>
                      </div>
                    )}
                    <span className="font-medium truncate">{song.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{song.artistName}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{formatPlays(song.plays)}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{new Date(song.releaseDate).toLocaleDateString("ru-RU")}</td>
                <td className="px-4 py-3 flex gap-1">
                  <button onClick={() => handleEdit(song)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => deleteSong(song.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1">
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {songs.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">Нет песен</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageSongs;
