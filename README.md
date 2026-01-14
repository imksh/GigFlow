# 🚀 GigFlow  
**A real-time freelance bidding marketplace**

GigFlow is a full-stack platform where **clients post gigs** and **freelancers compete by placing bids**.  
Clients hire the best offer, and all other bids are automatically rejected.

This is not a listing site — it is a **live reverse-marketplace**.

---

## 🌐 Live Links

- **Frontend:** https://imkhs-gigflow.netlify.app  
- **Backend:** https://gigflow-n32p.onrender.com 

---

## 🔥 Core Features

### 👤 Authentication
- User registration & login  
- JWT authentication stored in **HttpOnly cookies**  
- Secure password hashing using bcrypt  

### 🧑‍💼 For Clients
- Post gigs (title, description, budget)  
- View all bids for a gig  
- Hire one freelancer  
- Automatically reject all other bids  
- Track active & assigned gigs  

### 🧑‍💻 For Freelancers
- Browse open gigs  
- Submit bids with message & price  
- Track bid status (`pending`, `hired`, `rejected`)  
- View all bids   

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

**Frontend**
- React (Vite)
- Tailwind CSS
- Zustand
- Axios
- React Router
- Framer Motion
- Recharts

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- HttpOnly Cookies
- MongoDB Transactions

---

## 🗄 Database Models

**User**
- name
- email
- password (hashed)

**Gig**
- title
- desc
- budget
- owner
- status (open, assigned)
- createdAt

**Bid**
- gig
- freelancer
- price
- message
- status (pending, hired, rejected)

---

## 🧠 Hiring Logic

When a client hires a freelancer:

1. Gig status becomes `assigned`
2. Selected bid becomes `hired`
3. All other bids become `rejected`
4. This is executed inside a MongoDB transaction to prevent race conditions  

Only one freelancer can be hired per gig.

---

## ⚙️ Environment Variables

Create a `.env` file in the backend:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development