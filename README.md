# 🛒 1UP Gaming – MERN E-Commerce Ecosystem

[![Backend Status](https://img.shields.io/badge/Backend-Render-green)](https://e-commerce-mern-1nu4.onrender.com)
[![Frontend Status](https://img.shields.io/badge/Frontend-Vercel-blue)](https://1up-gaming.vercel.app/)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-orange)](#-tech-stack)

A robust, production-ready video game e-commerce platform. This project demonstrates a deep understanding of **Stateless Authentication**, **Service-Layer Architecture**, and **High-Performance Discovery** in a strict TypeScript environment.

## 🔗 Live Deployment
* **Storefront:** [https://1up-gaming.vercel.app/](https://1up-gaming.vercel.app/)
* **API Gateway:** [https://e-commerce-mern-1nu4.onrender.com](https://e-commerce-mern-1nu4.onrender.com)

---

## 🛠 Tech Stack & Tools

| Layer | Technology | Key Features |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript | Vite, Axios, Debounced Discovery |
| **Backend** | Node.js, Express | TypeScript, ESM (NodeNext), JWT |
| **Database** | MongoDB Atlas | Mongoose ODM, Relational Population |
| **DevOps** | Render, Vercel | CI/CD, CORS Management, SSL Security |

---

## 🏗 System Architecture & Analysis

### 1. The Service-Layer Pattern
Unlike standard "Fat Controllers," this project implements a **Service-Layer Architecture**. 
* **Separation of Concerns:** Controllers handle HTTP status codes and request parsing, while logic resides in standalone Service files (e.g., `cartservices.ts`).
* **Scalability:** This allows for easier unit testing and logic reuse across the application.

### 2. High-Performance Discovery (Search & Suggestions)
The platform features an optimized discovery engine designed for gaming catalogs:
* **Regex-Powered Search:** Implements case-insensitive pattern matching via MongoDB to handle flexible user queries.
* **Intelligent Suggestions:** The "Search-as-you-type" system utilizes debouncing to minimize API overhead while providing instant UI feedback.
* **Server-Side Filtering:** All filtering logic happens at the database level to ensure low memory usage on the client side.

### 3. Stateless Security (JWT)
Authentication is handled via a custom `validateJWT` middleware. 
* **Hydration Pattern:** The middleware verifies the signature and "hydrates" the `req.user` object from the database, ensuring that deactivated accounts are blocked even if their token hasn't expired.
* **Bearer Scheme:** Standardizes security headers across all protected routes.

### 4. Data Integrity Logic
* **Recalculated Totals:** The backend never trusts the frontend for pricing. During cart updates, `totalAmount` is recalculated using the `reduce()` method based on the source-of-truth database prices.
* **Population:** Bridges the gap between lean document storage and a rich, relational frontend experience using Mongoose `.populate()`.

---

## 🚀 Installation & Local Setup

### Backend
1. Navigate to `/BACKEND` and run `yarn install`.
2. Set up your `.env`:
   ```env
   DATA_BASEURL=your_mongodb_uri
   JWT_SECRET=your_secure_string
   PORT=10000
   ```
3. Run `yarn dev`.

### Frontend
1. Navigate to `/FRONTEND` and run `yarn install`.
2. Update `src/constants/api.ts` with your backend URL.
3. Run `yarn dev`.

---

## 📝 Key Features
* ✅ **Dynamic Gaming Catalog:** Real-time search and platform filtering.
* ✅ **Real-time Cart Logic:** Dynamic quantity updates and stock validation.
* ✅ **Secure Checkout:** Atomic transition from Active Cart to Completed Order.
* ✅ **Global Type Safety:** Shared interfaces for Models and API payloads.

## 📈 Future Improvements
* **Redis Caching:** For ultra-fast product retrieval during sales.
* **Stripe Integration:** For actual payment processing.
* **Refresh Tokens:** To improve user session longevity and security.

---

### 👤 Author
**AYOU000** *Full Stack Developer specializing in Type-Safe Backend Systems.*

---

**Note to Recruiters:** *This project emphasizes clean code, error handling (400/403/500 status codes), and modern deployment workflows.*
