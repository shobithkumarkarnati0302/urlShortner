const express = require('express');
const shortid = require('shortid');
const Url = require('../models/Url');

const router = express.Router();
const BASE_URL = process.env.BASE_URL || null;

// POST /api/shorten
router.post('/shorten', async (req, res) => {
  const { longUrl, customAlias, expiryDate } = req.body;
  let shortCode = customAlias || shortid.generate();

  // Check if custom alias already exists
  if (customAlias) {
    const existing = await Url.findOne({ shortCode: customAlias });
    if (existing) {
      return res.status(400).json({ error: 'Custom alias already in use' });
    }
  }

  // Check if shortCode already exists (for random)
  let url = await Url.findOne({ shortCode });
  if (url) {
    return res.status(400).json({ error: 'Short code already exists' });
  }

  url = new Url({
    shortCode,
    longUrl,
    expiryDate,
  });
  await url.save();

  // Prefer explicit BASE_URL; otherwise, derive from the incoming request
  const base = (BASE_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
  const shortUrl = `${base}/${shortCode}`;
  res.json({ shortUrl });
});

// GET /:shortCode
router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const url = await Url.findOne({ shortCode });
  if (!url) {
    return res.status(404).json({ error: 'Short URL not found' });
  }
  // Check expiry
  if (url.expiryDate && url.expiryDate < new Date()) {
    return res.status(410).json({ error: 'Short URL expired' });
  }
  url.clicks += 1;
  await url.save();
  res.redirect(url.longUrl);
});

module.exports = router; 