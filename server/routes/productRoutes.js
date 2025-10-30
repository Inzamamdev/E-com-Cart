import express from "express";
import { getProduct } from "../controller/getProduct.js";
import { addToCart } from "../controller/cartController.js";
import { getCart } from "../controller/cartController.js";
import { removeFromCart } from "../controller/cartController.js";
const router = express.Router();

router.get("/products", getProduct);
router.post("/cart", addToCart);
router.get("/cart", getCart);
router.delete("/cart/:id", removeFromCart);
export default router;
