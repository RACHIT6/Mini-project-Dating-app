const express = require('express');
const app = express();
const PORT = 4200;
const path = require('path');
const ejs = require('ejs');
const collection = require('./mongodb');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use( express.static( "../public" ) );
app.set('view engine', "ejs")
app.set('views', path.join(__dirname, '../views'))

app.get('/', (req, res) => {
    res.render("login");
})

app.get('/signup', (req, res) => {
    res.render("signup");
})

app.post('/signup', async (req, res) => {
    const data = {
        first_name: req.body.name, 
        second_name: req.body.name,
        password: req.body.password,
        age: req.body.age
    }
    await collection.insertMany([data])

    res.redirect('/home')
})

app.post('/login', async (req, res) => {

    try {
        const check = await collection.findOne({ first_name: req.body.first_name })

        if (check.password === req.body.password) {
            res.render("home")
        } else {
            res.send("wrong password")
        }
    } catch {
        res.send("Wrong details")
    }
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})