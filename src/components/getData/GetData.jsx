import { useState, useEffect } from "react";
export default function useProducts(page, limit) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`, {
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setData(data.products);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [page, limit]);
  return { data, loading, error };
}
export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.in/api/products/${id}`, { mode: "cors" })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.product);
        setProduct(data.product);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);
  return { product, loading, error };
}
