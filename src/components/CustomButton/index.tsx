import styles from "./style.module.scss";

export const CustomButton = ({value}: { value: string}) => {
    return (
        <button className={styles.container}>
            <span className={"text-lg text-white"}>{value}</span>
        </button>
    )
}
