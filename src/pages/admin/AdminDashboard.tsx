import { motion } from "framer-motion";
import { Users, Music, Headphones, Trophy } from "lucide-react";
import { artists, songs, formatPlays } from "@/data/mockData";

const AdminDashboard = () => {
  const totalPlays = songs.reduce((sum, s) => sum + s.plays, 0);
  const weeklyTop = [...songs].sort((a, b) => b.weeklyPlays - a.weeklyPlays)[0];

  const stats = [
    { icon: Users, label: "Артистов", value: artists.length, color: "text-neon-purple" },
    { icon: Music, label: "Песен", value: songs.length, color: "text-neon-cyan" },
    { icon: Headphones, label: "Прослушиваний", value: formatPlays(totalPlays), color: "text-neon-magenta" },
    { icon: Trophy, label: "Лидер недели", value: weeklyTop?.title || "—", color: "text-primary" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold tracking-wider mb-8">ДАШБОРД</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl border border-border bg-card neon-border"
          >
            <stat.icon size={24} className={stat.color} />
            <div className="mt-4 font-display text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent songs */}
      <div className="mt-12">
        <h2 className="font-display text-lg font-bold tracking-wider mb-4">ПОСЛЕДНИЕ ТРЕКИ</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider">НАЗВАНИЕ</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider">АРТИСТ</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider">PLAYS</th>
                <th className="text-left px-4 py-3 text-xs text-muted-foreground font-display tracking-wider">ДАТА</th>
              </tr>
            </thead>
            <tbody>
              {songs.slice(0, 5).map((song) => (
                <tr key={song.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                  <td className="px-4 py-3 text-foreground font-medium">{song.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{song.artistName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatPlays(song.plays)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(song.releaseDate).toLocaleDateString("ru-RU")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
