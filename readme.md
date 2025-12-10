# React Authentication with JWT (Access + Refresh Token)

This project is a Single Page Application (SPA) built with React and Node.js that demonstrates a secure authentication flow using **JSON Web Tokens (JWT)**. It implements the "Access Token in Memory, Refresh Token in LocalStorage" pattern to ensure security and seamless user experience.

## Features

- **User Authentication:** Register and Login using Email/Password.
- **Secure Token Storage:** - Access Token is stored in React State (Memory).
  - Refresh Token is stored in `localStorage` (persisted).
- **Silent Refresh:** Axios Interceptors automatically refresh the Access Token when it expires (401 Unauthorized) without logging the user out.
- **Protected Routes:** Restrict access to specific pages (Dashboard) for authenticated users only.
- **Persistence:** Keeps the user logged in upon page reload (`F5`) using the Refresh Token.

## Tech Stack

- **Frontend:** React (Vite), React Router DOM, React Query, React Hook Form, Axios.
- **Backend:** Node.js, Express, JSON Web Token (jsonwebtoken).
- **Database:** MongoDB (implied).

---

## Setup & Installation

### 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 2. Backend Setup
Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
node server.js  // to run backend
```
#### Create a .env file
```bash
 File: .env 
PORT=3000 

SUPABASE_URL=https://zatjdwsymnwgbauayyxl.supabase.co

SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphdGpkd3N5bW53Z2JhdWF5eXhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDY4OTYyMCwiZXhwIjoyMDgwMjY1NjIwfQ.0lDLgsTFUsPUpi3zIaPo26dDzT2sXogWduwLprgiyAE
#for access token and refresh token
ACCESS_TOKEN_SECRET=chuoi_bi_mat_access
REFRESH_TOKEN_SECRET=chuoi_bi_mat_refresh
ACCESS_TOKEN_LIFE=15s 
REFRESH_TOKEN_LIFE=7d
```

### 3. Front end setup

#### Create .env file
VITE_API_URL= https://duong-ia4-react-authentication-with-jwt.onrender.com

```bash
cd frontend
npm install
npm run dev
```



