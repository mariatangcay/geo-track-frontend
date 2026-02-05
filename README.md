# GeoTrack – IP Geolocation Web App

GeoTrack is a simple web application that allows users to track and view geolocation details of IP addresses.  
It features user authentication, protected routes, IP search history, and interactive map visualization.

---

## 🚀 Features

- 🔐 JWT-based Authentication (Login required)
- 🌍 View your own IP geolocation on login
- 🔎 Search geolocation details of any valid IPv4 address
- 🕘 Search history with:
  - Click-to-view previous searches
  - Multi-select delete using checkboxes
- 🗺️ Interactive map with location pin (Leaflet)
- 🚫 Protected API routes (Unauthorized users blocked)

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router
- Leaflet & React-Leaflet
- CSS

### Backend
- Node.js
- Express
- JWT (JSON Web Tokens)
- bcrypt
- Axios
- dotenv

---

## 🧪 Test Account

The backend uses an in-memory user seeder for authentication testing. Use the following credentials to log in:

- Email: test@example.com
- Password: password123

This user is automatically available when the API starts and is used to validate login credentials.
No registration is required; the same credentials work in all deployments.

---

## ⚙️ Setup Instructions

## 1. Clone the Repository

### Frontend
- git clone https://github.com/mariatangcay/geo-track-frontend.git
- cd geo-track-frontend   

### Backend
- git clone https://github.com/mariatangcay/geo-track-backend.git
- cd geo-track-backend

---

## 2. Install Dependencies

### Frontend
- cd frontend
- npm install


### Backend
- cd backend
- npm install

---

## 3. Environment Variables

### Frontend .env (at root of frontend project):
- VITE_API_URL=https://geo-track-backend.vercel.app

### Backend .env (at root of backend project):
- PORT=8000
- JWT_SECRET=supersecretkey

---

## 4. Run Locally

### Backend
- cd backend
- node api/index.js

### Frontend
- cd frontend
- npm run dev

- 🔹 Frontend will run on http://localhost:5173 (default Vite port).
- 🔹 Login with seeded user (test@example.com / password123) to test the app locally.

---

## 5. Deployment

The app is deployed serverless on Vercel:

### Backend:
https://geo-track-backend.vercel.app

### Frontend:
https://geo-track-frontend-zeta.vercel.app

- 🔹 Frontend automatically calls the backend API via the VITE_API_URL environment variable.
- 🔹 SPA routing is configured via vercel.json to prevent 404 on page refresh.

---

## 6. Usage

1. Open the frontend URL. https://geo-track-frontend-zeta.vercel.app
2. Log in with the seeded user credentials.
3. Your IP’s geolocation will display immediately.
4. Enter any valid IPv4 address to see its location and details.
5. Use the search history to quickly access previous searches.
6. Logout returns you to the login page.

---

## 7. Notes & Future Improvements

- Currently uses an in-memory user seeder; in production, replace with a database.
- Only IPv4 addresses are supported.
- Map and IP lookup rely on ipinfo.io. Free tier has rate limits.
- Future enhancements could include user registration, persistent storage, and better UI/UX.
