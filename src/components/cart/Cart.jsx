import PropTypes from "prop-types";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Item({ item, removeItemHandler }) {
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
        <div>
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

Item.propTypes = {
  item: PropTypes.object,
  removeItemHandler: PropTypes.func,
};

export default function Cart() {
  const { cart, setCart } = useOutletContext();
  console.log(cart);

  function removeItemHandler(itemid) {
    setCart((prev) => prev.filter((item) => item.product.id != itemid));
  }
console.log(styles)
  return (
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
          <div className={styles.checkoutContainer}>
            <h3 >Order Summary</h3>
            <ul>
              {cart.map((item) => (
                <li key={item.product.id}>
                  <div>{item.product.model}</div>
                  <div className={styles.checkoutPrice}>${item.product.price*item.quantity}</div>
                </li>
              ))}
            </ul>
            <div>Total</div>
          </div>
        </div>
      )}
    </div>
  );
}
