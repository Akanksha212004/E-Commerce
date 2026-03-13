# MERN E-Commerce Website

A full-stack E-Commerce web application built using the **MERN Stack (MongoDB, Express, React, Node.js)**.
The application allows users to browse products, add items to the cart, and manage products through an admin panel.

---

## 🚀 Live Demo

Frontend:
https://e-commerce-3sd2.vercel.app

Admin Panel:
https://e-commerce-chi-five-54.vercel.app

Backend API:
https://e-commerce-backend-ac08.onrender.com

---

## 🛠 Tech Stack

Frontend

* React.js
* React Router
* CSS

Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

Database

* MongoDB Atlas

Image Storage

* Cloudinary

Deployment

* Vercel (Frontend & Admin)
* Render (Backend)

---

## ✨ Features

User Features

* Browse products
* View product details
* Add items to cart
* Remove items from cart
* User signup & login

Admin Features

* Add new products
* Upload product images
* Delete products
* Manage product inventory

---

## 📂 Project Structure

E-Commerce
│
├── frontend (User website)
├── admin (Admin dashboard)
├── backend (API server)
│
└── README.md

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

---

## 📦 Installation

Clone the repository

git clone https://github.com/Akanksha212004/E-Commerce.git

Go into the project folder

cd E-Commerce

Install backend dependencies

cd backend
npm install

Install frontend dependencies

cd ../frontend
npm install

Install admin dependencies

cd ../admin
npm install

---

## ▶ Running the Project

Run backend

cd backend
npm start

Run frontend

cd frontend
npm start

Run admin panel

cd admin
npm start

---

## 📸 Image Storage

Product images are uploaded to **Cloudinary**, which ensures:

* Permanent image storage
* Faster image delivery using CDN
* No data loss on server redeploy

---

## 📌 Future Improvements

* Payment gateway integration (Stripe)
* Product search and filters
* Order management system
* User profile page

---

## 👩‍💻 Author

Akanksha Yadav

GitHub
https://github.com/Akanksha212004
