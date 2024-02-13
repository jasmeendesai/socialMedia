const User = require('../model/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const {SECRET_KEY} = process.env

const register = async(req, res)=>{
    try {
        const {username, email, password, name} = req.body

        // CHECK USER IF ALREADY EXIST
        const existedUser =  await User.findOne({username : username});
        if(existedUser) return res.status(400).send("User already exist")

        // CREATE NEW USER
            // HASH PASSWORD
            const salt = 10;
            const hashPassword = await bcrypt.hash(password, salt);

            const user = await User.create({
                username : username,
                email : email,
                password : hashPassword,
                name : name
            })

            // jwt 
            // const token = jwt.sign({ userId: user._id, exp: 7560606060 }, SECRET_KEY)

            // return res.status(201).json({user, token})
            return res.status(200).send("User is registered!")  
    } catch (error) {
        return res.status(500).send(error)
    }

}


const login = async(req, res)=>{

    try {
        // const {email, password} = req.body

        // CHECK USER IF ALREADY EXIST
        const user =  await User.findOne({username : req.body.username});
        if(!user) return res.status(404).send("User not found");

        // CHECK PASSWORD CORRECT
        const validPassword = await bcrypt.compare(req.body.password, user.password)

        if(!validPassword) return res.status(400).json("Wrong Password")

        // jwt 
        const token = jwt.sign({ userId: user._id, exp: 7560606060 }, SECRET_KEY)

        const {__v, createdAt, updatedAt, password, ...other} = user._doc
        
        return res.cookie("accessToken", token, {
            httpOnly : true,
        }).status(200).json(other)

    } catch (error) {
        return res.status(500).send(error)
    }
    

}


const logout = async(req, res)=>{
    try {
        res.clearCookie("accessToken", {
            secure : "true",
            sameSite : "none"
        }).status(200).json("User has been logged out!")
    } catch (error) {
        return res.status(500).send(error)
    }
}


module.exports = {login,register,logout}