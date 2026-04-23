import styles from "./Spinner.module.css";

interface SpinnerProps {
    size?: number;
}

export const Spinner = ({ size = 32 }: SpinnerProps) => {
    return (
        <div className={styles.wrapper}>
            <div
                className={styles.spinner}
                style={{ width: size, height: size }}
            />
        </div>
    );
};
