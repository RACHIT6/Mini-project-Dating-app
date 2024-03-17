const mongoose = require('mongoose')

mongoose.connect(
    "mongodb://localhost:27017/DatingApp"
).then(() => {
    console.log("database is connected")
}).catch((err) => {
    console.log(err)
})

const Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})


// Schema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };


// async function signUp(email, password, name) {
//     try {
//         const user = new User({ email, password, name });
//         await user.save();
//         console.log('User signed up successfully');
//     } catch (error) {
//         console.error('Error signing up:', error);
//     }
// }

// Login
// async function login(email, password) {
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('User not found');
//             return;
//         }

//         const isMatch = await user.comparePassword(password);
//         if (isMatch) {
//             console.log('Login successful');
//         } else {
//             console.log('Invalid password');
//         }
//     } catch (error) {
//         console.error('Error logging in:', error);
//     }
// }

const user = new mongoose.model("user", Schema)

module.exports = user;