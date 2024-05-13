const ErrorMessage = ({errorMessage}: {errorMessage: string | undefined}) => {
    return (
        <div className="w-full p-2 text-sm text-red-800 rounded-lg bg-red-50">
            <span className="font-medium">{errorMessage}</span>
        </div>
    )
}

export default ErrorMessage;
