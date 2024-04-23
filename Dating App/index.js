const express = require('express');
const app = express();
const path = require('path');
const db = require("./db/dbConnect.js")
const User = require('./models/credential.js');
const userRoutes = require("./routes/userRoutes.js");
const session = require('express-session');
const bodyParser = require('body-parser');
const ejsMate = require("ejs-mate");

app.set('view engine', "ejs");
app.engine('ejs', ejsMate);
app.set("views", path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'mouse',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));


app.use(userRoutes);

const PORT = 4200;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

