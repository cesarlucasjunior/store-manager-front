import { WarningIcon } from "../icons"

interface AlertProps {
    type: string
    message: string
}

export default function Alert(props:AlertProps){
    return (
        <>
            { props.type === 'success' ? 
                (
                    <div className={`
                        flex items-center justify-center
                        bg-green-600 text-white py-3 px-5 my-2 border 
                        border-green-700 rounded-lg mt-10`}>
                        {WarningIcon}
                        <span className="ml-3">{props.message}</span>
                    </div>
                ) : (
                    <div className={`
                        flex items-center justify-center
                        bg-red-400 text-white py-3 px-5 my-2 border 
                        border-red-700 rounded-lg mt-10`}>
                        {WarningIcon}
                        <span className="ml-3">{props.message}</span>
                    </div>
                )
            }
        </>
    )
}  