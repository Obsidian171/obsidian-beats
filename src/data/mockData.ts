export interface Artist {
  id: string;
  name: string;
  photoURL: string;
  coverURL: string;
  streamURL: string;
  description: string;
  createdAt: string;
}

export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverURL: string;
  audioURL: string;
  releaseDate: string;
  plays: number;
  weeklyPlays: number;
  monthlyPlays: number;
}

export interface ChartEntry {
  id: string;
  songId: string;
  chartType: "weekly" | "monthly" | "alltime";
  position: number;
  plays: number;
}

export const artists: Artist[] = [];
export const songs: Song[] = [];
export const chartEntries: ChartEntry[] = [];

export const getArtistById = (id: string) => artists.find((a) => a.id === id);
export const getSongsByArtist = (artistId: string) => songs.filter((s) => s.artistId === artistId);
export const getLatestSongByArtist = (artistId: string) => {
  const artistSongs = getSongsByArtist(artistId);
  return artistSongs.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())[0];
};

export const formatPlays = (n: number): string => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
};
