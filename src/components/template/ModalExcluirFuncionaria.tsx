import { Tooltip } from "@nextui-org/tooltip";
import { TrashIcon } from "../icons";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Employee from "@/model/Employee";
import useEmployeeApi from "@/data/hook/useEmployeeApi";

interface ModalExcluirFuncionariaProps {
    user: Employee,
    carregando: boolean,
    setCarregando: (carregando:boolean) => void
}


export default function ModalExcluirFuncionaria(props: ModalExcluirFuncionariaProps) {
    const {dismissEmployee} = useEmployeeApi() 
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

    function deletar(user: Employee) {
        console.log('demitindo - ', user.key)
        dismissEmployee(user)
        props.setCarregando(true)
        onClose()
    }

    return (
        <Tooltip color="danger" content="Demitir" className="px-1 py-1">
            <Button isIconOnly color="danger" aria-label="excluir" variant="bordered" onPress={onOpen} isDisabled={props.user.isActive === 'INATIVA'}>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                    <div>
                        <ModalHeader className="text-black items-center">Você realmente quer inativar a funcionária?</ModalHeader>
                        <ModalBody className="text-black items-center">
                            <p>Essa ação é definitiva e não poderá ser desfeita!</p>
                        </ModalBody>
                        <ModalFooter className="text-black">
                            <Button color="danger" variant="ghost" onPress={onClose}>Cancelar</Button>
                            <Button color="primary" variant="ghost" onPress={() => deletar(props.user)}>Demitir</Button>
                        </ModalFooter>
                    </div>
                    )}
                </ModalContent>
                </Modal>
                {TrashIcon}
            </Button>
        </Tooltip>
    )
}