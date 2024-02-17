interface InputProps {
    type: string,
    id: string,
    name: string,
    value?: string,
    placeholder?: string,
    disabled?: boolean,
    required?: boolean
}

export default function Input(props: InputProps) {
    return (
        <input className={``}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            required={props.required}
        />
    )
}