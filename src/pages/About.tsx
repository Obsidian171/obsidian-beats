import { motion } from "framer-motion";
import { Disc3, Zap, Globe, Headphones } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  {
    icon: Disc3,
    title: "Оригинальная музыка",
    desc: "Мы создаём уникальные треки и открываем новые таланты для мира музыки.",
  },
  {
    icon: Zap,
    title: "Эксклюзивные артисты",
    desc: "Каждый наш артист — индивидуальность с уникальным стилем и звучанием.",
  },
  {
    icon: Globe,
    title: "Глобальная платформа",
    desc: "Obsidian Records объединяет музыкантов и слушателей по всему миру.",
  },
  {
    icon: Headphones,
    title: "Высокое качество",
    desc: "Каждый трек проходит профессиональное сведение и мастеринг.",
  },
];

const About = () => (
  <Layout>
    <section className="container mx-auto px-4 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          О лейбле
        </h1>
        <p className="mt-5 text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">Obsidian Records</span> — это музыкальный лейбл 
          нового поколения. Мы создаём платформу для демонстрации артистов, 
          релизов и чартов.
        </p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          Наша миссия — открывать новые имена и создавать музыку, 
          которая вдохновляет и объединяет людей.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-14 max-w-2xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl bg-card hover-lift card-shine"
          >
            <f.icon size={22} className="text-primary mb-3 opacity-80" />
            <h3 className="text-sm font-semibold text-foreground mb-1.5">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </Layout>
);

export default About;
