const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const cookieParser = require('cookie-parser')

// socket.io connection
const io = require('socket.io')(8900, {
  cors : {
    origin : "http://localhost:3000"
  }
})

let users = []

const addUser = (userId, socketId) => {
  !users.some(user => user.userId===userId) && users.push({userId, socketId})
}

const removeUser = (socketId) => {
  users = users?.filter(user => user.socketId !== socketId)
}

// getUser
const getUser = (userId) => {
  return users.find(user=> user.userId === userId)
}

io.on("connect", (socket)=> {
  // when user connected
  console.log("a user connected.")
  
  // take userId and socketId from user
  socket.on("addUser", userId=>{
    addUser(userId, socket.id)
    io.emit("getUsers", users)
  })

  // send and get messages
  socket.on("sendMessage", ({senderId, recieverId, text})=>{

    const user = getUser(recieverId);
    if(user){
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text
      })
    } else {
      console.log("Reciever not found")
    }
    
  })

  // when user disconnected
  socket.on("disconnect", ()=>{
    console.log("a user disconnected!")
    removeUser(socket.id)
    io.emit("getUsers", users)
  })
})

const authRoute = require('./route/auth')
const userRoute = require('./route/users')
const postRoute = require('./route/posts')
const storyRoute = require('./route/stories')
const likeRoute = require('./route/likes')
const commentRoute = require('./route/comments')
const conversationRoute = require('./route/conversations')
const messageRoute = require('./route/messages')
const relationRoute = require('./route/relationship')


require('dotenv').config()

const app = express()

const {PORT, MONGODB_STRING} = process.env

// middlewares
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({
    origin : "http://localhost:3000",
}))
app.use(cookieParser())


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single('file'), (req, res)=>{
    const file = req.file;
    res.status(200).json(file.filename)
})

mongoose.connect(MONGODB_STRING, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=> console.log("MongoDb is connected"))
.catch((err)=> console.log(err))

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/stories', storyRoute)
app.use('/api/likes', likeRoute)
app.use('/api/comments', commentRoute)
app.use('/api/conversations', conversationRoute)
app.use('/api/messages', messageRoute)
app.use('/api/relationships', relationRoute)

app.listen(PORT, ()=>{
    console.log(`App runing at port ${PORT}`)
})