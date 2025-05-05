import styles from "./Loading.module.css";
export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.loadingCard}></div>
            <div className={styles.loadingCard}></div>
            <div className={styles.loadingCard}></div>
            <div className={styles.loadingCard}></div>
            <div className={styles.loadingCard}></div>
            <div className={styles.loadingCard}></div>
            <div className={styles.loadingCard}></div>
            <div className={styles.loadingCard}></div>
        </div>
    );
}