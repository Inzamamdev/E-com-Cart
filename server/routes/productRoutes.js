import express from "express";
import { getProduct } from "../controller/getProduct.js";
const router = express.Router();

router.get("/products", getProduct);

export default router;
