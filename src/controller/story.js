const Story = require("../model/Stories")
const Relationship = require("../model/Relationships");


const getStories = async (req, res) => {

    try {
        const userId = req.decodedToken

        const relation = await Relationship.find({followerUserId : userId}).distinct("followedUserId")
            
        const story = await Story.find({userId : {$in : [...relation, userId]}}).sort({createdAt : -1}).limit(4).populate({
            path: 'userId',
            select: 'name',
        });
        return res.status(200).json(story)
    } catch (error) {
        return res.status(500).json(error) 
    }
}

const addStories = async (req, res) => {

    try {
        const {img, userId} = req.body

        const savedStory = await Story.create({
            userId : userId,
            img : img
        })
        return res.status(200).json(savedStory)
    } catch (error) {
        return res.status(500).json(error) 
    }
}
const deleteStories = async (req, res) => {
    try {
        const {storyId, userId} = req.query
        const loggedInUser = req.decodedToken

        if(userId !== loggedInUser) return res.status(403).json("Not authorised to delete story")

        await Story.findByIdAndDelete(storyId)
        return res.status(200).json("Story deleted!")

    } catch (error) {
        return res.status(500).json(error) 
    }
}

module.exports = {getStories, addStories, deleteStories}