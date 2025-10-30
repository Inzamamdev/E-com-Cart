import React, { useEffect } from "react";
import useFetch from "../hook/useFetch";

function ProductList() {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/products`);
  }, []);
  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <div>ProductList</div>;
}

export default ProductList;
