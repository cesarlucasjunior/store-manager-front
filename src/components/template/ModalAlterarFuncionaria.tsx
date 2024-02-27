import { PencilIcon } from "../icons"
import { Tooltip } from "@nextui-org/tooltip"
import { Button } from "@nextui-org/button"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal"
import { Input } from "@nextui-org/input"
import { Radio, RadioGroup } from "@nextui-org/radio"
import Employee from "@/model/Employee"
import { useEffect, useState } from "react"

interface ModalAlterarFuncionariaProps {
    user: Employee
}

export default function ModalAlterarFuncionaria(props: ModalAlterarFuncionariaProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    const [employee, setEmployee] = useState<Employee>({
        key: 0,
        cpf: '',
        name: '',
        birthDate: '',
        address: '',
        hiringDate: '',
        isActive: '',
        employeeType: '',
        actions: ''
    })

    useEffect(() => {
        setEmployee(props.user)
      },[])

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    function alterar(){
        console.log(employee)
    }

    return (
        <Tooltip color="warning" content="Editar" className="px-1 py-1">
            <Button isIconOnly color="warning" aria-label="alterar" variant="bordered" onPress={onOpen}>
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
                                    <RadioGroup label="Selecione o perfil da funcionária" color="secondary" name="employeeType" value={employee.employeeType} onChange={handleChange}>
                                        <Radio value="VENDEDORA">Vendedora</Radio>
                                        <Radio value="CAIXA">Caixa</Radio>
                                        <Radio value="GERENTE">Gerente</Radio>
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