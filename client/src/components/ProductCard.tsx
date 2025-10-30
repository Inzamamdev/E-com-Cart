import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import useFetch from "../hook/useFetch";
type Product = {
  productId: number;
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
function ProductCard({
  productId,
  image,
  title,
  price,
  rating,
  description,
  category,
}: Product) {
  const [quantity, setQuantity] = useState(1);
  const { data, loading, error, fetchData } = useFetch();
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    fetchData(`${import.meta.env.VITE_API_URL}/api/cart`, "POST", {
      productId,
      quantity,
    });
  };
  return (
    <div className="w-64 bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Image */}
      <div className="h-48 w-full flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col justify-between flex-1 p-4">
        <div className="flex flex-col gap-2">
          <p className="text-gray-800 text-sm font-medium leading-snug line-clamp-2 h-10">
            {title}
          </p>

          <p className="text-lg font-semibold text-black">${price}</p>

          <p className="text-xs text-gray-500">
            Eligible for Shipping To Mars or somewhere else
          </p>
        </div>
        <div className="flex items-center justify-between mt-4 border rounded-md py-1">
          <button
            onClick={handleDecrement}
            className="px-2 py-1 text-sm font-bold text-gray-600 hover:text-violet-700 cursor-pointer"
          >
            <FaMinus />
          </button>
          <span className="text-sm font-semibold text-gray-800">
            {quantity}
          </span>
          <button
            onClick={handleIncrement}
            className="px-2 py-1 text-sm font-bold text-gray-600 hover:text-violet-700 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1">
            <FaStar className="text-emerald-500" />
            <span className="text-gray-800 text-sm font-medium">
              {rating.rate}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 px-3 py-1 border border-violet-500 text-violet-700 rounded-md hover:bg-violet-700 hover:text-white transition text-sm"
          >
            ♡ Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
