import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const SectionHeader = ({ title, subtitle, children }: SectionHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
  >
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold tracking-wider text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>
      )}
    </div>
    {children}
  </motion.div>
);

export default SectionHeader;
