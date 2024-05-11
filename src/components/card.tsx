import {ReactNode} from "react";
import {cardStyle} from "@/utils/constans/CardStyle";

export const Card = ({children}: {children: ReactNode}) => {
    return <div style={cardStyle}>{children}</div>
};
