import { Table, TableHeader, TableBody, TableColumn, TableCell, TableRow, getKeyValue } from "@nextui-org/table";
import React from "react";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { PencilIcon, TrashIcon } from "@/components/icons";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Employee from "@/model/Employee";
import { User } from "@nextui-org/user";
import ModalAlterarFuncionaria from "./ModalAlterarFuncionaria";

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

//   function deletar(user: User) {
//     console.log("deletando")
//     console.log(user)
//     return (
//       <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
//           <ModalContent>
//             {(onClose) => (
//               <div>
//                 <ModalBody className="text-black items-center">
//                   <h2>Tem certeza disso?</h2>
//                   <p>Essa ação é definitiva e não poderá ser defeita!</p>
//                 </ModalBody>
//                 <ModalFooter className="text-black">
//                   <Button color="danger" variant="ghost" onPress={onClose}>Cancelar</Button>
//                   <Button color="primary" variant="ghost" onPress={onClose}>Excluir</Button>
//                 </ModalFooter>
//               </div>
//             )}
//           </ModalContent>
//         </Modal>
//     )
//   }

interface TabelaFuncionariaProps {
    employeeList: Employee[]
}

export default function TabelaFuncionario(props: TabelaFuncionariaProps) {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()


    const statusColorMap: Record<string, ChipProps["color"]>  = {
        ATIVA: "success",
        INATIVA: "danger"
      };
    
    type User = typeof props.employeeList[0]
    
    const renderizarCelulaPersonalizada = React.useCallback((user: User,  columnKey: React.Key) => {
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
                <span>{typeof cellValue === 'string' && cellValue!.length <=21 ? cellValue : `${cellValue!.substring(0, 21)}...`}</span>
              </Tooltip>
            )
          case "actions":
            return (
              <div className="relative flex items-center gap-2">
                <ModalAlterarFuncionaria user={user} />
                <Tooltip color="danger" content="Deletar" className="px-1 py-1">
                  <span className="text-lg text-danger cursor-pointer active:opacity-50" /*onClick={() => deletar(user)}*/>
                    {TrashIcon}
                  </span>
                </Tooltip>
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