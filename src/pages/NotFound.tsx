import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => (
  <Layout>
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-7xl font-black text-gradient">404</h1>
      <p className="mt-4 text-muted-foreground">Страница не найдена</p>
      <Link
        to="/"
        className="mt-8 inline-flex px-6 py-2.5 rounded-full bg-gradient-primary text-sm font-semibold text-primary-foreground"
      >
        На главную
      </Link>
    </div>
  </Layout>
);

export default NotFound;
