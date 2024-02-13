const Like = require('../model/Likes')

const getLikes = async (req, res) => {
    try {
        const {postId} = req.query

        const like = await Like.find({likePostId : postId})

        const liked = like.map((id)=> id.likeUserId)

        return res.status(200).json(liked)

    } catch (error) {
        return res.status(500).json(error)
    }  
}

const addLikes = async (req, res) => {
    try {
        const {userId, postId} = req.query

        // user can like only from his account
        const loggedInUser = req.decodedToken

        if(userId !== loggedInUser) return res.status(403).json("Not authorised to like post")
            const savedLike = await Like.create({
            likeUserId : userId,
            likePostId : postId, 
            })

            return res.status(201).json(savedLike)
        // }
    } catch (error) {
        return res.status(500).json(error)
    }  
}

const deleteLikes = async (req, res) => {
    try {
        const {postId, userId} = req.query

        // // user can dislike only from his account
        const loggedInUser = req.decodedToken

        if(userId !== loggedInUser) return res.status(403).json("Not authorised to dislike post")

        await Like.findOneAndDelete({likePostId : postId})

        return res.status(200).json("disliked post!")

    } catch (error) {
        return res.status(500).json(error)
    }  
}

module.exports = {getLikes, addLikes, deleteLikes}