import Layout from "@/components/template/Layout";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import {RadioGroup, Radio} from "@nextui-org/radio";
import { useEffect, useState } from "react";
import React from "react";
import useEmployeeApi from "@/data/hook/useEmployeeApi";
import TabelaFuncionario from "@/components/template/TabelaFuncionaria";

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
        <TabelaFuncionario employeeList={employeeList} />
    </Layout>
  );
}