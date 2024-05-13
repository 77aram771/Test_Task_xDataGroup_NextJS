"use client"

import {useState, createContext} from "react";

type UserDataContextProps = {
    userData: any;
    handleUserData: any;
};

export const UserDataContext = createContext<UserDataContextProps>({
    userData: null,
    handleUserData: () => {}
});

export const UserDataProvider = ({children}: any) => {
    const [userData, setUserData] = useState(null);

    const handleUserData = (data: any) => setUserData(data);

    return (
        <UserDataContext.Provider value={{handleUserData, userData}}>
            {children}
        </UserDataContext.Provider>
    );
};
