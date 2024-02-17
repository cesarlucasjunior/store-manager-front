import AuthInput from "@/components/auth/AuthInput";
import { WarningIcon } from "@/components/icons";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react";

export default function Autenticacao() {
    const { login } = useAuth()

    const [erro, setErro] = useState(null)
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function exibirErro(msg, duracaoEmSegundos=5) {
        setErro(msg)
        setTimeout(() => setErro(null), duracaoEmSegundos * 1000)
    }

    async function submeter() {
        try {
           await login(email, senha) 
        } catch(e) {
            console.log('Exiba mensagem de erro')
            exibirErro(e?.message ?? 'Erro desconhecido!')
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img src="https://source.unsplash.com/random" 
                     alt="Imagem da tela de autenticação"
                     className="h-screen w-full object-cover"
                />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className="text-xl font-bold mb-5">
                    {modo === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </h1>
               {erro ? (
                 <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
                    {WarningIcon}
                    <span className="ml-3">{erro}</span>
                </div>
               ) : false}
                <AuthInput 
                    label="Email"
                    tipo="email"
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio
                />
                <AuthInput 
                    label="Senha"
                    tipo="password"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio
                />
                <button onClick={submeter}
                    className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>

                <hr className="my-6 border-grey-300 w-full" />

                {/* <button onClick={submeter}
                    className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3">
                    Entrar com Google
                </button> */}
            </div>
        </div>
    )
}