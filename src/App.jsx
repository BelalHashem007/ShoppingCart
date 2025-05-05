import styles from "./App.module.css";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
