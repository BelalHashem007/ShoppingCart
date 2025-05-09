import styles from "./App.module.css";
import Header from "./components/header/Header.jsx";
import Footer from "./components/footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import { useState,useEffect } from "react";
function App() {
  const storedCart = JSON.parse(localStorage.getItem("cartItems"))|| [];
  const [cart,setCart]= useState(storedCart);
  useEffect(()=> {
    localStorage.setItem("cartItems", JSON.stringify(cart))
  },[cart])
  return (
    <div className={styles.app}>
      <Header cart={cart}/>
      <Outlet context={{cart,setCart}}/>
      <Footer/>
    </div>
  );
}

export default App;
