const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/urlShortner';
const PORT = process.env.PORT || 5000;

module.exports = { MONGO_URI, PORT }; 