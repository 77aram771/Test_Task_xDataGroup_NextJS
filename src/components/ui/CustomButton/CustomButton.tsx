const CustomButton = ({value, className, type, onClick}: {
    value: string,
    className: string,
    type: "submit" | "reset" | "button" | undefined
    onClick?: () => Promise<void> | void | undefined
}) => {
    return (
        <button className={className} type={type} onClick={onClick}>
            <span className={"text-lg text-white"}>{value}</span>
        </button>
    )
}

export default CustomButton
