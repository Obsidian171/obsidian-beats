import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, Users, Music, LogOut, ArrowLeft } from "lucide-react";

const AdminLayout = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) {
    navigate("/");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const links = [
    { to: "/admin", icon: LayoutDashboard, label: "Дашборд" },
    { to: "/admin/artists", icon: Users, label: "Артисты" },
    { to: "/admin/songs", icon: Music, label: "Песни" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="w-56 border-r border-border bg-card/50 p-5 flex flex-col">
        <Link to="/" className="text-sm font-bold tracking-tight mb-8">
          <span className="text-foreground">Obsidian</span>
          <span className="text-primary ml-0.5">Records</span>
        </Link>

        <nav className="flex-1 space-y-0.5">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="space-y-0.5 pt-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> На сайт
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
