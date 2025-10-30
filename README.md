# 🛒 Mock E-Com Cart

A **full-stack shopping cart application** built as part of the **Vibe Commerce Full Stack Coding Assignment**.  
It demonstrates a complete e-commerce flow — from fetching products to adding them to a cart, updating quantities, checking out, and viewing a receipt — all using a modular architecture and clean UI.

---

## 🚀 Tech Stack

### **Frontend**

- ⚛️ React + TypeScript
- 🎨 Tailwind CSS for responsive styling
- 🔗 React Icons
- 🌐 Custom `useFetch` hook for API requests

### **Backend**

- 🧩 Node.js + Express.js
- 🗄️ MongoDB for cart persistence
- 📦 Fake Store API for mock product data

---

## 🧠 Core Features

### 🖥️ **Frontend**

- Responsive product grid layout
- Product cards with:
  - Image, title, price, rating
  - Quantity counter and “Add to Cart” button
- Shopping Cart page:
  - View all added items
  - Increase/decrease quantity or remove items
  - Real-time total price updates
- Checkout form:
  - Collects name and email
  - Displays a mock receipt modal upon submission
- Clean and minimal purple-themed UI

### ⚙️ **Backend APIs**

| Method   | Endpoint        | Description                                   |
| -------- | --------------- | --------------------------------------------- |
| `GET`    | `/api/products` | Fetch 5–10 mock items from Fake Store API     |
| `POST`   | `/api/cart`     | Add product to cart `{ productId, quantity }` |
| `GET`    | `/api/cart`     | Fetch cart items + total                      |
| `DELETE` | `/api/cart/:id` | Remove an item from cart                      |
| `PUT`    | `/api/cart/:id` | Update item quantity                          |
| `POST`   | `/api/checkout` | Returns a mock receipt (total, timestamp)     |

> 🧩 **Note:**  
> Only `{ productId, quantity }` are stored in MongoDB.  
> Full product details are fetched on-demand from the **Fake Store API** and merged on the backend before sending to the frontend — optimizing performance and data consistency.

---

## ⚡ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/mock-ecom-cart.git
cd mock-ecom-cart

cd server
npm install

cd client
npm install

npm run dev - on client
node server.js - on server
```

## Env set up

### Server env

```bash
MONGO_URI=mongodb+srv://<your-connection-string>
PORT=5000
CLIENT_API_URL=your-client-url
```

### CLient env

```bash
VITE_API_URL=your-client-url
```
