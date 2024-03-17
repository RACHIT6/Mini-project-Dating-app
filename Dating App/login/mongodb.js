const mongoose = require('mongoose')

mongoose.connect(
    "mongodb+srv://puneetag20:puneet2003@cluster0.2dfeuto.mongodb.net/DatingApp"
).then(() => {
    console.log("database is connected")
}).catch((err) => {
    console.log(err)
})

const LoginSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        unique: true
    },
    lname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

const collection = new mongoose.model("Collection1", LoginSchema)

module.exports = collection