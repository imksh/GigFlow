# 🚀 GigFlow  
**A real-time freelance bidding marketplace**

GigFlow is a full-stack platform where **clients post gigs** and **freelancers compete by placing bids**.  
Clients instantly hire the best offer, and all other bids are automatically rejected.

This is not a listing site — it is a **live reverse-marketplace**.

---

## 🔥 Core Features

### 👤 Authentication
- User registration & login  
- JWT authentication stored in **HttpOnly cookies**  
- Secure password hashing (bcrypt)

### 🧑‍💼 For Clients
- Post gigs (title, description, budget)  
- View all bids for a gig  
- Hire one freelancer  
- Automatically reject all other bids  
- Track active & assigned gigs  

### 🧑‍💻 For Freelancers
- Browse open gigs  
- Submit bids with message & price  
- Track bid status:
  - `pending`
  - `hired`
  - `rejected`
- View all bids  
- See when you get hired  

### 📊 Dashboard
- Gigs posted  
- Bids made  
- Hired count  
- Active gigs  
- Graphs showing activity (Recharts)

### 🔍 Search
- Live search by gig title  
- Debounced input  
- Fast MongoDB filtering  

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Zustand (state management)
- Axios
- React Router
- Framer Motion (animations)
- Recharts (dashboard graphs)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- HttpOnly Cookies
- MongoDB Transactions

---

## 🗄 Database Models

### User
- `name`
- `email`
- `password` (hashed)

### Gig
- `title`
- `desc`
- `budget`
- `owner`
- `status` (open, assigned)
- `createdAt`

### Bid
- `gig`
- `freelancer`
- `price`
- `message`
- `status` (pending, hired, rejected)

---

## 🧠 Hiring Logic

When a client hires a freelancer:

1. The gig status becomes `assigned`
2. The selected bid becomes `hired`
3. All other bids become `rejected`
4. This is executed inside a **MongoDB transaction** to prevent race conditions

Only one freelancer can ever be hired for a gig.

---

## ⚙️ Environment Variables

Create a `.env` file in the backend: