import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="font-display text-6xl font-black text-primary text-glow">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">Страница не найдена</p>
      <Link
        to="/"
        className="mt-8 inline-flex px-6 py-3 rounded-lg gradient-neon font-display text-sm font-semibold tracking-wider text-primary-foreground"
      >
        НА ГЛАВНУЮ
      </Link>
    </div>
  </Layout>
);

export default NotFound;
