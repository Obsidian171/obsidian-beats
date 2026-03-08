import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate("/admin");
    } else {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="min-h-screen gradient-obsidian flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm p-8 rounded-xl border border-border bg-card neon-border"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full gradient-neon flex items-center justify-center mb-4">
            <Lock size={24} className="text-primary-foreground" />
          </div>
          <h1 className="font-display text-xl font-bold tracking-wider">ADMIN</h1>
          <p className="text-sm text-muted-foreground mt-1">Obsidian Records</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-lg gradient-neon font-display text-sm font-semibold tracking-wider text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-shadow"
          >
            ВОЙТИ
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Demo: admin@obsidian.com / admin123
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
