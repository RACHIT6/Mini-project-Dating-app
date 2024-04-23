const express = require("express");
const router = express();
const User = require('../models/credential.js');
const bcrypt = require("bcrypt");

router.get ('/', (req, res)=>{
    res.redirect('/login');
})

router.get('/login', (req, res) => {
    res.render("pages/login.ejs");
})

router.post('/login', async (req, res) => {
    try {
        const check = await User.findOne({email: req.body.email});
        if (!check) {
            res.send("email cannot found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (isPasswordMatch) {
            req.session.user = { data: check };
            res.redirect('/home');
        }
        else {
            res.send("Wrong password");
        }
    }

    catch(err) {
        res.send("Wrong Details");
    }

})

router.get('/signup', (req, res) => {
    res.render("pages/signup.ejs");
})

router.post('/signup', async (req, res) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        password : req.body.password,
    }

    const checkExistingUser = await User.findOne({email: data.email});
    if (checkExistingUser) {
        res.send("Email already exits")
    }
    else {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRound);

        data.password  = hashedPassword;
        await User.insertMany(data);
        res.redirect('pages/home');
    }

})

router.get('/home', (req, res)=>{
    console.log(req.session.user.data.username);
    let data = req.session.user.data;
    res.render('pages/home2.ejs', {user: data});
})

router.get('/personalInfo', (req, res)=>{
    let data = req.session.user.data;
    res.render('pages/personalInfo.ejs', {user: data});
})

router.get('/personalInfo/memberShip', (req, res)=>{
    res.render('pages/membership.ejs');
})
router.get('/personalInfo/password', (req, res)=>{
    res.render('pages/password.ejs');
})

module.exports = router;