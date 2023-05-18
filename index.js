const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const bodyParser = require('body-parser');
const list = require('./Schema/todolist');

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb+srv://Verman:Verman@cluster0.pvgwfhv.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/1', async (req,res) => {
    try{
        const entry = await list.find();
        res.json(entry);
    } catch(error){
        res.status(500).json({message:error.message});
    }
})

app.post('/', async (req,res) => {
    const entry = new list({
        name: req.body.taskValue
    })
    try{
        const savedData = await entry.save();
        //res.redirect('/');
        res.status(200).json(savedData);
        //res.redirect('/');
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

app.listen(7000, () => {
    console.log("hello");
})