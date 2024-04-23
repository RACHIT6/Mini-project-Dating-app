const mongoose = require('mongoose')

module.exports = mongoose.connect(
    "mongodb://localhost:27017/DatingApp"
).then(() => {
    console.log("database is connected")
}).catch((err) => {
    console.log(err)
})