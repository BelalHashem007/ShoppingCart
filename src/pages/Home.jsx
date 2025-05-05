import styles from "./Home.module.css";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <main className={styles.home}>
      <section className={styles.topSection}>
        <h2 className={styles.title}>BIGGEST DEALS ON TOP BRANDS!</h2>
        <p className={styles.para}>
          <strong>
            {" "}
            Don’t miss out on unbeatable discounts from your favorite brands!{" "}
          </strong>
          From fashion and electronics to home essentials, explore limited-time
          offers handpicked just for you. Shop premium quality at prices you’ll
          love — only while supplies last!
        </p>
        <Link to="/shop" className={styles.shopLink}><button className={styles.shopBtn}>Shop Now</button></Link>
      </section>
      <section className={styles.bottomSection}>
        <div className={styles.shipping}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>shipping</title>
            <path d="M18,18.5A1.5,1.5 0 0,1 16.5,17A1.5,1.5 0 0,1 18,15.5A1.5,1.5 0 0,1 19.5,17A1.5,1.5 0 0,1 18,18.5M19.5,9.5L21.46,12H17V9.5M6,18.5A1.5,1.5 0 0,1 4.5,17A1.5,1.5 0 0,1 6,15.5A1.5,1.5 0 0,1 7.5,17A1.5,1.5 0 0,1 6,18.5M20,8H17V4H3C1.89,4 1,4.89 1,6V17H3A3,3 0 0,0 6,20A3,3 0 0,0 9,17H15A3,3 0 0,0 18,20A3,3 0 0,0 21,17H23V12L20,8Z" />
          </svg>
          <h3>Free Shipping</h3>
          <p>Enjoy fast & free delivery on all orders, no minimum required.</p>
        </div>
        <div className={styles.return}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>cash-refund</title>
            <path d="M12.3 8.93L9.88 6.5H15.5V10H17V5H9.88L12.3 2.57L11.24 1.5L7 5.75L11.24 10L12.3 8.93M12 14A3 3 0 1 0 15 17A3 3 0 0 0 12 14M3 11V23H21V11M19 19A2 2 0 0 0 17 21H7A2 2 0 0 0 5 19V15A2 2 0 0 0 7 13H17A2 2 0 0 0 19 15Z" />
          </svg>
          <h3>30-Day Return</h3>
          <p>Changed your mind? No problem. Easy returns within 30 days.</p>
        </div>
        <div className={styles.support}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <title>support</title>
              <path d="M18.72,14.76C19.07,13.91 19.26,13 19.26,12C19.26,11.28 19.15,10.59 18.96,9.95C18.31,10.1 17.63,10.18 16.92,10.18C13.86,10.18 11.15,8.67 9.5,6.34C8.61,8.5 6.91,10.26 4.77,11.22C4.73,11.47 4.73,11.74 4.73,12A7.27,7.27 0 0,0 12,19.27C13.05,19.27 14.06,19.04 14.97,18.63C15.54,19.72 15.8,20.26 15.78,20.26C14.14,20.81 12.87,21.08 12,21.08C9.58,21.08 7.27,20.13 5.57,18.42C4.53,17.38 3.76,16.11 3.33,14.73H2V10.18H3.09C3.93,6.04 7.6,2.92 12,2.92C14.4,2.92 16.71,3.87 18.42,5.58C19.69,6.84 20.54,8.45 20.89,10.18H22V14.67H22V14.69L22,14.73H21.94L18.38,18L13.08,17.4V15.73H17.91L18.72,14.76M9.27,11.77C9.57,11.77 9.86,11.89 10.07,12.11C10.28,12.32 10.4,12.61 10.4,12.91C10.4,13.21 10.28,13.5 10.07,13.71C9.86,13.92 9.57,14.04 9.27,14.04C8.64,14.04 8.13,13.54 8.13,12.91C8.13,12.28 8.64,11.77 9.27,11.77M14.72,11.77C15.35,11.77 15.85,12.28 15.85,12.91C15.85,13.54 15.35,14.04 14.72,14.04C14.09,14.04 13.58,13.54 13.58,12.91A1.14,1.14 0 0,1 14.72,11.77Z" />
            </svg>
          <h3>Premium Support</h3>
          <p>Get expert help anytime via chat or email, 7 days a week.</p>
        </div>
      </section>
    </main>
  );
}
