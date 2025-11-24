const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/devdb';

let Note;
async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const noteSchema = new mongoose.Schema({ title: String, content: String }, { timestamps: true });
    Note = mongoose.model('Note', noteSchema);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.warn('MongoDB connection failed:', err.message);
    Note = null;
  }
}

connectDb();

app.get('/', (req, res) => {
  res.json({ name: 'demo-api', uptime: process.uptime() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: !!Note });
});

app.get('/notes', async (req, res) => {
  if (!Note) return res.status(503).json({ error: 'DB unavailable' });
  const notes = await Note.find().sort({ createdAt: -1 }).limit(100);
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  if (!Note) return res.status(503).json({ error: 'DB unavailable' });
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'title required' });
  const n = new Note({ title, content });
  await n.save();
  res.status(201).json(n);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
