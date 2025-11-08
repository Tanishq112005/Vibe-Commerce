# E-Commerce Store Project

> A full-stack e-commerce application built by **Tanishq Jain**.

This project is a complete e-commerce website where users can browse products, add them to a cart, and manage their shopping. It features a React-based frontend with Redux for state management and a secure backend API for handling data.

---

## 🚀 Live Links & Demo

* **Frontend (Live):** [https://vibe-commerce-qsmz.vercel.app/](https://vibe-commerce-qsmz.vercel.app/)
* **Backend (Live):** [https://vibe-commerce-eycx.onrender.com](https://vibe-commerce-eycx.onrender.com)
* **YouTube Demo:** [https://www.youtube.com/watch?v=SCeeDYW9eh0](https://www.youtube.com/watch?v=SCeeDYW9eh0)

---

## ✨ Features

* **Product Browsing:** View a list of all available products.
* **Filtering & Sorting:** Filter products by category, price range, and other criteria.
* **User Authentication:** Secure user registration and login.
* **Shopping Cart:** Add, remove, and update item quantities in the cart.
* **Persistent Cart:** Cart items are saved for logged-in users.
* **Responsive Design:** Fully functional on both desktop and mobile devices.

---

## 📸 Screenshots

| Homepage | Cart Page |
| :---: | :---: |
| ![Homepage Screenshot](https://via.placeholder.com/400x300.png?text=Homepage) | ![Cart Page Screenshot](https://via.placeholder.com/400x300.png?text=Cart+Page) |
| **Login Page** | **Mobile View** |
| ![Login Page Screenshot](https://via.placeholder.com/400x300.png?text=Login+Page) | ![Mobile View Screenshot](https://via.placeholder.com/400x300.png?text=Mobile+View) |

---

## 💡 How to Use the Website

1.  **Create an Account:** Start by registering for a new account or logging in if you already have one.
2.  **Browse Products:** On the homepage, you can see all available products.
3.  **Filter Your Search:** Use the filter sidebar (click "☰ Show Filters" on mobile) to find specific items by category or price.
4.  **Add to Cart:** Click the "Add to Cart" button on any product card.
5.  **View Your Cart:** Click the "🛒 View Cart" button in the header to see your selected items.
6.  **Manage Your Cart:** On the cart page, you can update the quantity of any item or remove it completely.
7.  **Place Order:** Proceed to checkout to place your order.

---

## 🛠️ Tech Stack

* **Frontend:** React, Redux Toolkit, React Router
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (or your database)
* **Authentication:** JWT (JSON Web Tokens)

---

## 🔌 API Endpoints

Here are the main API endpoints used by the application.

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signUp` | Registers a new user. |
| `POST` | `/api/auth/login` | Logs in an existing user and returns a token. |

### Items / Products (`/api/items`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/items/getItems` | **(Protected)** Fetches all available items. |
| `GET` | `/api/items/getShopkeeperItems`| **(Protected)** Fetches items specific to the logged-in shopkeeper. |
| `POST` | `/api/items/add` | **(Protected)** Adds a new item to the store. |
| `PUT` | `/api/items/update/:id` | **(Protected)** Updates details of a specific item. |
| `DELETE` | `/api/items/delete/:id` | **(Protected)** Removes an item from the store. |

### Cart (`/api/cart`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/cart/` | **(Protected)** Fetches all items in the user's cart. |
| `POST` | `/api/cart/add` | **(Protected)** Adds an item to the cart. |
| `PUT` | `/api/cart/update` | **(Protected)** Updates the quantity of a cart item. |
| `DELETE` | `/api/cart/:item_id` | **(Protected)** Removes a specific item from the cart. |

### Orders (`/api/orders`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/orders/create` | **(Protected)** Places a new order. |
| `GET` | `/api/orders/my-orders` | **(Protected)** Fetches the current user's order history. |
| `DELETE` | `/api/orders/:id` | **(Protected)** Cancels/removes a specific order. |

### Shop (`/api/shop`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/shop/addShop` | **(Protected)** Registers a new shop. |


---

## ⚙️ How to Run Locally

To get a local copy up and running, follow these steps.

### Prerequisites

* Node.js (v18 or later)
* npm

### 1. Clone the Repository

```sh
git clone [https://github.com/Tanishq112005/Vibe-Commerce.git](https://github.com/Tanishq112005/Vibe-Commerce.git)
cd your-repo-name
```

### 2. Install Backend Dependencies

```sh 
# Navigate to the server/backend folder
cd backend
npm install

```

### 3. Install Frontend Dependencies

```sh 
cd fronted
npm install 
```
### 4. Set Up Environment Variables

Create a .env file in your server directory and add the following:

```sh
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_very_strong_secret_key"
```

### 5. Run the Application
Run the Backend:

```Bash

# From the /backend
node server.js
```

```Bash

# From the /frontend directory
npm run dev 
```

The frontend will be available at http://localhost:3000 and the backend at http://localhost:5000 (or your configured ports).
