import { Inter } from "next/font/google";
import Layout from "@/components/template/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout titulo="Store Manager" subtitulo="Gerenciando a operação.">
        <h3>Habemus algo além da estrutura!</h3>
    </Layout>
  );
}
