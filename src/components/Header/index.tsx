import { LogoIcon } from "../icons";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <span className={styles.logo} tabIndex={0} role="img" aria-label="Ubiquiti">
                    <LogoIcon />
                </span>
                <span className={styles.title}>Devices</span>
            </div>
            <span className={styles.author}>Aleksejs Sanatovs</span>
        </header>
    );
};
