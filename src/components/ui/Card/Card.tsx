import {ReactNode} from "react";
import {cardStyle} from "@/utils/constans/CardStyle";

const Card = ({children, className}: { children: ReactNode, className?: string }) => {
    return <div style={cardStyle} className={className}>{children}</div>
};

export default Card;
