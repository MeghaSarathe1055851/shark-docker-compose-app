const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Static + view setup
app.use(express.static('public'));
app.set('view engine', 'ejs');

// MongoDB connection
mongoose.connect('mongodb://mongodb:27017/sharks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Shark = mongoose.model('Shark', { name: String });

// Insert your name
const createShark = async () => {
    const count = await Shark.countDocuments();
    if (count === 0) {
        await Shark.create({ name: "Megha Sarathe" });
    }
};

createShark();

// Route
app.get('/', async (req, res) => {
    const sharks = await Shark.find();
    res.render('index', { sharks });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
