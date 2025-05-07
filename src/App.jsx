import styles from "./App.module.css";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useState } from "react";
function App() {
  const [cart,setCart]= useState([])
  return (
    <div className={styles.app}>
      <Header />
      <Outlet context={{cart,setCart}}/>
      <Footer/>
    </div>
  );
}

export default App;
