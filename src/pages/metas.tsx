import Input from "@/components/template/Input";
import Layout from "@/components/template/Layout";

export default function Metas() {
    return (
      <Layout titulo="Metas" subtitulo="Gerenciando as Metas.">
          <h3>Aqui serão listadas e criadas todas as metas por ano.</h3>
          <Input
            type='email'
            id='email'
            name='email'
            placeholder="Insira seu e-mail"
            required
          />
      </Layout>
    );
}