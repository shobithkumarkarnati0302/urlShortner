const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
  {
    shortCode: { type: String, required: true, unique: true },
    longUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    clicks: { type: Number, default: 0 },
    expiryDate: { type: Date },
  },
  {
    // Use the exact collection name with a space as requested
    collection: 'URL Shortener',
  }
);

module.exports = mongoose.model('Url', urlSchema);