# URL Shortener (MERN Stack)

A full-stack URL Shortener application built with the MERN stack (MongoDB, Express.js, React, Node.js). Easily convert long URLs into short, shareable links with optional custom aliases, expiry, and click tracking. Modern UI with Tailwind CSS.

---

## Features
- **Shorten long URLs** to unique, shareable links
- **Custom alias** support (e.g., `sho.rt/myalias`)
- **Click tracking** for each short link
- **Redirection** to original URLs
- **Modern, responsive UI** (React + Tailwind CSS)

---

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB

---

## Getting Started

### Prerequisites
- Node.js & npm
- MongoDB (local or cloud, e.g., MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd urlshortner
```

### 2. Backend Setup
```bash
cd Backend
npm install
# Set your MongoDB URI in config.js or as MONGO_URI env variable
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## Usage
1. Open the frontend (usually at http://localhost:5173)
2. Enter a long URL and (optionally) a custom alias
3. Click "Shorten URL" to generate a short link
4. Share the short link (e.g., http://localhost:5000/abc123)
5. Anyone visiting the short link will be redirected to the original URL

---

## API Endpoints
- `POST /api/shorten` — Create a new short URL
- `GET /:shortCode` — Redirect to the original long URL

---

## MongoDB Schema Example
```js
{
  shortCode: String,      // e.g., "xYz123"
  longUrl: String,        // e.g., "https://www.example.com/page"
  createdAt: Date,
  clicks: Number,
  expiryDate: Date        // Optional
}
```


---

## License
MIT 
