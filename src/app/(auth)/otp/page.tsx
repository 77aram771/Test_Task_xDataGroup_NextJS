"use client"
import {useRef, useState, FormEvent} from 'react';
import {useRouter} from "next/navigation";
import {OTPComponent} from "@/components/OTPComponent";
import {Card} from "@/components/card";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Loader from "@/components/ui/Loader";
import styles from "./style.module.scss";

export default function OTP() {
    const router = useRouter();
    const inputRef = useRef(Array(6).fill(null));

    const [OTP, setOTP] = useState<string[]>(Array(6).fill(''));
    const [getOtp, setGetOTP] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [status, setStatus] = useState<number>(200);

    const handleTextChange = async (event: string, index: number) => {
        const newPin: string[] = [...OTP];
        newPin[index] = event;
        setOTP(newPin);

        if (event.length === 1 && index < 6 - 1) {
            inputRef.current[index + 1]?.focus();
        }

        if (event.length === 0 && index > 0) {
            inputRef.current[index - 1]?.focus();
        }
    };

    const handleSendOTP = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        setErrorMessage('');
        setGetOTP('');

        fetch("/api/generateOTP", {
            method: "POST",
            headers: {},
            body: "",
        })
            .then((response) => response.text())
            .then((result) => {
                console.log("result", result)
                if (result) {
                    setGetOTP(JSON.parse(result)?.otp);
                    setStatus(JSON.parse(result).status);
                }
            })
            .catch((error) => {
                setErrorMessage('An error occurred. Please try again.')
                console.error(error)
            })
            .finally(() => setIsLoading(false))
    }

    const handleVerifyOTP = async (event: any, otpCode: string[]) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        const parseOtpToNumber = parseInt(otpCode.join(""));

        fetch('/api/verifyOTP', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({enterOtp: parseOtpToNumber, otpCode: getOtp}),
        })
            .then((response) => response.text())
            .then((result) => {
                setStatus(JSON.parse(result).status);
                if (JSON.parse(result).status === 200) {
                    router.push('/');
                    setGetOTP("");
                }
            })
            .catch((error) => {
                setErrorMessage('An error occurred. Please try again.')
                console.error(error)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div className={styles.container}>
            <OTPComponent
                onClick={handleSendOTP}
                onSubmit={handleVerifyOTP}
                handleTextChange={handleTextChange}
                OTP={OTP}
                inputRef={inputRef}
                status={status}
            />
            {getOtp && <Card children={getOtp}/>}
            {isLoading && <Loader/>}
            {status !== 200 && errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
        </div>
    )
}
