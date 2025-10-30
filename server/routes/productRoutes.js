import express from "express";
import { getProduct } from "../controller/getProduct.js";
import { addToCart } from "../controller/cartController.js";
const router = express.Router();

router.get("/products", getProduct);
router.post("/cart", addToCart);
export default router;
