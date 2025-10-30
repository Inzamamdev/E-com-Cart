import CartItem from "../model/cartItems.js";
import axios from "axios";

const FAKE_STORE_API = "https://fakestoreapi.com/products";

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    const { data: products } = await axios.get(FAKE_STORE_API);

    // Merge product info with cart data
    const enrichedCart = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...item._doc,
        title: product?.title,
        price: product?.price,
        image: product?.image,
        rating: product?.rating,
        subtotal: (product?.price || 0) * item.quantity,
      };
    });

    const total = enrichedCart.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({ cart: enrichedCart, total, message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ error: "Product ID required" });

  let item = await CartItem.findOne({ productId });
  if (item) {
    item.quantity += quantity;
    await item.save();
  } else {
    item = await CartItem.create({ productId, quantity });
  }

  res.status(201).json(item);
};

// DELETE /api/cart/:id
export const removeFromCart = async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item removed" });
};
