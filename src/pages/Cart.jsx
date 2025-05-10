import PropTypes from "prop-types";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";

export function Item({ item, removeItemHandler }) {
  return (
    <li className={styles.cartItem}>
      <div className={styles.itemContainer}>
        <img
          src={item.product.image}
          alt={item.product.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/src/assets/No_Image_Available.jpg";
          }}
        />
        <div className={styles.itemText}>
          <div className={styles.model}>{item.product.model}</div>
          <div className={styles.itemPrice}>${item.product.price}</div>
          <div>Quantity: {item.quantity}</div>
        </div>
      </div>
      <button
        onClick={() => removeItemHandler(item.product.id)}
        className={styles.removeBtn}
      >
        Remove
      </button>
    </li>
  );
}
export function Checkout({ cart, getTotal, checkoutHandler }) {
  return (
    <div className={styles.checkoutContainer}>
      <h3>Order Summary</h3>
      <ul>
        {cart.map((item) => (
          <li key={item.product.id} className={styles.checkoutProduct}>
            <div>{item.product.model}</div>
            <div className={styles.checkoutPrice}>
              ${item.product.price * item.quantity}
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.checkoutTotal}>
        Total
        <div>${getTotal()}</div>
      </div>
      <button className={styles.checkoutBtn} onClick={checkoutHandler}>
        Checkout
      </button>
    </div>
  );
}
export function CheckoutPopUp({ setShowMsg }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.msgContainer}>
        <h3>Congrats! You have checked out. ^_^</h3>
        <button onClick={() => setShowMsg(false)}>Cancel</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object,
  removeItemHandler: PropTypes.func,
};
CheckoutPopUp.propTypes = {
  setShowMsg: PropTypes.func,
};
Checkout.propTypes = {
  cart: PropTypes.array,
  getTotal: PropTypes.func,
  checkoutHandler: PropTypes.func,
};

export default function Cart() {
  const { cart, setCart } = useOutletContext();
  const [showMsg, setShowMsg] = useState(false);
  console.log(cart);

  function removeItemHandler(itemid) {
    setCart((prev) => prev.filter((item) => item.product.id != itemid));
  }
  function getTotal() {
    const total = cart.reduce((acc, cur) => {
      acc += cur.product.price * cur.quantity;
      return acc;
    }, 0);
    return total;
  }
  function checkoutHandler() {
    setShowMsg(true);
    setCart([]);
  }

  return (
    <>
      <div className={styles.cardContainer}>
        {cart.length == 0 ? (
          <div className={styles.emptyCartContainer}>
            <h2>Your cart is empty</h2>
            <p>Looks like you have not added anything yet.</p>
            <Link to="/shop">Continue Shopping</Link>
          </div>
        ) : (
          <div className={styles.cartContainer}>
            <h2 className={styles.title}>Your Shopping Cart</h2>
            <ul className={styles.cartItems}>
              {cart.map((item) => (
                <Item
                  key={item.product.id}
                  item={item}
                  removeItemHandler={removeItemHandler}
                />
              ))}
            </ul>
            <Checkout
              getTotal={getTotal}
              checkoutHandler={checkoutHandler}
              cart={cart}
            />
          </div>
        )}
      </div>
      {showMsg && <CheckoutPopUp setShowMsg={setShowMsg} />}
    </>
  );
}
