# 💰 AI Expense Tracker

An AI-powered full-stack expense management application that helps users track income and expenses, manage budgets, organize transactions, and receive personalized financial insights using Google Gemini AI.

## 🚀 About the Project

The **AI Expense Tracker** is designed to simplify personal financial management by combining traditional expense tracking with AI-powered insights.

Users can securely manage their financial transactions, organize expenses into categories, set budgets, and view financial summaries from a centralized dashboard. The application also uses **Google Gemini AI** to analyze spending patterns and provide personalized insights such as monthly summaries, saving suggestions, and budget alerts.

The project demonstrates full-stack application development using **React, Node.js, Express.js, PostgreSQL, REST APIs, JWT authentication, and Generative AI**.

---

## ✨ Features

### 📊 Expense & Income Management

* Add and manage income and expense transactions
* Categorize transactions for better organization
* View transaction history
* Track overall income, expenses, and balance

### 💰 Budget Management

* Create budgets for different expense categories
* Track spending against allocated budgets
* Identify categories where spending is increasing
* Receive budget-related alerts

### 🤖 AI-Powered Financial Insights

* Generate AI-based monthly spending summaries
* Get personalized saving suggestions
* Analyze spending behavior
* Generate budget alerts using Google Gemini AI

### 📈 Financial Dashboard

* View financial summaries in one place
* Monitor income, expenses, and balance
* Track category-wise spending
* Review budget performance

### 🔐 Authentication & Security

* User registration and login
* JWT-based authentication
* Protected API routes
* User-specific financial data

### 🔗 REST API

* Structured backend API architecture
* Separate routes for authentication, transactions, categories, budgets, and dashboard data
* PostgreSQL database integration
* Environment-based configuration for sensitive credentials

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* **JavaScript**
* **Vite**
* **Tailwind CSS**
* **React Router**
* **Axios**

### Backend

* **Node.js**
* **Express.js**
* **REST API**
* **JWT Authentication**

### Database

* **PostgreSQL**
* **Neon PostgreSQL**
* **SQL**

### AI

* **Google Gemini API**
* Generative AI for financial insights and recommendations

### Development & Deployment

* **Git & GitHub**
* **Visual Studio Code**
* **Vercel**
* **Render**
* **Neon**

---

## 🔄 How It Works

```text
                    ┌──────────────────────┐
                    │       User           │
                    │ Login / Register     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │      Dashboard       │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Express Backend    │
                    │ Authentication       │
                    │ Transactions         │
                    │ Categories           │
                    │ Budgets              │
                    │ Dashboard            │
                    └───────┬───────┬──────┘
                            │       │
                 ┌──────────┘       └──────────┐
                 ▼                             ▼
       ┌──────────────────┐          ┌──────────────────┐
       │   PostgreSQL     │          │   Gemini AI      │
       │ Financial Data   │          │ AI Insights      │
       └──────────────────┘          └──────────────────┘
                                             │
                                             ▼
                                  ┌────────────────────┐
                                  │ Financial Insights │
                                  │ Saving Tips        │
                                  │ Budget Alerts      │
                                  └────────────────────┘
```

### Application Flow

1. **User Authentication**

   * User registers or logs into the application.
   * JWT authentication is used to protect private resources.

2. **Transaction Management**

   * Users add income and expense transactions.
   * Transactions are stored in PostgreSQL.

3. **Categorization**

   * Transactions are assigned to categories such as food, travel, salary, shopping, etc.

4. **Budget Tracking**

   * Users create budgets for selected categories.
   * The application compares budget limits with actual spending.

5. **Dashboard**

   * Financial data is processed by the backend and displayed through the React dashboard.

6. **AI Analysis**

   * Relevant financial information is sent to the Gemini AI service.
   * Gemini generates spending summaries, saving suggestions, and budget alerts.

7. **Personalized Insights**

   * AI-generated insights are displayed to help users understand and improve their spending habits.

---

## 🎯 Key Learning Outcomes

Through this project, I gained practical experience in:

* Building a complete full-stack web application
* Designing and developing REST APIs
* Working with PostgreSQL and SQL queries
* Implementing JWT authentication and protected routes
* Connecting React frontend with an Express backend
* Integrating Generative AI using Google Gemini
* Managing environment variables and API credentials
* Implementing financial calculations and budget tracking
* Debugging frontend and backend integration issues
* Deploying full-stack applications

---

## 🔮 Future Improvements

* 📱 Responsive mobile-first experience
* 📊 Advanced spending analytics and charts
* 🧠 AI-powered personalized financial planning
* 📅 Recurring transaction support
* 📥 Export transactions to CSV/PDF
* 🔔 Automated budget notifications
* 🎯 Financial goal tracking
* 📈 Spending prediction using AI
* 🌐 Multi-currency support

---

## 💻 Project Structure

```text
AI-Expense-Tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── scripts/
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── README.md
└── ...
```

---

## 🌐 Live Demo

### 🚀 Frontend

**Live Application:**
https://ai-expense-tracker-theta-five.vercel.app

### ⚙️ Backend API

**Backend:**
https://ai-expense-tracker-sf9f.onrender.com

> The backend API may return a 404 response at the root URL if no `/` route is configured. This does not necessarily mean the API is unavailable; use the application's configured API endpoints.

---

## 📸 Screenshots

Add screenshots of the following important screens:

* Login / Register
* Dashboard
* Add Transaction
* Transaction History
* Budget Management
* AI Financial Insights

Example:

## 📸 Screenshots

### Dashboard
<img width="1889" height="965" alt="dashboard" src="https://github.com/user-attachments/assets/baf3245e-c00d-4850-8d99-81a00af6fa48" />

### Budget Management
<img width="1905" height="923" alt="budgets" src="https://github.com/user-attachments/assets/2e2e63f2-a4f5-444f-8293-89b5c8f1c037" />

## 👩‍💻 Developer

**Pranali Parteti**

B.E. Computer Science & Engineering Graduate
Interested in Full-Stack Development, Generative AI, and Software Engineering.

* GitHub: `Pranali-19`
* LinkedIn: `pranali-parteti-86727026b`

---

## ⭐ Project Highlights

> **Full-Stack Development + Generative AI + PostgreSQL + REST APIs + JWT Authentication**

This project demonstrates the ability to design, develop, integrate, debug, and deploy a practical full-stack application with AI-powered functionality.
