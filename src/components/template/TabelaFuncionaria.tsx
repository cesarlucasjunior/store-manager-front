import { Table, TableHeader, TableBody, TableColumn, TableCell, TableRow, getKeyValue } from "@nextui-org/table";
import React, { useEffect } from "react";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import Employee from "@/model/Employee";
import { User } from "@nextui-org/user";
import ModalAlterarFuncionaria from "./ModalAlterarFuncionaria";
import ModalExcluirFuncionaria from "./ModalExcluirFuncionaria";

const columns = [
    {
      id: "name",
      label: "NOME",
    },
    {
      id: "cpf",
      label: "CPF",
    },
    {
      id: "birthDate",
      label: "DATA DE NASCIMENTO",
    },
    {
      id: "address",
      label: "ENDEREÇO",
    },
    {
      id: "hiringDate",
      label: "DATA CONTRATAÇÃO",
    },
    {
      id: "isActive",
      label: "ATIVO",
    },
    {
      id: "employeeType",
      label: "TIPO",
    },
    {
      id: "actions",
      label: "AÇÕES",
    },
  ]
interface TabelaFuncionariaProps {
    employeeList: Employee[],
    carregando: boolean,
    setCarregando: (carregando:boolean) => void
}

export default function TabelaFuncionario(props: TabelaFuncionariaProps) {
  const statusColorMap: Record<string, ChipProps["color"]>  = {
    ATIVA: "success",
    INATIVA: "danger"
  };
    
    type User = typeof props.employeeList[0]
    
    const renderizarCelulaPersonalizada = React.useCallback((user: Employee,  columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof User];
        switch (columnKey) {
          case "name":
            return (
              <User
                avatarProps={{radius: "md", name: ""}}
                description="teste@teste.com"
                name={cellValue}
              >
                teste@teste.com
              </User>
            );
          case "employeeType":
            return (
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize">{cellValue}</p>
              </div>
            );
          case "isActive":
            return (
              <Chip className="capitalize" color={statusColorMap[user.isActive!]} size="sm" variant="flat">
                {cellValue}
              </Chip>
            );
          case "address":
            return (
              <Tooltip color="primary" content={user.address} className="px-1 py-1">
                <span>{typeof cellValue === 'string' && cellValue!.length <=21 ? cellValue : `${cellValue!.toString().substring(0, 21)}...`}</span>
              </Tooltip>
            )
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <ModalAlterarFuncionaria employee={user} carregando={props.carregando} setCarregando={props.setCarregando}/>
                <ModalExcluirFuncionaria user={user} />
              </div>
            );
          default:
            return cellValue;
        }
      }, []);


    return (
        <Table aria-label="Example static collection table">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.id}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent={"Nenhum registro encontrado."} items={props.employeeList}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{renderizarCelulaPersonalizada(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
    )
}