interface ConteudoProps {
    children?:any
}

export default function Conteudo(props: ConteudoProps) {
    return (
        <div className={`
            flex flex-col mt-7
            text-gray-900
            dark:text-gray-200
        `}>
            {props.children}
        </div>
    )
}