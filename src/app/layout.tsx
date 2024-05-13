import {ReactNode} from "react";
import "./global.scss";
import {UserDataProvider} from "@/context/userDataContext";

export const metadata = {
    title: "Test Task xDataGroup",
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <header style={{background: 'lightblue', padding: "2rem"}}/>
        <div className="flex justify-center my-8 w-full">
            <UserDataProvider>
                {children}
            </UserDataProvider>
        </div>
        </body>
        </html>
    )
}
