const express = require('express');
const app = express();
const PORT = 4200;
const path = require('path');
const User = require('./models/credential.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( express.static( "./public" ) );
app.set('view engine', "ejs")
app.set('views', path.join(__dirname, './views'))

app.get ('/', (req, res)=>{
    res.redirect('/login');
})

app.get('/login', (req, res) => {
    res.render("login.ejs");
})

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password =  req.body.password;
    console.log(password)

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).send('Invalid credentials');
        }

        const isMatch = user.password == password;
        if (isMatch) {
            res.status(200).redirect('/home')
            // console.log('Login successful');
        } else {
            // return false;
            res.send('Invalid password');
        }
    } catch (error) {
        console.error('Error logging in:', error);
    }

    
    // try {
    //     let res = await login(email, password);
    //     console.log(res);
    //     // const check = await collection.findOne({ firstname: req.body.firstname })
    //     if (res) {
    //         res.redirect("/home")
    //     }
    //     else {
    //         res.send("wrong password")
    //     }

    //     // if (check.password === req.body.password) {
    //     // } else {
    //     //     res.send("wrong password")
    //     // }
    // } catch {
    //     res.send("Wrong details")
    // }
})

app.get('/signup', (req, res) => {
    res.render("signup.ejs");
})

app.post('/signup', async (req, res) => {
    const username = req.body.username; 
    const email = req.body.email;
    const password =  req.body.password;
    const firstName =  req.body.firstName;
    const lastName =  req.body.lastName;
    const age =  req.body.age;
    const gender =  req.body.gender;
    try {
        const user = new User({firstName:firstName, lastName: lastName, age: age, gender: gender, email: email, password: password, username: username });
        await user.save();
        console.log('User signed up successfully');
    } catch (error) {
        console.error('Error signing up:', error);
    }

    res.redirect('/home')
})

app.get('/home', (req, res)=>{
    res.render('home.ejs')
})

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

// async function signUp(email, password, name) {
//     try {
//         const user = new User({ email, password, name });
//         await user.save();
//         console.log('User signed up successfully');
//     } catch (error) {
//         console.error('Error signing up:', error);
//     }
// }

// async function login(email, password) {
//     try {
        
//         const user = await User.findOne({ email: email });
//         if (!user) {
//             console.log('User not found');
//             return false;
//         }

//         const isMatch = user.password == password;
//         if (isMatch) {
//             return true;
//             // console.log('Login successful');
//         } else {
//             return false;
//             // console.log('Invalid password');
//         }
//     } catch (error) {
//         console.error('Error logging in:', error);
//     }
// }

// Schema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };