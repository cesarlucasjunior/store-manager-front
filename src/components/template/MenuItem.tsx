import Link from "next/link"

interface MenuItemProps {
    url: string
    texto: string
    icone: any
    className?: string
    onClick?: any
}
export default function MenuItem(props: MenuItemProps) {
    return (
        <li className={`
            hover:bg-gray-100
            dark:hover:bg-gray-800
            cursor-pointer
        `}>
            <Link href={props.url} onClick={props.onClick} className={`
                flex flex-col justify-center items-center
                h-20 w-20
                text-gray-600
                dark:text-gray-200
                ${props.className}
            `}>
                {props.icone}
                <span className={`
                   text-xs font-light
                `}>
                    {props.texto}
                </span>
            </Link>
        </li>
    )
}