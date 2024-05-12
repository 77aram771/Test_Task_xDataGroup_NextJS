"use client"
import {FormEvent, useState} from "react";
import {useRouter} from 'next/navigation';
import {CustomInput} from "@/components/ui/CustomInput";
import {CustomButton} from "@/components/ui/CustomButton";
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
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login: loginInput.value, password: passwordInput.value}),
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
                <CustomButton
                    value={"Login"}
                    type={"submit"}
                    className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                />
            </div>
        </form>
    )
}
