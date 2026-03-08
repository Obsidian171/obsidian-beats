import { motion } from "framer-motion";
import { Users, Music, Headphones, Trophy } from "lucide-react";
import { artists, songs, formatPlays } from "@/data/mockData";

const AdminDashboard = () => {
  const totalPlays = songs.reduce((sum, s) => sum + s.plays, 0);
  const weeklyTop = [...songs].sort((a, b) => b.weeklyPlays - a.weeklyPlays)[0];

  const stats = [
    { icon: Users, label: "Артистов", value: artists.length },
    { icon: Music, label: "Песен", value: songs.length },
    { icon: Headphones, label: "Прослушиваний", value: formatPlays(totalPlays) },
    { icon: Trophy, label: "Лидер недели", value: weeklyTop?.title || "—" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-8">Дашборд</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl bg-card border border-border"
          >
            <stat.icon size={20} className="text-primary opacity-70" />
            <div className="mt-3 text-xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {songs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold tracking-tight mb-4">Последние треки</h2>
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider">Название</th>
                  <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider">Артист</th>
                  <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider">Plays</th>
                  <th className="text-left px-4 py-3 text-[11px] text-muted-foreground uppercase tracking-wider">Дата</th>
                </tr>
              </thead>
              <tbody>
                {songs.slice(0, 5).map((song) => (
                  <tr key={song.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 font-medium">{song.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{song.artistName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatPlays(song.plays)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(song.releaseDate).toLocaleDateString("ru-RU")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
