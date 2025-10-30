import React, { useEffect, useState } from "react";
import useFetch from "../hook/useFetch";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  image: string;
  category: string;
  description: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
};
function ProductList() {
  const { data, loading, error, fetchData } = useFetch();

  useEffect(() => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/products`);
  }, []);

  console.log(data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Products
      </h2>

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {data.map((product) => (
          <ProductCard
            key={product.id}
            productId={product.id}
            image={product.image}
            title={product.title}
            rating={product.rating}
            price={product.price}
            category={product.category}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
