const Post = require("../model/Posts")
// const User = require('../model/Users')
const Relation = require("../model/Relationships")

const addPost = async (req, res) =>{
    try {
        const {userId, desc, img} = req.body

        // user can post only from his account
        const loggedInUser = req.decodedToken

        console.log(userId)
        if(userId !== loggedInUser) return res.status(403).json("Not authorised to make posts")

        const savedPost = await Post.create({
            userId : userId,
            desc : desc,
            img : img
        })

        return res.status(201).json(savedPost)
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getPost = async (req, res) =>{
    try {
        // const userId = req.decodedToken

        const {userId} = req.params

        const post = await Post.find({userId : userId}).sort({createdAt : -1}).populate({
            path: 'userId',
            select: 'name profilePic',
        });

        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }  
}


const getAllPost = async (req, res) =>{
    try {
        const userId = req.decodedToken

        const relation = await Relation.find({followerUserId : userId}).distinct("followedUserId")

        const post = await Post.find({userId : {$in : [...relation, userId]}}).sort({createdAt : -1}).populate({
            path: 'userId',
            select: 'name profilePic',
        });
        return res.status(200).json(post)
    } catch (error) {
        return res.status(500).json(error)
    }  
}

const deletePost = async (req, res) =>{
    try {
        const {postId, userId} = req.query
        const loggedInUser = req.decodedToken

        if(userId !== loggedInUser) return res.status(403).json("Not authorised to make posts")

        await Post.findByIdAndDelete(postId)

        return res.status(200).json("Post has been deleted!")
    } catch (error) {
        return res.status(500).json(error)
    }  
}



module.exports = {addPost, getPost, getAllPost, deletePost}