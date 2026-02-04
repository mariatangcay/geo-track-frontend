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

## 👤 User Seeder

The backend uses an in-memory user seeder for authentication testing. Use the following credentials to log in:

Seeded User:
- Email: test@example.com
- Password: password123

This user is automatically available when the API starts and is used to validate login credentials.


## ⚙️ Setup Instructions


