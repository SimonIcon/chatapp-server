const userModel = require("../models/UsersModels");
const validator = require("validator")
const bcrypt = require('bcrypt')
const createToken = require("../utils/userToken")


const registerUsers = async (req, res) => {
    try {
        // get user data
        const { name, email, password } = req.body;
        // checking if user exist
        const userExist = await userModel.findOne({ email })
        if (userExist) {
            res.status(400).json({ message: "user already exist" })
        } else {
            // user validation
            if (!name || !email || !password) {
                res.status(400).json({ message: "all user credentials required" })
            } else if (!validator.isEmail(email)) {
                res.status(400).json({ message: "invalid email" })
            } else {
                // creating user with encrypted password
                let user = new userModel({ name, email, password })
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(user.password, salt)
                user.save()
                // generating user token
                const token = createToken(user._id)
                // sending data to the user
                res.status(200).json({ id: user._id, email, name, token })
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }


}

// login users
const loginUser = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userModel.findOne({ email })
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if (!user) {
            res.status(400).json({ message: "invalid email or password" })
        } else if (!isCorrectPassword) {
            res.status(400).json({ message: "invalid email or password" })
        } else {
            // generating user token
            const token = createToken(user._id)
            // sending data to the user
            res.status(200).json({ id: user._id, email, "name": user.name, token, message: "succesfully login" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

// find user by id
const findUserById = async (req, res) => {
    const userId = req.params.userId
    try {
        const user = await userModel.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}

// getting all users
const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}


module.exports = { registerUsers, loginUser, findUserById, getUsers }