interface FormProps {
    children: any,
    className?: any
}

export default function Form(props: FormProps) {
    return (
        <form className={props.className}>
            {props.children}
        </form>
    )
}