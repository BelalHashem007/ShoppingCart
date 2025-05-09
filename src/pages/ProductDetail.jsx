import { useParams } from "react-router-dom";
import { useProduct } from "../components/getData/GetData";
import styles from "./Product.module.css";
import { useState, useEffect, useRef } from "react";
import { useOutletContext,useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";

export function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { cart, setCart } = useOutletContext();
  function addToCartHandler() {
    if (cart.filter((item) => item.product.id == product.id).length == 1) {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id == product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
      setQuantity(1);
      toast("Product added to cart!");
    } else {
      setCart((prev) => [...prev, { product, quantity }]);
      setQuantity(1);
      toast("Product added to cart!");
    }
  }
  return (
    <div className={styles.addToCartContainer}>
      <button
        onClick={() => {
          if (quantity > 1) setQuantity((prev) => prev - 1);
        }}
        disabled={quantity == 1}
      >
        -
      </button>
      <span>{quantity}</span>
      <button
        onClick={() => {
          if (quantity < 9) setQuantity((prev) => prev + 1);
        }}
        disabled={quantity == 9}
      >
        +
      </button>
      <button className={styles.addToCartBtn} onClick={addToCartHandler}>
        Add to cart
      </button>
    </div>
  );
}
AddToCart.propTypes = {
  product: PropTypes.object,
};

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const [showFullText, setShowFullText] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const textRef = useRef(null);
  const navigate =useNavigate();

  useEffect(() => {
    if (textRef.current) {
      // Check if text exceeds 3 lines
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * 3;
      setNeedsToggle(textRef.current.scrollHeight > maxHeight);
    }
  }, [product?.description]);

  if (loading) return <div style={{margin: "0px auto"}}>Loading...</div>;
  if (error) return <div style={{margin: "0px auto"}}>Error</div>;
  return (
    <div className={styles.productPageContainer}>
      <button className={styles.backArrow} onClick={()=>navigate("/shop")}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>back</title>
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
        </svg>
      </button>
      <ToastContainer />
      <div className={styles.product}>
        <img
          src={product.image}
          alt={product.model}
          className={styles.productImg}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/src/assets/No_Image_Available.jpg";
          }}
        />
        <div className={styles.productDetails}>
          <h3>{product.title}</h3>
          <p>${product.price}</p>
          <AddToCart product={product} />
          <div className={styles.overviewContainer}>
            <h3>OVERVIEW</h3>
            <p
              ref={textRef}
              className={`${styles.overviewText} ${
                !showFullText ? styles.clampedText : ""
              }`}
            >
              {product.description}
            </p>
            {needsToggle && (
              <button
                onClick={() => setShowFullText(!showFullText)}
                className={styles.toggleButton}
              >
                {showFullText ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
        <div className={styles.productSpecification}>
          <table>
            <caption>SPECIFICATIONS</caption>
            <tbody>
              <tr>
                <th>model</th>
                <th>color</th>
                <th>brand</th>
              </tr>
              <tr>
                <td>{product.model}</td>
                <td>{product.color}</td>
                <td>{product.brand}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
