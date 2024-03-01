import Layout from "@/components/template/Layout";
import { Button } from "@nextui-org/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import {RadioGroup, Radio} from "@nextui-org/radio";
import { useEffect, useState } from "react";
import React from "react";
import useEmployeeApi from "@/data/hook/useEmployeeApi";
import TabelaFuncionario from "@/components/template/TabelaFuncionaria";
import Alert from "@/components/template/Alert";
import Employee from "@/model/Employee";

export default function Funcionarias() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { getEmployee, employeeList, alert, carregando, setCarregando, createEmployee } = useEmployeeApi()
  const [newEmployee, setNewEmployee] = useState<Employee>({ 
    key: 0,
    cpf: '',
    name: '',
    birthDate: '',
    address: '',
    hiringDate: '',
    isActive: '',
    employeeType: '',
    employeeTypeNum: 0,
    actions: ''
})
  


  useEffect(() => {
    getEmployee()
  }, [carregando])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {name, value} = event.target
    setNewEmployee({
        ...newEmployee,
        [name]: value
    })
  }

  function cadastrar() {
    createEmployee(newEmployee)
    onClose()
  }

  return carregando ? (<p className="text-white">Carregando...</p>) : (
    <Layout titulo="Funcionárias" subtitulo="Gerenciando as Funcionárias.">
      {alert !== '' ? <Alert type="alert" message={alert === 'success'? "Funcionária alterada com sucesso" : "Erro durante atualização"}/> : null}
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
                    name="name"
                    label="Nome"
                    placeholder="Insira o nome"
                    variant="bordered"
                    value={newEmployee.name}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    name="cpf"
                    label="CPF"
                    placeholder="Insira o CPF"
                    variant="bordered"
                    value={newEmployee.cpf!.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')}
                    onChange={handleChange}
                  />
                  <Input
                    type="date"
                    name="birthDate"
                    label="Data de Nascimento"
                    placeholder="DD/MM/YYYY"
                    variant="bordered"
                    value={newEmployee.birthDate!.split('/').reverse().join('-')}
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    name="address"
                    label="Endereço"
                    placeholder="Insira o endereço completo"
                    variant="bordered"
                    value={newEmployee.address}
                    onChange={handleChange}
                  />
                  <Input
                    type="date"
                    name="hiringDate"
                    label="Data da contratação"
                    placeholder="DD/MM/YYYY"
                    variant="bordered"
                    value={newEmployee.hiringDate}
                    onChange={handleChange}
                  />
                  <RadioGroup label="Selecione o perfil da funcionária" color="secondary" defaultValue="2" name="employeeTypeNum" value={newEmployee.employeeTypeNum?.toString()} onChange={handleChange}>
                    <Radio value="2">Vendedora</Radio>
                    <Radio value="3">Caixa</Radio>
                    <Radio value="1">Gerente</Radio>
                  </RadioGroup>
                  
                </ModalBody>
                <ModalFooter className="text-black">
                  <Button color="danger" variant="ghost" onPress={onClose}>Cancelar</Button>
                  <Button color="primary" variant="ghost" onPress={cadastrar}>Cadastrar</Button>
                </ModalFooter>
              </div>
            )}
          </ModalContent>
        </Modal>
      </div>
        <TabelaFuncionario employeeList={employeeList} carregando={carregando} setCarregando={setCarregando}/>
    </Layout>
  );
}