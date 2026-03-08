import { createContext, useContext, useState, ReactNode } from "react";
import type { Artist, Song, ChartEntry } from "@/data/mockData";

interface StoreContextType {
  artists: Artist[];
  songs: Song[];
  chartEntries: ChartEntry[];
  addArtist: (artist: Artist) => void;
  updateArtist: (id: string, data: Partial<Artist>) => void;
  deleteArtist: (id: string) => void;
  addSong: (song: Song) => void;
  updateSong: (id: string, data: Partial<Song>) => void;
  deleteSong: (id: string) => void;
  addChartEntry: (entry: ChartEntry) => void;
  updateChartEntry: (id: string, data: Partial<ChartEntry>) => void;
  deleteChartEntry: (id: string) => void;
}

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [chartEntries, setChartEntries] = useState<ChartEntry[]>([]);

  const addArtist = (artist: Artist) => setArtists((p) => [...p, artist]);
  const updateArtist = (id: string, data: Partial<Artist>) =>
    setArtists((p) => p.map((a) => (a.id === id ? { ...a, ...data } : a)));
  const deleteArtist = (id: string) => setArtists((p) => p.filter((a) => a.id !== id));

  const addSong = (song: Song) => setSongs((p) => [...p, song]);
  const updateSong = (id: string, data: Partial<Song>) =>
    setSongs((p) => p.map((s) => (s.id === id ? { ...s, ...data } : s)));
  const deleteSong = (id: string) => setSongs((p) => p.filter((s) => s.id !== id));

  const addChartEntry = (entry: ChartEntry) => setChartEntries((p) => [...p, entry]);
  const updateChartEntry = (id: string, data: Partial<ChartEntry>) =>
    setChartEntries((p) => p.map((e) => (e.id === id ? { ...e, ...data } : e)));
  const deleteChartEntry = (id: string) => setChartEntries((p) => p.filter((e) => e.id !== id));

  return (
    <StoreContext.Provider
      value={{
        artists, songs, chartEntries,
        addArtist, updateArtist, deleteArtist,
        addSong, updateSong, deleteSong,
        addChartEntry, updateChartEntry, deleteChartEntry,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
