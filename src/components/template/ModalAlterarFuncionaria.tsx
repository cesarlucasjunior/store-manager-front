import User from "@/model/User"
import { PencilIcon } from "../icons"
import { Tooltip } from "@nextui-org/tooltip"

interface ModalAlterarFuncionariaProps {
    user: User
}

export default function ModalAlterarFuncionaria(props: ModalAlterarFuncionariaProps) {
    function editar(user: User) {
        console.log("editando")
        console.log(user)
    }
    return (
        <Tooltip color="warning" content="Editar" className="px-1 py-1">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => editar(props.user)}>
                {PencilIcon} 
            </span>
        </Tooltip>
    )
}