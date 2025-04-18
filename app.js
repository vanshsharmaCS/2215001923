const express= require('express');
const app=express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const User = require('./models.js');
const { Schema } = mongoose;



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error("Error connecting to MongoDB", err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/',(req,res)=>{
    res.send("HMM CONNECTION IS DONE");
});

// make route like /numbers/e give me 10 even numbers
app.get('/numbers/e', (req, res) => {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(i * 2);
    }
    res.json(numbers);
});

// make for prime numbers 10
app.get('/numbers/p', (req, res) => {
    const numbers = [];
    let count = 0;
    let num = 2;
    while (count < 10) {
        let isPrime = true;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            numbers.push(num);
            count++;
        }
        num++;
    }
    res.json(numbers);
});

// make for random numbers 10


app.get('/numbers/r', (req, res) => {
    const numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(Math.floor(Math.random() * 100));
    }
    res.json(numbers);
});
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



app.listen(3000);
