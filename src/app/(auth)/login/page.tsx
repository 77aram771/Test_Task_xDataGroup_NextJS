"use client"
import {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation';
import {CustomInput} from "@/components/CustomInput";
import {CustomButton} from "@/components/CustomButton";
import {useInputHook} from "@/hooks/useInputHook";
import {regexLogin, regexPassword} from "@/utils/regex/regex";
import styles from "./style.module.scss";

export default function Login() {
    const router = useRouter();
    const loginInput = useInputHook("");
    const passwordInput = useInputHook("");

    const [isValid, setIsValid] = useState<boolean>(true);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (regexLogin.test(loginInput.value) && regexPassword.test(passwordInput.value)) {
            const formData = new FormData(event.currentTarget)
            const email = formData.get('email')
            const password = formData.get('password')

            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            })

            if (response.ok) {
                router.push('/otp');
            } else {
                setIsValid(false);
            }
        } else {
            setIsValid(false);
        }
    }

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold my-2">Login</h1>
            <CustomInput
                value={loginInput.value}
                onChange={loginInput.onChange}
                label="Login"
                type={"text"}
                isValid={isValid || regexLogin.test(loginInput.value)}
                errorMessage={"Please enter valid login credentials"}
            />
            <CustomInput
                value={passwordInput.value}
                onChange={passwordInput.onChange}
                label="Passowrd"
                type={"password"}
                isValid={isValid || regexPassword.test(passwordInput.value)}
                errorMessage={"Please enter valid password"}
            />
            <div className={styles.buttonBox}>
                <CustomButton value={"Login"}/>
            </div>
        </form>
    )
}
