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
        <h1 className="font-display text-2xl font-bold tracking-wider">АРТИСТЫ</h1>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", description: "" }); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-neon font-display text-xs font-semibold tracking-wider text-primary-foreground"
        >
          <Plus size={16} /> ДОБАВИТЬ
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-6 rounded-xl border border-border bg-card"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-sm font-bold tracking-wider">
              {editId ? "РЕДАКТИРОВАТЬ" : "НОВЫЙ АРТИСТ"}
            </h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>
          <div className="space-y-4">
            <input
              placeholder="Имя артиста"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <textarea
              placeholder="Описание"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <div className="text-xs text-muted-foreground">
              📸 Загрузка фото будет доступна после подключения Firebase Storage
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

      {/* List */}
      <div className="space-y-2">
        {artistList.map((artist) => (
          <div
            key={artist.id}
            className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-obsidian-light transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <span className="font-display text-sm font-bold text-primary">{artist.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-display text-sm font-semibold tracking-wider text-foreground">{artist.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{artist.description}</p>
            </div>
            <button onClick={() => handleEdit(artist)} className="text-muted-foreground hover:text-primary transition-colors">
              <Edit2 size={16} />
            </button>
            <button onClick={() => handleDelete(artist.id)} className="text-muted-foreground hover:text-destructive transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageArtists;
