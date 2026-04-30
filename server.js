const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection (LOCAL)
mongoose.connect('mongodb://127.0.0.1:27017/feedbackDB')
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log(err));

// Schema
const FeedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    rating: Number,
    message: String
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

// POST API
app.post('/api/feedback', async (req, res) => {
    try {
        const data = new Feedback(req.body);
        await data.save();
        res.send("Saved ✅");
    } catch (err) {
        res.status(500).send(err);
    }
});

// GET API
app.get('/api/feedback', async (req, res) => {
    try {
        const data = await Feedback.find();
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server running on port 5000 ");
});
