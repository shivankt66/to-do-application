# 📝 Todo App with Authentication  

[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)](https://react.dev/)  
[![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)  
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)  
[![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)](https://expressjs.com/)  
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)  
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)](https://jwt.io/)  
[![Vercel](https://img.shields.io/badge/Frontend%20Deployed%20On-Vercel-black?logo=vercel)](https://vercel.com/)  
[![Render](https://img.shields.io/badge/Backend%20Deployed%20On-Render-purple?logo=render)](https://render.com/)  

A full-stack **MERN (MongoDB, Express, React, Node.js)** Todo application with secure authentication.  
Users can **sign up, log in, and manage their tasks** easily from any device.  

---

## 🚀 Features  
- 🔐 **User Authentication** (JWT-based login & signup)  
- 📋 **Todo Management** (Add, view, toggle complete, delete)  
- 📱 **Responsive UI** (TailwindCSS styled)  
- ☁️ **Cross-device sync** – tasks available wherever you log in  
- 🖥️ **Protected Routes** – only logged-in users can access their todos  

---

## 🛠️ Tech Stack  
- **Frontend:** React, TailwindCSS, Axios, React Router  
- **Backend:** Node.js, Express.js, MongoDB, JWT Authentication  
- **Deployment:** Render (Backend), Vercel (Frontend)  

---

## 📂 Project Structure  

todo-auth-app/
│
├── backend/            # Express + MongoDB + JWT
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Auth & Task routes
│   ├── server.js       # Entry point
│
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # Navbar, Tasks, Login, Signup
│   │   ├── api.js      # Axios instance
│   │   └── App.js      # Routes
│
└── README.md


---

## ⚡ Setup Instructions  

### Backend  
cd backend
npm install
npm run dev

## Create a .env file in the backend folder:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key

## Frontend
cd client
npm install
npm start


## Create a .env file in the client folder:

REACT_APP_API_URL=https://your-backend.onrender.com/api

## 🌍 Deployment

Backend → Render

Frontend → Netlify

## 🤝 About

This project was created by Shivank Tyagi as a practice project to learn authentication and full-stack development.

## It demonstrates how to:

Manage users securely with JWT

Protect routes in a React app

Store and retrieve user-specific data in MongoDB

## 📬 Contact

🌐 Portfolio: shivanktyagi-portfolio.netlify.app

📧 Email: shivankt66@gmail.com

💼 LinkedIn: (add your LinkedIn link here)
