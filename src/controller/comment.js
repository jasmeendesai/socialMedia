const Comment = require("../model/Comments")


const getComments = async (req, res) =>{
    try {
        const postId = req.query.postId

        // const relation = await Relation.find({followerUserId : userId}).distinct("followedUserId")

        const comment = await Comment.find({postId : postId}).sort({createdAt : -1}).populate({
            path: 'userId',
            select: 'name profilePic',
        });
        return res.status(200).json(comment)

    } catch (error) {
        return res.status(500).json(error)
    }  
}

const addComments = async (req, res) =>{
    try {
        const {userId, desc, postId} = req.body

        // user can post only from his account
        const loggedInUser = req.decodedToken

        if(userId !== loggedInUser) return res.status(403).json("Not authorised to make Comments")

        const savedComment = await Comment.create({
            userId : userId,
            desc : desc,
            postId : postId
        })

        return res.status(201).json(savedComment)
    } catch (error) {
        return res.status(500).json(error)
    } 
}

module.exports = {getComments, addComments}