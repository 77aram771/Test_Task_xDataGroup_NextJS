import {ReactNode} from "react";
import "./global.scss";

export const metadata = {
    title: "Test Task",
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en">
        <body>
        <header
            style={{
                background: 'lightblue',
                padding: "2rem"
            }}
        >
            {/*<p>Header</p>*/}
        </header>
        <div className="flex justify-center my-8 w-full">
            {children}
        </div>
        </body>
        </html>
    )
}
