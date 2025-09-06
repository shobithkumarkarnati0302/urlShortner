# URL Shortener (MERN Stack)

A full-stack URL Shortener application built with the MERN stack (MongoDB, Express.js, React, Node.js). Easily convert long URLs into short, shareable links with optional custom aliases, expiry, and click tracking. Modern UI with Tailwind CSS, dark mode, and UI animations.

---

## Features
- **Shorten long URLs** to unique, shareable links
- **Custom alias** support (e.g., `sho.rt/myalias`)
- **Click tracking** for each short link
- **Redirection** to original URLs
- **Local history** saved in browser `localStorage` (copy/click later)
- **Dark mode toggle** with persisted preference
- **Tooltips & subtle animations** for a professional UX
- **Modern, responsive UI** (React + Tailwind CSS v4 + Vite)

---

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS v4, Heroicons
- **Backend:** Node.js, Express.js, Mongoose, dotenv
- **Database:** MongoDB (Atlas or local)

---

## Configuration & Environment
- `Backend/.env`
  - `MONGO_URI` — Mongo connection string (Atlas or local). Example: `mongodb+srv://.../URL_Shortener?...`
  - `PORT` — API port (default 5000)
- Frontend API base is `http://localhost:5000` in `src/App.jsx`. For production, switch to your deployed API base (consider a `VITE_API_BASE` env var).

## Deployment
- Deploy backend to [Render](https://render.com/), [Railway](https://railway.app/), [Heroku](https://heroku.com/), or your own server
- Deploy frontend to [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or similar
- Update backend base URL in the frontend for production

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

# Create a .env file in Backend/ (example)
cat > .env << 'EOF'
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<db-name>?retryWrites=true&w=majority
PORT=5000
EOF

# Start the API server (hot reload)
npm run dev
# or
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

Tailwind is already configured (Vite plugin + `tailwind.config.js` with `darkMode: 'class'`). The app applies your saved theme before mount to avoid flicker.

---

## Usage
1. Open the frontend (usually at http://localhost:5173)
2. Enter a long URL and (optionally) a custom alias
3. Click "Shorten URL" to generate a short link
4. Share the short link (e.g., http://localhost:5000/abc123)
5. Anyone visiting the short link will be redirected to the original URL
6. Your recently shortened links appear in the history panel (stored in `localStorage`)

---

## API Endpoints
- `POST /api/shorten` — Create a new short URL
  - Body `{ longUrl: string, customAlias?: string, expiryDate?: string }`
  - Response `{ shortUrl: string }`
- `GET /:shortCode` — Redirect to the original long URL
- (Optional) `GET /api/shorten` — List all links (admin)

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
