require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { MONGO_URI, PORT } = require('./config');
const urlRouter = require('./routes/url');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('URL Shortener Backend Running');
});

// Serve frontend build at /app
const distPath = path.join(__dirname, '../frontend/dist');
app.use('/app', express.static(distPath));
app.get('/app/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.use('/api', urlRouter);
app.use('/', urlRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});