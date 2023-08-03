const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "username required"]
    },
    email: {
        type: String,
        require: [true, "email required"],
        unique: true,
        minlength: 3,
        maxlength: 100
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 200,
        require: true
    }
},
    {
        timestamps: true
    }
)
const userModel = mongoose.model('users', userSchema)
module.exports = userModel