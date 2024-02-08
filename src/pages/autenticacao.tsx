import AuthInput from "@/components/auth/AuthInput";
import { useState } from "react";

export default function Autenticacao() {
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function submeter() {
        if(modo === 'login') {
            console.log('Efetuando login...')
        } else {
            console.log('Cadastrar')
        }
    }

    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <div className="w-1/2">
                <h1 className="text-xl font-bold mb-5">
                    {modo === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
                </h1>
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

                <button onClick={submeter}
                    className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3">
                    Entrar com Google
                </button>
            </div>
        </div>
    )
}