import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import router from "./routes/productRoutes.js";

const app = express();
const corsOptions = {
  origin: process.env.CLIENT_API_URL, // Allow requests only from localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies if needed
};
app.use(express.json());
app.use(cors(corsOptions));

connectDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Started");
});

app.use("/api", router);
