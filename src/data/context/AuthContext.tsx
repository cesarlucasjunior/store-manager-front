import User from "@/model/User";
import { createContext, useEffect, useState } from "react";
import route from 'next/router'
import Cookies from 'js-cookie'

interface AuthContextProps {
    user?: User,
    login?: (email: string, senha: string) => Promise<void>,
    logout?: () => Promise<void>,
    carregando?: boolean
}

const AuthContext = createContext<AuthContextProps>({})

function normalizedUser(data: any): User {
    return {
        name: data.name,
        email: data.email,
        token: data.token,
        role: data.role
    }
}

function gerenciarCookie(isLogado: boolean, user:User) {
    if(isLogado) {
        Cookies.set('admin-template-auth', isLogado, {expires: 3})
        Cookies.set('name', user?.name, {expires: 3})
        Cookies.set('email', user?.email, {expires: 3})
        Cookies.set('token', user?.token, {expires: 3})
        Cookies.set('role', user?.role, {expires: 3})
    } else {
        Cookies.remove('admin-template-auth')
    }

}

export function AuthProvider(props) {
    const [carregando, setCarregando] = useState(true)
    const [user, setUser] = useState<User>()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    useEffect(() => {
        const isLogado = Cookies.get('admin-template-auth')
        const userName = Cookies.get('name')
        const userEmail = Cookies.get('email')
        const userToken = Cookies.get('token')
        const userRole = Cookies.get('role')
        
        if(isLogado) {
            
            const user: User = {
                name: userName,
                email: userEmail, 
                token: userToken,
                role: userRole
            }
            console.log(user)
            setUser(user)
        }
        setCarregando(false)
    }, [])

    function configurarSessao(user: User) {
        if(user?.email) {
            setUser(user)
            gerenciarCookie(true, user)
            setCarregando(false)
            return user.email
        } else {
            setUser(null)
            gerenciarCookie(false, null)
            setCarregando(false)
            return false
        }
    }

    const login = async (email: string, senha:string) => {
        try {
            console.log("logando...")
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({'login': email, 'senha': senha})
            });
            if(!response.ok) {
                throw new Error('Erro ao fazer login');
            }
            const data = await response.json()
            const user = normalizedUser(data)
            configurarSessao(user)
            route.push('/')
        } finally {
            console.log('Eita...')
        }     
    }

    const logout = () => {
        setCarregando(true)
        Cookies.remove('admin-template-auth');
        Cookies.remove('name')
        Cookies.remove('email')
        Cookies.remove('token')
        Cookies.remove('role')
        configurarSessao(null)
        setCarregando(false)
        route.push('/autenticacao')
    }

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout, 
            carregando
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext