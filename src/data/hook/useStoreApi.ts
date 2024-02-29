import { useState } from "react";
import Cookies from 'js-cookie'
import Store from "@/model/Store";

export default function useStoreApi() {
    const [hasData, setHasData] = useState(false)
    const [carregando, setCarregando] = useState(false)
    const [name, setName] = useState()
    const [cnpj, setCnpj] = useState()
    const [operationStatus, setOperationStatus] = useState('')
    const [message, setMessage] = useState<string>()
    

    const URL_SERVER = 'http://localhost:8080'

    function enviarStatusOperacao(status: string, message:string, duracaoEmSegundos=5) {
        setOperationStatus(status)
        setMessage(message)
        setTimeout(() => setOperationStatus(''), duracaoEmSegundos * 1000)
    }

    async function getStore(token: string) {
        setCarregando(true)
        try {
            const response = await fetch(`${URL_SERVER}/store/1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if(!response.ok) {
                if(response.status === 403) {
                    setHasData(false)
                } else {
                    enviarStatusOperacao('error', 'Falha durante operação', 15)
                    setHasData(false)
                    throw new Error('Erro ao realizar a solicitação GET - Store');
                }
            } else {
                const responseBody = await response.json()
                setName(responseBody.name)
                setCnpj(responseBody.cnpj)
                setCarregando(false)
                setHasData(true)
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            enviarStatusOperacao('error', 'Falha durante operação', 15)
        }
    }

    async function insert() {
        try {
            const token = Cookies.get('token')
            const store: Store = {
                name,
                cnpj
            }
   
            setCarregando(true)
            const response = await fetch(`${URL_SERVER}/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({'name':store.name, 'cnpj': store.cnpj})
            });
            if(!response.ok) {
                enviarStatusOperacao('error', 'Falha durante operação', 15)
                throw new Error('Erro ao realizar a solicitação POST - Store');
            }
            enviarStatusOperacao('success', 'Registro salvo com sucesso!')
            getStore(token!!)
            setCarregando(false)
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            enviarStatusOperacao('error', 'Falha durante operação', 15)
        }
    }
    return { insert, getStore, name, cnpj, setName, setCnpj, operationStatus, hasData, setHasData, message }

}