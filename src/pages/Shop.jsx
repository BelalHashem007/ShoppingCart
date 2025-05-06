import { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import Loading from "../components/loading/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import useProducts from "../components/getData/GetData";

function Card({ model, image, price, clickHandler, id }) {
  return (
    <li className={styles.card} onClick={() => clickHandler(id)}>
      <LazyLoadImage
        src={image}
        alt={model}
        effect="blur"
        className={styles.cardImg}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "src/assets/No_Image_Available.jpg";
        }}
      />
      <div className={styles.cardTitle}>{model}</div>
      <div className={styles.cardPrice}>${price}</div>
    </li>
  );
}
export default function Shop() {
  const { data, loading, error } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  const productPerPage = 20;
  const startIndex = productPerPage * (currentPage - 1);
  const endIndex = startIndex + productPerPage;
  const totalPages = Math.round(data.length / productPerPage);
  const currentData = data.slice(startIndex, endIndex);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  function clickHandler(id) {
    navigate(`/shop/${id}`);
  }
  function clickPageHandler(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <main>
        <ul className={styles.products}>
          {currentData.map((product) => (
            <Card
              key={product.id}
              model={product.model}
              image={product.image}
              price={product.price}
              clickHandler={clickHandler}
              id={product.id}
            />
          ))}
        </ul>
      </main>
      <div className={styles.btnsContainer}>
        {pages.map((page) => (
          <button
            className={`${styles.pageBtn} ${
              page == currentPage && styles.active
            }`}
            onClick={() => clickPageHandler(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </>
  );
}
