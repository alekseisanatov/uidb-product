import logo from "../../assets/logo.png";
import styles from "./Header.module.css";

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                <img src={logo} alt="Ubiquiti" className={styles.logo} />
                <span className={styles.title}>Devices</span>
            </div>
            <span className={styles.author}>Aleksejs Sanatovs</span>
        </header>
    );
};
