import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.code}>404</h1>
            <p className={styles.message}>
                The page you were looking for doesn't exist.
            </p>
            <Link to="/devices" className={styles.link}>
                Back to devices
            </Link>
        </div>
    );
};
