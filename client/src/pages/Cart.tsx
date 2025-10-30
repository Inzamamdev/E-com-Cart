import React, { useEffect, useState } from "react";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import useFetch from "../hook/useFetch";

interface CartItem {
  _id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const { fetchData, loading } = useFetch();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [form, setForm] = useState({ name: "", email: "" });
  useEffect(() => {
    const getCart = async () => {
      const data = await fetchData(
        `${import.meta.env.VITE_API_URL}/api/cart`,
        "GET"
      );
      if (data) {
        console.log(data);
        setCartItems(data.cart);
      }
    };
    getCart();
  }, [fetchData]);
  console.log(cartItems[0]);
  const handleQuantityChange = async (id: number, delta: number) => {
    const updated = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updated);

    // Update quantity in backend
    await fetchData(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, "PUT", {
      quantity: updated.find((i) => i._id === id)?.quantity,
    });
  };

  const handleRemove = async (id: number) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    await fetchData(`${import.meta.env.VITE_API_URL}/api/cart/${id}`, "DELETE");
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const receipt = {
      name: form.name,
      email: form.email,
      items: cartItems,
      total: totalPrice.toFixed(2),
    };
    setReceiptData(receipt);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {/* Left: Cart Items */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-semibold text-purple-700">
            Shopping Cart
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center justify-between border rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                    <p className="text-purple-600 font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                    <button
                      className="p-1 text-purple-600 hover:text-purple-800"
                      onClick={() => handleQuantityChange(item._id, -1)}
                    >
                      <FaMinus />
                    </button>
                    <span className="w-6 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      className="p-1 text-purple-600 hover:text-purple-800"
                      onClick={() => handleQuantityChange(item._id, 1)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: Summary + Checkout Form */}
        <div className="bg-purple-100 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold text-purple-700 mb-4">
              Order Summary
            </h3>

            <div className="flex justify-between text-gray-700 mb-2">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <hr className="my-3 border-purple-300" />
            <div className="flex justify-between text-lg font-semibold text-purple-800">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleCheckout} className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-purple-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-purple-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition"
            >
              Checkout
            </button>
          </form>
        </div>
      </div>

      {/* Receipt Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-4">
              Receipt
            </h2>
            <p>
              <strong>Name:</strong> {receiptData.name}
            </p>
            <p>
              <strong>Email:</strong> {receiptData.email}
            </p>
            <hr className="my-3" />
            <h3 className="font-medium mb-2">Items:</h3>
            <ul className="text-sm text-gray-700 space-y-1 max-h-40 overflow-y-auto">
              {receiptData.items.map((item: CartItem) => (
                <li key={item._id}>
                  {item.title} × {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </li>
              ))}
            </ul>
            <hr className="my-3" />
            <p className="text-lg font-semibold text-purple-700">
              Total: ${receiptData.total}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
