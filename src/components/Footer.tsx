import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-obsidian mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-display text-lg font-bold tracking-wider text-glow mb-4">
            OBSIDIAN<span className="text-primary">.</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Игровой музыкальный лейбл нового поколения. Мы создаём саундтреки, которые определяют игровую культуру.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">НАВИГАЦИЯ</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/artists", label: "Артисты" },
              { to: "/releases", label: "Релизы" },
              { to: "/charts", label: "Чарты" },
              { to: "/about", label: "О нас" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">КОНТАКТ</h4>
          <p className="text-sm text-muted-foreground">info@obsidianrecords.game</p>
        </div>
      </div>
      <div className="mt-12 pt-6 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">© 2025 Obsidian Records. Все права защищены.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
