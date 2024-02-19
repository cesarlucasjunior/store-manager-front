import Form from "@/components/template/Form";
import Layout from "@/components/template/Layout";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input"
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import Alert from "@/components/template/Alert";
import useStoreApi from "@/data/hook/useStoreApi";

export default function Loja() {
    const { insert, getStore, name, setName, cnpj, setCnpj, operationStatus, hasData, message } = useStoreApi()
    const [token, setToken] = useState()

    useEffect(() => {
        const token = Cookies.get('token')
        setToken(token)
        getStore(token)
    }, [])

    return (
        <Layout titulo="Loja" subtitulo="Gerenciando dados da Loja.">
            <Form className={` flex flex-col 
                dark:bg-gray-800 rounded-md p-4
            `}>
                <Input 
                    type="text" 
                    label="Nome" 
                    variant="bordered" 
                    labelPlacement="outside"
                    value={name}
                    onValueChange={setName}
                    isDisabled={hasData}
                />
                <Input 
                    className="pt-3"
                    type="text" 
                    label="CNPJ" 
                    variant="bordered" 
                    labelPlacement="outside"
                    value={cnpj}
                    onValueChange={setCnpj}
                    isDisabled={hasData}
                />
                <Button className="mt-10" color="primary" variant="ghost" onClick={insert} isDisabled={hasData}>Cadastrar</Button> 
                {
                    operationStatus ? 
                        <Alert type={operationStatus} message={message}/>
                    :
                       false
                }
            </Form>
        </Layout>
    )
}