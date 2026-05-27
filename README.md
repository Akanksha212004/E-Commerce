# 🛍 MERN E-Commerce Website

A full-stack **E-Commerce web application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

This application provides a complete online shopping experience where users can browse products, manage their cart, place orders, and make payments online. It also includes a dedicated **admin panel** for product management.

---

## 🚀 Live Demo

### User Website
https://e-commerce-3sd2.vercel.app

### Admin Panel
https://e-commerce-chi-five-54.vercel.app

### Backend API
https://e-commerce-backend-ac08.onrender.com

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- CSS3

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer
- Razorpay Integration

### Database
- MongoDB Atlas
- Mongoose

### Image Storage
- Cloudinary

### Deployment
- Vercel (Frontend + Admin Panel)
- Render (Backend)

---

## ✨ Features

### User Features
- Browse products by category
- View detailed product pages
- Add products to cart
- Remove items from cart
- User signup & login with JWT authentication
- Secure checkout process
- Cash on Delivery (COD)
- Online payment via Razorpay
- View order history ("My Orders")
- Responsive UI for better user experience

### Admin Features
- Add new products
- Upload product images to Cloudinary
- Delete products
- Manage product inventory
- Product management dashboard

---

## 📂 Project Structure

```bash
E-Commerce/
│
├── frontend/    # User website
├── admin/       # Admin dashboard
├── backend/     # API server
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

---

## 📦 Installation

### Clone the Repository

```bash
git clone https://github.com/Akanksha212004/E-Commerce.git
```

### Navigate to Project Folder

```bash
cd E-Commerce
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Install Admin Panel Dependencies

```bash
cd ../admin
npm install
```

---

## ▶ Running the Project

### Start Backend Server

```bash
cd backend
npm start
```

### Start Frontend

```bash
cd frontend
npm start
```

### Start Admin Panel

```bash
cd admin
npm start
```

---

## 💳 Payment Integration

This project supports:

- **Cash on Delivery (COD)**
- **Razorpay Online Payments**

Test payments can be performed using Razorpay test credentials in development mode.

---

## 📸 Image Management

Product images are uploaded and stored using **Cloudinary**, which provides:

- Secure cloud image storage
- Fast image delivery via CDN
- Reliable asset persistence after redeployment

---

## 🔐 Authentication

User authentication is implemented using **JWT (JSON Web Tokens)**.

Features include:
- User Signup
- User Login
- Protected cart/order routes
- Secure API access

---

## 📌 Future Improvements

- Product search functionality
- Advanced filtering & sorting
- Wishlist feature
- Order cancellation
- Admin order status updates
- User profile management
- Payment success/failure email notifications

---

## 👩‍💻 Author

**Akanksha Yadav**

GitHub:  
https://github.com/Akanksha212004