import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";

const Apply = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Пожалуйста, заполните имя и номер телефона");
      return;
    }

    // Hidden admin check
    if (login(name.trim(), phone.trim())) {
      navigate("/admin");
      return;
    }

    // Regular application submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="container mx-auto px-4 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={28} className="text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Заявка отправлена</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Спасибо за интерес к Obsidian Records! Мы рассмотрим вашу заявку и свяжемся с вами в ближайшее время.
            </p>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Подать заявку</h1>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Хотите стать частью Obsidian Records? Расскажите о себе, и мы свяжемся с вами.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Ваше имя</label>
              <input
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Номер телефона</label>
              <input
                type="text"
                placeholder="Введите номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Расскажите о себе <span className="text-muted-foreground/50">(необязательно)</span>
              </label>
              <textarea
                placeholder="Кто вы? Какую музыку создаёте?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
              />
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-primary text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Отправить заявку
              <Send size={15} />
            </button>
          </form>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Apply;
