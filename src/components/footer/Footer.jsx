import styles from "./Footer.module.css"
export default function Footer(){
    return (
        <footer className={styles.footer} data-testid="footer">
        <p>All svg from <a href="https://pictogrammers.com/library/mdi/" target="_blank" rel="noopener noreferrer">Pictogrammers</a></p>
        </footer>
    );
}