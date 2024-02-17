import useAppData from "@/data/hook/useAppData"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"
import useAuth from "@/data/hook/useAuth";

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}
export default function Cabecalho(props: CabecalhoProps) {
    const {tema, alternarTema } = useAppData()
    const {user} = useAuth()
    return tema === 'dark'? (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <span className='mr-3 text-white hidden sm:flex'>Olá, {user?.name}!</span>
                <BotaoAlternarTema tema={tema} alterarTema={alternarTema}/>
            </div>
        </div>
    ) : (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`flex flex-grow justify-end items-center`}>
                <span className='mr-3 text-black-300 hidden sm:flex'>Olá, {user?.name}!</span>
                <BotaoAlternarTema tema={tema} alterarTema={alternarTema}/>
            </div>
        </div>
    ) 
}