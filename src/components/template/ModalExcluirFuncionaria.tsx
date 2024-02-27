import User from "@/model/User";
import { Tooltip } from "@nextui-org/tooltip";
import { TrashIcon } from "../icons";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Employee from "@/model/Employee";

interface ModalExcluirFuncionariaProps {
    user: Employee
}


export default function ModalExcluirFuncionaria(props: ModalExcluirFuncionariaProps) {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

    function deletar(user: Employee) {
        console.log("deletando")
        console.log(user)
        onClose()
    }

    return (
        <Tooltip color="danger" content="Deletar" className="px-1 py-1">
            <Button isIconOnly color="danger" aria-label="excluir" variant="bordered" onPress={onOpen}>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur">
                <ModalContent>
                    {(onClose) => (
                    <div>
                        <ModalHeader>Tem certeza disso?</ModalHeader>
                        <ModalBody className="text-black items-center">
                            <p>Essa ação é definitiva e não poderá ser desfeita!</p>
                        </ModalBody>
                        <ModalFooter className="text-black">
                            <Button color="danger" variant="ghost" onPress={onClose}>Cancelar</Button>
                            <Button color="primary" variant="ghost" onPress={() => deletar(props.user)}>Excluir</Button>
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