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
        const user = await User.find().select({password : 0})

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

const updateUser = async (req, res) => {
    try {

        const {email, password, name, city, coverPic, profilePic, userId, facebook, Instagram, Twitter, LinkedIn, Printrest, language} = req.body;
        const update = {}
        if(email) update.email = email;
        if(password) update.password = password;
        if(name) update.name = name;
        if(city) update.city = city;
        if(facebook) update.facebook = facebook;
        if(Instagram) update.Instagram = Instagram;
        if(Twitter) update.Twitter = Twitter;
        if(LinkedIn) update.LinkedIn = LinkedIn;
        if(Printrest) update.Printrest = Printrest;
        if(coverPic) update.coverPic = coverPic;
        if(profilePic) update.profilePic = profilePic;
        if(language) update.language = language;

        await User.findByIdAndUpdate(userId, update, {new:true})
        // console.log(userInfo)
        return res.status(200).json("Updated!")
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

module.exports = {getUser, updateUser, getAllUser}