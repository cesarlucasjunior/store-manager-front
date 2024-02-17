import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    tema?: string
    alternarTema?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props: any) {
    const [tema, setTema] = useState('dark')

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaBrowser = localStorage.getItem('tema')
        setTema(temaBrowser!!)
    }, [])

    return (
        <AppContext.Provider value={
            {
                tema,
                alternarTema
            }
        }>
            {props.children}
        </AppContext.Provider>
           
    )
}
export default AppContext