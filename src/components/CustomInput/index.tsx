import style from "./style.module.scss"

export const CustomInput = ({value, onChange, className, label, type, placeholder, isValid, errorMessage}: {
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
                ? (
                    <div className="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50">
                        <span className="font-medium">{errorMessage}</span>
                    </div>
                )
                : null
            }
        </div>
    )
}
