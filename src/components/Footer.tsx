import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border/50 mt-20">
    <div className="container mx-auto px-4 lg:px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-sm font-semibold tracking-tight mb-3">
            <span className="text-foreground">Obsidian</span>
            <span className="text-primary ml-0.5">Records</span>
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
            Музыкальный лейбл нового поколения. Открываем новые имена и создаём музыку, которая вдохновляет.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Навигация</h4>
          <div className="flex flex-col gap-1.5">
            {[
              { to: "/artists", label: "Артисты" },
              { to: "/releases", label: "Релизы" },
              { to: "/charts", label: "Чарты" },
              { to: "/about", label: "О нас" },
              { to: "/apply", label: "Подать заявку" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Контакт</h4>
          <p className="text-xs text-muted-foreground">info@obsidianrecords.com</p>
        </div>
      </div>
      <div className="mt-10 pt-5 border-t border-border/50 text-center">
        <p className="text-[11px] text-muted-foreground">© 2025 Obsidian Records. Все права защищены.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
