require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGO_URI, PORT } = require('./config');
const urlRouter = require('./routes/url');

const app = express();

// Trust reverse proxy (needed for correct req.protocol on Render/Heroku etc.)
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('URL Shortener Backend Running');
});

app.use('/api', urlRouter);
app.use('/', urlRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 