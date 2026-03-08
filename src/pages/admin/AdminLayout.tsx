import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Users, Music, LogOut, ArrowLeft } from "lucide-react";

const AdminLayout = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const links = [
    { to: "/admin", icon: LayoutDashboard, label: "Дашборд" },
    { to: "/admin/artists", icon: Users, label: "Артисты" },
    { to: "/admin/songs", icon: Music, label: "Песни" },
  ];

  return (
    <div className="min-h-screen gradient-obsidian flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-border bg-card p-6 flex flex-col">
        <Link to="/" className="font-display text-lg font-bold tracking-wider text-glow mb-8">
          OBSIDIAN<span className="text-primary">.</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-2 pt-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} /> На сайт
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut size={18} /> Выйти
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
