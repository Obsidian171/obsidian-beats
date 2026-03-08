import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X, ExternalLink } from "lucide-react";
import { useStore } from "@/hooks/useStore";
import type { Artist } from "@/data/mockData";

const inputClass = "w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all";

const emptyForm = { name: "", description: "", photoURL: "", coverURL: "", streamURL: "" };

const ManageArtists = () => {
  const { artists, addArtist, updateArtist, deleteArtist } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editId) {
      updateArtist(editId, { ...form });
    } else {
      const newArtist: Artist = {
        id: Date.now().toString(),
        ...form,
        createdAt: new Date().toISOString(),
      };
      addArtist(newArtist);
    }
    setForm(emptyForm);
    setShowForm(false);
    setEditId(null);
  };

  const handleEdit = (artist: Artist) => {
    setForm({
      name: artist.name,
      description: artist.description,
      photoURL: artist.photoURL,
      coverURL: artist.coverURL,
      streamURL: artist.streamURL,
    });
    setEditId(artist.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Артисты</h1>
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
            <h3 className="text-sm font-semibold">{editId ? "Редактировать" : "Новый артист"}</h3>
            <button onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground">
              <X size={16} />
            </button>
          </div>
          <div className="space-y-3">
            <input placeholder="Имя артиста" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
            <textarea placeholder="Описание артиста" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
            <input placeholder="URL фото артиста" value={form.photoURL} onChange={(e) => setForm({ ...form, photoURL: e.target.value })} className={inputClass} />

            {form.photoURL && (
              <div className="flex items-center gap-3">
                <img src={form.photoURL} alt="Превью" className="w-16 h-16 rounded-xl object-cover bg-secondary" onError={(e) => (e.currentTarget.style.display = "none")} />
                <span className="text-xs text-muted-foreground">Превью фото</span>
              </div>
            )}

            <input placeholder="URL обложки" value={form.coverURL} onChange={(e) => setForm({ ...form, coverURL: e.target.value })} className={inputClass} />

            {form.coverURL && (
              <div className="flex items-center gap-3">
                <img src={form.coverURL} alt="Превью обложки" className="w-16 h-16 rounded-xl object-cover bg-secondary" onError={(e) => (e.currentTarget.style.display = "none")} />
                <span className="text-xs text-muted-foreground">Превью обложки</span>
              </div>
            )}

            <input placeholder="Ссылка на стриминг (Spotify, Apple Music и т.д.)" value={form.streamURL} onChange={(e) => setForm({ ...form, streamURL: e.target.value })} className={inputClass} />

            <button onClick={handleSave} className="px-5 py-2 rounded-xl bg-gradient-primary text-xs font-semibold text-primary-foreground">
              Сохранить
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-1">
        {artists.map((artist) => (
          <div key={artist.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-card transition-colors">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 overflow-hidden">
              {artist.photoURL ? (
                <img src={artist.photoURL} alt={artist.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm font-bold text-gradient">{artist.name.charAt(0)}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{artist.name}</h4>
              <p className="text-[11px] text-muted-foreground truncate">{artist.description}</p>
            </div>
            {artist.streamURL && (
              <a href={artist.streamURL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors p-1.5">
                <ExternalLink size={14} />
              </a>
            )}
            <button onClick={() => handleEdit(artist)} className="text-muted-foreground hover:text-foreground transition-colors p-1.5">
              <Edit2 size={14} />
            </button>
            <button onClick={() => deleteArtist(artist.id)} className="text-muted-foreground hover:text-destructive transition-colors p-1.5">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {artists.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">Нет артистов</p>
        )}
      </div>
    </div>
  );
};

export default ManageArtists;
