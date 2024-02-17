import useAuth from "@/data/hook/useAuth";
import { EmployeeIcon, GoalIcon, HomeIcon, LogoutIcon, ResultIcon, SettingsIcon } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
    const {logout} = useAuth()
    return (
        <aside className={`
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900
        `}>
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-200
                h-20 w-20
            `}>
                <Logo/>
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" texto="Início" icone={HomeIcon} />
                <MenuItem url="metas" texto="Metas" icone={GoalIcon} />
                <MenuItem url="resultados" texto="Resultados" icone={ResultIcon} />
                <MenuItem url="funcionarias" texto="Funcionárias" icone={EmployeeIcon} />
                <MenuItem url="/ajustes" texto="Configuração" icone={SettingsIcon} />
            </ul>
            <ul>
                <MenuItem 
                    url="" 
                    onClick={logout} 
                    texto="Sair" 
                    icone={LogoutIcon} 
                    className={`
                        text-red-600
                        hover:bg-red-400
                        hover:text-white
                    `}
                />
            </ul>
        </aside>
    )
}