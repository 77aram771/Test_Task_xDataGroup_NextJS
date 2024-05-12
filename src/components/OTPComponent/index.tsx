import {CustomButton} from "@/components/ui/CustomButton";

export const OTPComponent = ({onSubmit, onClick, handleTextChange, OTP, inputRef, status}: {
    onSubmit: (e: any, otpCode: string[]) => void,
    onClick: (e: any) => void,
    handleTextChange: (e: any, index: number) => void,
    OTP: string[],
    inputRef: HTMLInputElement | null | any,
    status: number
}) => {
    return (
        <div className="mx-auto flex w-full flex-col space-y-10">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
                <div className="font-semibold text-2xl">
                    <p>OTP Verification</p>
                </div>
            </div>
            <form onSubmit={(e) => onSubmit(e, OTP)} className="flex flex-col space-y-10">
                <div className="flex flex-row items-center justify-between mx-auto w-full">
                    {Array.from([1, 2, 3, 4, 5, 6], (_, index): any => (
                        <div className={`w-16 h-16 rounded-xl ${status !== 200 ? `border-2 border-rose-500` : ``}`} key={index}>
                            <input
                                type="text"
                                maxLength={1}
                                value={OTP[index]}
                                onChange={(e) => handleTextChange(e.target.value, index)}
                                ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement | null | any)}
                                className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                                style={{marginRight: index === 6 - 1 ? '0' : '10px'}}
                            />
                        </div>
                    ))}
                </div>
                <CustomButton
                    value={"Verify Account"}
                    type={"submit"}
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                </CustomButton>
                <div
                    className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't recieve code?</p> <span
                    className="flex flex-row items-center text-blue-600 cursor-pointer"
                    onClick={(e) => onClick(e)}>Resend</span>
                </div>
            </form>
        </div>
    )
}
