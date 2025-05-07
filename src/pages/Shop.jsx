import { useState } from "react";
import styles from "./Shop.module.css";
import Loading from "../components/loading/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import useProducts from "../components/getData/GetData";
import PropTypes from "prop-types";

export function Card({  clickHandler, product }) {
  return (
    <li className={styles.card} onClick={() => clickHandler(product.id)}>
      <LazyLoadImage
        src={product.image}
        alt={product.model}
        effect="blur"
        className={styles.cardImg}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "src/assets/No_Image_Available.jpg";
        }}  
      />
      <p className={styles.cardTitle}>{product.model}</p>
      <p className={styles.cardPrice}>${product.price}</p>
    </li>
  );
}
Card.propTypes = {
  clickHandler: PropTypes.func,
  product: PropTypes.object,
}
export function Pagination({pages,currentPage, clickPageHandler}){
  return (
    <div className={styles.btnsContainer}>
        {pages.map((page) => (
          <button
          key={page}
            className={`${styles.pageBtn} ${
              page == currentPage && styles.active
            }`}
            onClick={() => clickPageHandler(page)}
          >
            {page}
          </button>
        ))}
      </div>
  );
}
Pagination.propTypes= {
  pages: PropTypes.array,
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clickPageHandler: PropTypes.func,
}

const productPerPage = 20;
export function Shop() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = useProducts(currentPage,productPerPage);
  const navigate = useNavigate();
  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  const totalPages = Math.round(150 / productPerPage);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  function clickHandler(id) {
    navigate(`/shop/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function clickPageHandler(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <>
      <main>
        <ul className={styles.products}>
          {data.map((product) => (
            <Card
              key={product.id}
              product={product}
              clickHandler={clickHandler}
            />
          ))}
        </ul>
      </main>
      <Pagination pages={pages} clickPageHandler={clickPageHandler} currentPage={currentPage}/>
    </>
  );
}
