import { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import Employee from "@/model/Employee"

export default function useEmployeeApi() {
    const [operationStatus, setOperationStatus] = useState('')
    const [message, setMessage ] = useState('')
    const [carregando, setCarregando] = useState(false)

    const [employeeList, setEmployeeList] = useState([{}])
    
    const token = Cookies.get('token')
    const URL_SERVER = 'http://localhost:8080'

    function enviarStatusOperacao(status: string, message:string, duracaoEmSegundos=5) {
        setOperationStatus(status)
        setMessage(message)
        setTimeout(() => setOperationStatus(''), duracaoEmSegundos * 1000)
    }

    async function getEmployee() {
        try {
            const response = await fetch(`${URL_SERVER}/employee`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if(!response.ok) {
                if(response.status === 403) {
                    enviarStatusOperacao('error', 'Falha durante autenticação', 15)
                } else {
                    enviarStatusOperacao('error', 'Falha durante operação', 15)
                    throw new Error('Erro ao realizar a solicitação GET - Store');
                }
            } else {
                const responseBody = await response.json()
                //setCarregando(true)
                const newList = buildEmployeeList(responseBody)
                setEmployeeList(newList)
                console.log(newList)
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error);
            enviarStatusOperacao('error', 'Falha durante operação', 15)
        }
    }

    function buildEmployeeList(listOfEmployee: any[]) {
        let newEmployeeList:Employee[] = []
        listOfEmployee.forEach(employee => {
            let newEmployee: Employee = {
                key: employee.id,
                cpf: employee.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'),
                name: employee.name,
                birthDate: employee.birthDate.split('-').reverse().join('/'),
                address: employee.address,
                hiringDate: employee.hiringDate.split('-').reverse().join('/'),
                isActive: employee.isActive ? 'ATIVA' : 'INATIVA',
                employeeType: getPerfil(employee.employeeType.type),
                actions: ""
            }
            newEmployeeList.push(newEmployee)
        })
        return newEmployeeList
    }

    function getPerfil(perfil: string): string {
        if (perfil === 'MANAGER') {
            return 'GERENTE'
        } else if (perfil === 'SALES') {
            return 'VENDEDORA'
        } else {
            return 'CAIXA'
        }
    }

    return { getEmployee, employeeList }
}