"use client"

import {FormEvent, useCallback, useState} from "react";
import {userDataContext} from "@/context";
import {useRouter} from "next/navigation";
import {useInputHook} from "@/hooks/useInputHook";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import {regexLogin, regexPassword} from "@/utils/regex/regex";
import styles from "./style.module.scss";

export default function Login() {
    const {handleUserData} = userDataContext();

    const router = useRouter();
    const loginInput = useInputHook("");
    const passwordInput = useInputHook("");

    const [isValid, setIsValid] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true)
        setErrorMessage('');

        if (regexLogin.test(loginInput.value) && regexPassword.test(passwordInput.value)) {
            fetch("/api/login", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({login: loginInput.value, password: passwordInput.value}),
            })
                .then((response) => response.text())
                .then((result) => {
                    const parseJson = JSON.parse(result);
                    setIsLoading(false);
                    if (parseJson.status === 200) {
                        handleUserData(parseJson);
                        router.push('/otp');

                    } else {
                        setIsValid(false);
                    }
                })
                .catch((error) => {
                    setIsLoading(false);
                    setErrorMessage("error")
                    console.log(error)
                })
        } else {
            setIsLoading(false);
            setIsValid(false);
        }
    }, [loginInput.value, passwordInput.value]);

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold my-2">Login</h1>
            <CustomInput
                value={loginInput.value}
                onChange={loginInput.onChange}
                label="Login"
                type={"text"}
                isValid={isValid || regexLogin.test(loginInput.value)}
                errorMessage={"Please enter valid login"}
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
                    className="flex flex-row my-2 items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                />
            </div>
            {isLoading && <Loader/>}
            {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
        </form>
    )
}
