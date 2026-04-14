# 🛒 1UP Gaming – MERN E-Commerce 

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
| **Frontend** | React 18, TypeScript | Vite, Fetch API, Mui |
| **Backend** | Node.js, Express | TypeScript, ESM (NodeNext), JWT |
| **Database** | MongoDB Atlas | Mongoose ODM, Relational Population |
---
## Features

- User registration and login
- JWT-protected routes
- Product catalog with search and pagination
- Shopping cart (add/remove items)
- Checkout and order history
- Account management (update email, change password)
- Seeded with 200 real game titles
## Project Structure

E_Commerce_MERN/
├── BACKEND/
     models/
     routes/
     services/
     middleware/
     types/
 ├── FRONTEND/
     src/
     components/
     pages/
     context/
     types/

## 🚀 Installation & Local Setup

### Backend
1. Navigate to `/BACKEND` and run `npm run install`.
2. Set up your `.env`:
   ```env
   DATA_BASEURL=your_mongodb_uri
   JWT_SECRET=your_secure_string
   PORT=10000
   ```
3. Run `npm run dev`.

### Frontend
1. Navigate to `/FRONTEND` and run `npm run install`.
2. Update `src/constants/baseURL.ts` with your backend URL.
3. Run `npm run  dev`.

### 👤 Author
**AYOU000**

---

**Note to Recruiters:** *This project emphasizes clean code, error handling (400/403/500 status codes), and modern deployment workflows.*
