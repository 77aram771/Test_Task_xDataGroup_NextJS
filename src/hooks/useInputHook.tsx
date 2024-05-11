import {useState} from "react";

export const useInputHook = (initialValue: string) => {
    const [value, setValue] = useState<string>(initialValue);

    const handleChange = (value: string) => setValue(value);

    return {
        value,
        onChange: handleChange,
    };
};
