import styles from "./ErrorState.module.css";

interface ErrorStateProps {
    message?: string;
}

export const ErrorState = ({
    message = "Something went wrong. Please try again.",
}: ErrorStateProps) => {
    return (
        <div className={styles.wrapper}>
            <p className={styles.message}>{message}</p>
        </div>
    );
};
