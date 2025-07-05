# Saree Shop (Blinkit‑style) – Quick Start Guide

**Features**
- Browse sarees without login
- Cart, checkout, order placement
- 10‑minute delivery in Jodhpur (Razorpay only)
- Razorpay + COD for other cities/states
- Admin can add/edit products via API
- MERN stack

## Setup

### 1. Clone & Install

```bash
git clone <your repo>
cd saree-shop
```

**Server**
```bash
cd server
npm install
cp .env.sample .env   # add your Mongo URI, JWT secret, Razorpay keys
npm run dev
```

**Client**
```bash
cd ../client
npm install
npm start
```

The client proxies API calls to `localhost:5000` by default.

### 2. Production

- Deploy **client** on Netlify/Vercel
- Deploy **server** on Render/Railway
- Add environment variables on the server dashboard

### 3. Admin APIs

- POST `/api/products` with JSON body to add products
- Secure with token or simple secret in headers (extend `authMiddleware.js`)

---

Built with ❤️ by ChatGPT on 2025-07-05
