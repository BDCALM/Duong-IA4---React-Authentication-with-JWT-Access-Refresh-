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
- [Supabase]

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

SUPABASE_URL=

SUPABASE_KEY=
#for access token and refresh token
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_LIFE=15s 
REFRESH_TOKEN_LIFE=7d
```

### 3. Front end setup

#### Create .env file
VITE_API_URL= 

```bash
cd frontend
npm install
npm run dev
```



