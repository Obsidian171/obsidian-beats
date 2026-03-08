export interface Artist {
  id: string;
  name: string;
  photoURL: string;
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

export const artists: Artist[] = [];

export const songs: Song[] = [
  {
    id: "1",
    title: "Digital Abyss",
    artistId: "1",
    artistName: "VOID RUNNER",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-03-01",
    plays: 284500,
    weeklyPlays: 12400,
    monthlyPlays: 45200,
  },
  {
    id: "2",
    title: "Neon Dreams",
    artistId: "2",
    artistName: "CRYSTAL ECHO",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-02-15",
    plays: 198300,
    weeklyPlays: 15600,
    monthlyPlays: 52100,
  },
  {
    id: "3",
    title: "Cyber Pulse",
    artistId: "3",
    artistName: "NEON SHADE",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-02-28",
    plays: 356700,
    weeklyPlays: 18900,
    monthlyPlays: 67800,
  },
  {
    id: "4",
    title: "Ghost Protocol",
    artistId: "1",
    artistName: "VOID RUNNER",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-01-20",
    plays: 145200,
    weeklyPlays: 8700,
    monthlyPlays: 32100,
  },
  {
    id: "5",
    title: "Pixel Warfare",
    artistId: "4",
    artistName: "PIXEL STORM",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-03-05",
    plays: 267800,
    weeklyPlays: 21300,
    monthlyPlays: 58400,
  },
  {
    id: "6",
    title: "Shadow Realm",
    artistId: "5",
    artistName: "DARK HORIZON",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-01-10",
    plays: 412300,
    weeklyPlays: 9800,
    monthlyPlays: 38900,
  },
  {
    id: "7",
    title: "Glitch Symphony",
    artistId: "6",
    artistName: "AURORA GLITCH",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-02-01",
    plays: 189400,
    weeklyPlays: 11200,
    monthlyPlays: 41500,
  },
  {
    id: "8",
    title: "Binary Sunset",
    artistId: "2",
    artistName: "CRYSTAL ECHO",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-03-07",
    plays: 95600,
    weeklyPlays: 22100,
    monthlyPlays: 35700,
  },
  {
    id: "9",
    title: "Overdrive",
    artistId: "3",
    artistName: "NEON SHADE",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-02-20",
    plays: 321400,
    weeklyPlays: 16700,
    monthlyPlays: 61200,
  },
  {
    id: "10",
    title: "Electric Void",
    artistId: "5",
    artistName: "DARK HORIZON",
    coverURL: "",
    audioURL: "",
    releaseDate: "2025-01-30",
    plays: 278900,
    weeklyPlays: 13500,
    monthlyPlays: 49800,
  },
];

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
