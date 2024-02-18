const User = require('../model/Users')

const getUser = async (req, res) => {

    try {
        const {userId} = req.params
        const user = await User.findById(userId)

        const {password, ...info} = user._doc

        return res.status(200).json(info)
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

const getAllUser = async (req, res) => {

    try {
        const user = await User.find()

        const {password, ...info} = user._doc
        console.log(user)

        return res.status(200).json(info)
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

const updateUser = async (req, res) => {
    try {

        const {email, password, name, city, website, coverPic, profilePic, userId} = req.body;
        const update = {}
        if(email) update.email = email;
        if(password) update.password = password;
        if(name) update.name = name;
        if(city) update.city = city;
        if(website) update.website = website;
        if(coverPic) update.coverPic = coverPic;
        if(profilePic) update.profilePic = profilePic;

        await User.findByIdAndUpdate(userId, update, {new:true})
        // console.log(userInfo)
        return res.status(200).json("Updated!")
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

module.exports = {getUser, updateUser, getAllUser}