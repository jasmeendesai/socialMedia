const Relation = require('../model/Relationships')


const getRelation = async (req, res) =>{
    try {
        const {followedUserId} = req.query

        if(!followedUserId) {
            const allData = await Relation.find().distinct("followerUserId");
            return res.status(200).json(allData)
        }
        const data = await Relation.find({followedUserId : followedUserId})

        const followed = data.map((id)=> id.followerUserId)


        return res.status(200).json(followed)
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

const addRelation = async (req, res) =>{
    try {

        const {followerUserId, followedUserId} = req.query
        
            await Relation.create({
                followerUserId : followerUserId,
                followedUserId : followedUserId
            })

            return res.status(201).json("Following")

    } catch (error) {
        return res.status(500).send(error)
    }

}


const deleteRelation = async (req, res) =>{
    try {
        const {followerUserId, followedUserId} = req.query

        const result = await Relation.findOneAndDelete({followedUserId : followedUserId, followerUserId : followerUserId})

        return res.status(200).json("Unfollowed!")
    } catch (error) {
        return res.status(500).send(error)
    }

}

module.exports = {getRelation, addRelation, deleteRelation}

