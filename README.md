# 🛒 1UP Gaming – MERN E-Commerce 
A full-stack e-commerce game store built with the MERN stack and TypeScript. Features a custom dark gaming UI with black and yellow theme.

[![Backend Status](https://img.shields.io/badge/Backend-Render-green)](https://e-commerce-mern-1nu4.onrender.com)
[![Frontend Status](https://img.shields.io/badge/Frontend-Vercel-blue)](https://1up-gaming.vercel.app/)
[![Tech Stack](https://img.shields.io/badge/Stack-MERN-orange)](#-tech-stack)

## 🔗 Live Deployment
* **Storefront:** [https://1up-gaming.vercel.app/](https://1up-gaming.vercel.app/)
* **API Gateway:** [https://e-commerce-mern-1nu4.onrender.com](https://e-commerce-mern-1nu4.onrender.com)

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Material UI (MUI) | Component library |
| React Router | Client-side routing |
| Orbitron Font | Gaming typography |

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| TypeScript | Type safety |
| MongoDB | Database |
| Mongoose | ODM |
| bcrypt | Password hashing |
| JSON Web Token | Authentication |
| dotenv | Environment variables |
| cors | Cross-origin requests |

---

## Features

### Auth
- User registration with hashed passwords (bcrypt)
- JWT login with token stored in localStorage
- Protected routes via JWT middleware
- Token refresh on email update

### Products
- Product catalog fetched from MongoDB
- Search by title with real-time filtering
- Pagination (12 products per page)
- Seed script with 200 real game titles and Steam images

### Cart
- Add items to cart (authenticated users only)
- View cart with item images, titles and prices
- Order summary with total amount
- Checkout creates an order and clears the cart

### Orders
- Full order history per user
- Each order shows items, quantities, unit prices and total
- Orders stored with product snapshots (title, image, price)

### Account
- View current email
- Update email (validates match, checks availability, issues new token)
- Change password (validates current password, hashes new one, forces re-login)

### UI / UX
- Black `#000` and yellow `#FFE600` gaming theme throughout
- Orbitron monospace font on all headings and labels
- Animated scrolling hero image rows on homepage
- Hover effects on all cards (scale, glow border)
- Game cards with gradient overlay, title and price
- Add to cart button appears on card hover
- Responsive layout (xs → lg breakpoints)
- Loading spinners and empty state messages
- Error boundary components
- FREE label for zero-price items

### Users — `/users`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/register` | No | Register new user |
| POST | `/users/login` | No | Login, returns JWT |
| PUT | `/users` | Yes | Update email |
| PUT | `/users/password` | Yes | Change password |

### Products — `/product`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/product` | No | Get all products |

### Cart — `/cart`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/cart` | Yes | Get user cart |
| POST | `/cart` | Yes | Add item to cart |

### Orders — `/order`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/order` | Yes | Get user orders |
| POST | `/order` | Yes | Checkout cart → create order |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd BACKEND
npm install
```

Create a `.env` file in `/BACKEND`:
```env
DATA_BASEURL=your_mongodb_connection_string
JWT_SECRETKEY=your_jwt_secret
PORT=3000
```
Start the server:
```bash
npm run dev
```

### Frontend Setup
```bash
cd FRONTEND
npm run dev
```

Create a `.env` file in `/FRONTEND`:
```env
VITE_API_URL=http://localhost:3000
```

Start the dev server:
```bash
npm run dev
```

---

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `DATA_BASEURL` | BACKEND | MongoDB connection string |
| `JWT_SECRETKEY` | BACKEND | Secret key for signing JWTs |
| `PORT` | BACKEND | Server port (default 3000) |
| `VITE_API_URL` | FRONTEND | Backend base URL |

---

## Architecture
- **Routes** handle HTTP method and path
- **Middleware** validates JWT before protected routes
- **Services** contain all business logic and DB queries
- **Models** define Mongoose schemas

---

## Author

**Ayoub Ben daoud** — Software Engineering Student @ HDU  
GitHub: [AYOU000](https://github.com/AYOU000)  
Email: BENAYOUB0908@gmail.com
