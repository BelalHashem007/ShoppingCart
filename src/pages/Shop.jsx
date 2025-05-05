import { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import Loading from "../components/loading/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function Card({ model, image, price }) {
  return (
    <li className={styles.card}>
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

function useProducts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.in/api/products?limit=150", { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.products);
        setData(data.products);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading, error };
}
export default function Shop() {
  const { data, loading, error } = useProducts();
  const productPerPage = 20;
  //const totalPages = data.length / productPerPage;
  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  return (
    <main>
      <ul className={styles.products}>
        {data.map((product) => (
          <Card
            key={product.id}
            model={product.model}
            image={product.image}
            price={product.price}
          />
        ))}
      </ul>
    </main>
  );
}
