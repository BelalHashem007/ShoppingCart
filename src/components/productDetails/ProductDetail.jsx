import { useParams } from "react-router-dom";
import { useProduct } from "../getData/GetData";
import styles from "./Product.module.css";
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

function AddToCart({product}) {
  const [quantity, setQuantity] = useState(1);
  const {setCart} = useOutletContext();
  function addToCartHandler(){
    setCart((prev)=> [...prev,{product,quantity}])
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
      <button className={styles.addToCartBtn} onClick={addToCartHandler}>Add to cart</button>
    </div>
  );
}
AddToCart.propTypes = {
  product: PropTypes.object,
}

export default function ProductDetail() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const [showFullText, setShowFullText] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      // Check if text exceeds 3 lines
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * 3;
      setNeedsToggle(textRef.current.scrollHeight > maxHeight);
    }
  }, [product?.description]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <>
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
          <AddToCart product={product}/>
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
    </>
  );
}
