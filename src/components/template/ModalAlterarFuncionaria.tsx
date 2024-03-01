import { PencilIcon } from "../icons"
import { Tooltip } from "@nextui-org/tooltip"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Input } from "@nextui-org/input"
import { Radio, RadioGroup } from "@nextui-org/radio"
import Employee from "@/model/Employee"
import { useEffect, useState } from "react"
import useEmployeeApi from "@/data/hook/useEmployeeApi"

interface ModalAlterarFuncionariaProps {
    user: Employee,
    carregando: boolean,
    setCarregando: (carregando:boolean) => void
}

export default function ModalAlterarFuncionaria(props: ModalAlterarFuncionariaProps) {
    const {changeEmployee} = useEmployeeApi() 
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [employee, setEmployee] = useState<Employee>({ //Não devia ser zerado, devia vir de cima. A atualização ocorre via serviço/ 
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
        setEmployee(props.user)
      },[])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setEmployee({
            ...employee,
            [name]: value
        })
    }

    async function alterar(){
        changeEmployee(employee)
        props.setCarregando(true)
    }

    return (
        <Tooltip color="warning" content="Editar" className="px-1 py-1">
            <Button isIconOnly color="warning" aria-label="alterar" variant="bordered" onPress={onOpen} isDisabled={props.user.isActive === 'INATIVA'}>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
                    <ModalContent>
                        {(onClose) => (
                            <div>
                                <ModalHeader className="flex flex-col gap-1 text-black">Alterar Funcionária</ModalHeader>
                                <ModalBody className="text-black">
                                    <Input
                                        autoFocus
                                        name="name"
                                        type="text"
                                        label="Nome"
                                        placeholder="Insira o nome"
                                        variant="bordered"
                                        value={employee.name}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="text"
                                        name="cpf"
                                        label="CPF"
                                        placeholder="Insira o CPF"
                                        variant="bordered"
                                        value={employee.cpf}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="date"
                                        name="birthDate"
                                        label="Data de Nascimento"
                                        placeholder="DD/MM/YYYY"
                                        variant="bordered"
                                        value={employee.birthDate!.split('/').reverse().join('-')}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="text"
                                        name="address"
                                        label="Endereço"
                                        placeholder="Insira o endereço completo"
                                        variant="bordered"
                                        value={employee.address}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        type="date"
                                        name="hiringDate"
                                        label="Data da contratação"
                                        placeholder="DD/MM/YYYY"
                                        variant="bordered"
                                        value={employee.hiringDate!.split('/').reverse().join('-')}
                                        onChange={handleChange}
                                    />
                                    <RadioGroup label="Selecione o perfil da funcionária" color="secondary" name="employeeTypeNum" value={employee.employeeTypeNum?.toString()} onChange={handleChange}>
                                        <Radio value="2">Vendedora</Radio>
                                        <Radio value="3">Caixa</Radio>
                                        <Radio value="1">Gerente</Radio>
                                    </RadioGroup>
                                </ModalBody>
                                <ModalFooter className="text-black">
                                    <Button color="danger" variant="ghost" onPress={onClose}>Cancelar</Button>
                                    <Button color="primary" variant="ghost" onPress={alterar}>Alterar</Button>
                                </ModalFooter>
                            </div>
                        )}
                    </ModalContent>
                </Modal>
                {PencilIcon} 
            </Button>
        </Tooltip>
    )
}