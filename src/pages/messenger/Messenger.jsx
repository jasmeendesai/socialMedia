import { useContext, useEffect, useRef, useState } from "react"
import Message from "../../components/message/Message"
import "./messenger.scss"
import { ChatContext } from "../../context/chatContext"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { AuthContext } from "../../context/authContext"
import { useCustomMutation } from "../../customMutation"
import {io} from "socket.io-client"

function Messenger() {
  const queryClient = useQueryClient();

  const {currentChat, setOnlineUser} = useContext(ChatContext)

  const {currentUser} = useContext(AuthContext)
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()


  // socket.io connection
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    // get Message
    socket.current.on("getMessage", messageData => {

      setArrivalMessage({
        sender : {_id : messageData.senderId, profilePic : currentUser.profilePic},
        text : messageData.text,
        createdAt : Date.now()
      })
      
    })

     // Clean up WebSocket connection on component unmount
     return () => {
      socket.current.disconnect();
    };

  }, [])


  

  
  useEffect(() => {
    socket.current.emit("addUser", currentUser._id)
    socket.current.on("getUsers", users => {
      setOnlineUser(users)
    })
  }, [currentUser])
  


  // useEffect(() => {
  //   arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
  //   setNewMessage(prev => [...prev, arrivalMessage])
  // }, [arrivalMessage])


  const mutationOptions = {
    onSuccess: () => {
      console.log('Mutation succeeded');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    onSettled: (data, error, variables) => {
      console.log('Mutation completed');
    },
    queryKey: ['messages'], 
  };

  const { mutate } = useCustomMutation(queryClient, mutationOptions);


  const handleClick = async (e) => {
    e.preventDefault();

    const recieverId = currentChat?.members.find(member => member._id !== currentUser._id)

    // socket for sending Message
    socket.current.emit("sendMessage", {
      senderId : currentUser._id,
      recieverId : recieverId._id,
      text : newMessage
    })

    mutate(makeRequest.post.bind(null, '/messages'), { conversationId : currentChat?._id,
    sender : currentUser._id, text : newMessage});
    setNewMessage("")
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", currentChat?._id, arrivalMessage],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`messages/${currentChat?._id}`);
        return response.data;
        
      } catch (error) {
        throw new Error("Failed to fetch likes");
      }
    },
  });

  // relation data
  // const { data:rData } = useQuery({
  //   queryKey: ["messages", currentChat?._id, arrivalMessage],
  //   queryFn: async () => {
  //     try {
  //       const response = await makeRequest.get(`messages/${currentChat?._id}`);
  //       return response.data;
        
  //     } catch (error) {
  //       throw new Error("Failed to fetch likes");
  //     }
  //   },
  // });


  // socket
  //   useEffect(() => {
  //     console.log(data)
  //   // arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && 
  //   // setNewMessage(prev => [...prev, arrivalMessage])
  // }, [arrivalMessage])

  useEffect(() => {

    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [data])

  // useEffect(() => {
  //   // Scroll to the last message when data (messages) updates
  //   scrollRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  // }, [data]);
  

  return (
    <div className="messenger">
        {currentChat ? <div className="chatBoxTop" ref={scrollRef}>
          {error? "Something went wrong!" : isLoading ? "Loading..." : data.map((m) => 
            
            <Message message={m} own={m.sender._id === currentUser._id} key={m._id}/>
          )}
          

        </div> : <span className="chatSpanText">Open a conversation to start a chat</span>}
        <div className="chatBoxBottom">
          <input className="chatMessageInput" onChange={(e) => setNewMessage(e.target.value)} value={newMessage} placeholder="Write Something"/>
          <button className="chatSubmitButton" onClick={handleClick}>Send</button>
        </div>
    </div>
  )
}

export default Messenger
