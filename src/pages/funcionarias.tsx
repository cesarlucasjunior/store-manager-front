import Layout from "@/components/template/Layout";
import { Table, TableHeader, TableBody, TableColumn, TableCell, TableRow, getKeyValue } from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import {RadioGroup, Radio} from "@nextui-org/radio";
import { useEffect, useState } from "react";
import useEmployeeApi from "@/data/hook/useEmployeeApi";
import { User } from "@nextui-org/user";
import React from "react";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";
import { PencilIcon, TrashIcon } from "@/components/icons";

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

export default function Funcionarias() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const {getEmployee, employeeList} = useEmployeeApi()

  const [carregando, setCarregando] = useState(true)

  const fetchEmployeeData = async () => {
    try {
      await getEmployee()
      setCarregando(false)
    } catch (error) {
      console.log(error)
      setCarregando(false)
    }
  }

  useEffect(() => {
    fetchEmployeeData()
  },[])

  const statusColorMap: Record<string, ChipProps["color"]>  = {
    ATIVA: "success",
    INATIVA: "danger"
  };

  type User = typeof employeeList[0]

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
          <Chip className="capitalize" color={statusColorMap[user.isActive]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="warning" content="Editar" className="px-1 py-1">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {PencilIcon} 
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deletar" className="px-1 py-1">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                {TrashIcon}
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return carregando ? (<p className="text-white">Carregando...</p>) : (
    <Layout titulo="Funcionárias" subtitulo="Gerenciando as Funcionárias.">
      <div className="flex justify-end mb-4">
        <Button className="mt-10" color="primary" variant="ghost" onPress={onOpen}>Adicionar</Button> 
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}   backdrop="opaque" 
              classNames={{backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"}}>
          <ModalContent>
            {(onClose) => (
              <div>
                <ModalHeader className="flex flex-col gap-1 text-black">Cadastrar Funcionária</ModalHeader>
                <ModalBody className="text-black">
                  <Input
                    autoFocus
                    type="text"
                    label="Nome"
                    placeholder="Insira o nome"
                    variant="bordered"
                  />
                  <Input
                    type="text"
                    label="CPF"
                    placeholder="Insira o CPF"
                    variant="bordered"
                  />
                  <Input
                    type="date"
                    label="Data de Nascimento"
                    placeholder="DD/MM/YYYY"
                    variant="bordered"
                  />
                  <Input
                    type="text"
                    label="Endereço"
                    placeholder="Insira o endereço completo"
                    variant="bordered"
                  />
                  <Input
                    type="date"
                    label="Data da contratação"
                    placeholder="DD/MM/YYYY"
                    variant="bordered"
                  />
                  <RadioGroup label="Selecione o perfil da funcionária" color="secondary" defaultValue="2">
                    <Radio value="2">Vendedora</Radio>
                    <Radio value="3">Caixa</Radio>
                    <Radio value="1">Gerente</Radio>
                  </RadioGroup>
                  
                </ModalBody>
                <ModalFooter className="text-black">
                  <Button color="danger" variant="ghost" onPress={onClose}>Cancelar</Button>
                  <Button color="primary" variant="ghost" onPress={onClose}>Cadastrar</Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      </div>
        <Table aria-label="Example static collection table">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.id}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody emptyContent={"Nenhum registro encontrado."} items={employeeList}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{renderizarCelulaPersonalizada(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </Layout>
  );
}