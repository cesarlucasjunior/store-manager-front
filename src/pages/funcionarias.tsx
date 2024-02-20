import Layout from "@/components/template/Layout";
import { Table, TableHeader, TableBody, TableColumn, TableCell, TableRow } from "@nextui-org/table";

export default function Funcionarias() {
    return (
      <Layout titulo="Funcionárias" subtitulo="Gerenciando as Funcionárias.">
          <Table aria-label="Example static collection table" removeWrapper>
            <TableHeader>
              <TableColumn>NOME</TableColumn>
              <TableColumn>CPF</TableColumn>
              <TableColumn>DATA DE NASCIMENTO</TableColumn>
              <TableColumn>ENDEREÇO</TableColumn>
              <TableColumn>DATA DE CONTRATAÇÃO</TableColumn>
              <TableColumn>ENDEREÇO</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No rows to display."}>
              {[]}
               
              {/* <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
      </Layout>
    );
}