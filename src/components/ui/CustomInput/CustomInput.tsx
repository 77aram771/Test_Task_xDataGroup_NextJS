import ErrorMessage from "@/components/ui/ErrorMessage";
import style from "./style.module.scss"

const CustomInput = ({value, onChange, className, label, type, placeholder, isValid, errorMessage}: {
    value: string,
    onChange: (value: string) => void,
    className?: string,
    label?: string,
    type?: string,
    placeholder?: string,
    isValid?: boolean,
    errorMessage?: string,
}) => {
    return (
        <div className={style.container}>
            <label>
                {label}
            </label>
            <input
                className={className}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.currentTarget.value)}
                type={type}
                style={{borderColor: !isValid ? 'red' : 'black'}}
            />
            {!isValid
                ? <ErrorMessage errorMessage={errorMessage}/>
                : null
            }
        </div>
    )
}

export default CustomInput;
