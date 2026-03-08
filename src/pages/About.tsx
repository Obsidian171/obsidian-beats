import { motion } from "framer-motion";
import { Disc3, Zap, Globe, Headphones } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  {
    icon: Disc3,
    title: "ИГРОВАЯ МУЗЫКА",
    desc: "Мы создаём саундтреки, которые определяют атмосферу игровых миров.",
  },
  {
    icon: Zap,
    title: "ЭКСКЛЮЗИВНЫЕ АРТИСТЫ",
    desc: "Наши артисты — уникальные персонажи виртуальных вселенных.",
  },
  {
    icon: Globe,
    title: "ГЛОБАЛЬНАЯ ПЛАТФОРМА",
    desc: "Obsidian Records объединяет игровые сообщества по всему миру.",
  },
  {
    icon: Headphones,
    title: "ОРИГИНАЛЬНЫЙ ЗВУК",
    desc: "Каждый трек — это путешествие через цифровые ландшафты и неоновые миры.",
  },
];

const About = () => (
  <Layout>
    <section className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h1 className="font-display text-4xl md:text-5xl font-black tracking-wider text-glow">
          О ЛЕЙБЛЕ
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          <span className="text-primary font-semibold">Obsidian Records</span> — это игровой музыкальный лейбл 
          нового поколения. Мы не конкурируем со стриминговыми сервисами — мы создаём 
          уникальную платформу для демонстрации артистов, релизов и чартов из игровых вселенных.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Наша миссия — объединить музыку и игровую культуру, создавая саундтреки, 
          которые становятся частью виртуальных миров и историй.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16 max-w-3xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-xl border border-border bg-card neon-border-hover transition-all duration-300"
          >
            <f.icon size={28} className="text-primary mb-4" />
            <h3 className="font-display text-sm font-bold tracking-wider text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default About;
