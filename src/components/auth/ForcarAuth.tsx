import Head from "next/head"
import Image from "next/image"
import loading from '../../../public/loading.gif'
import useAuth from "@/data/hook/useAuth"
import route from 'next/router'

export default function ForcarAuth(props) {
    const { user, carregando } = useAuth()

    function renderContent() {
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                            if(!document.cookie?.includes("admin-template-auth")){
                                window.location.href = "/autenticacao"
                            }
                        `
                    }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt="Carregando conteúdo"/>
            </div>
        )
    }

    if (!carregando && user?.email) {
        return renderContent()
    } else if (carregando) {
        renderLoading()
    } else {
        route.push('/autenticacao')
        return null
    }

}