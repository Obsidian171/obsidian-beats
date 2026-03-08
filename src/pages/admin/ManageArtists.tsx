import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X } from "lucide-react";
import { artists as initialArtists, type Artist } from "@/data/mockData";

const ManageArtists = () => {
  const [artistList, setArtistList] = useState<Artist[]>(initialArtists);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editId) {
      setArtistList((prev) =>
        prev.map((a) => (a.id === editId ? { ...a, name: form.name, description: form.description } : a))
      );
    } else {
      const newArtist: Artist = {
        id: Date.now().toString(),
        name: form.name,
        description: form.description,
        photoURL: "",
        createdAt: new Date().toISOString(),
      };
      setArtistList((prev) => [...prev, newArtist]);
    }
    setForm({ name: "", description: "" });
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (artist: Artist) => {
    setForm({ name: artist.name, description: artist.description });
    setEditId(artist.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setArtistList((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Артисты</h1>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", description: "" }); }}
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
            <h3 className="text-sm font-semibold">{editId ? "Редактировать" : "Новый артист"}</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3">
            <input
              placeholder="Имя артиста"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            <textarea
              placeholder="Описание"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
            />
            <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-primary text-xs font-semibold text-primary-foreground">
              Сохранить
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-1">
        {artistList.map((artist) => (
          <div key={artist.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-colors">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-gradient">{artist.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{artist.name}</h4>
              <p className="text-[11px] text-muted-foreground truncate">{artist.description}</p>
            </div>
            <button onClick={() => handleEdit(artist)} className="text-muted-foreground hover:text-foreground transition-colors p-1.5">
              <Edit2 size={14} />
            </button>
            <button onClick={() => handleDelete(artist.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {artistList.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Нет артистов</p>
        )}
      </div>
    </div>
  );
};

export default ManageArtists;
