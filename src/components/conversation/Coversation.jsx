import "./conversation.scss"
import User from "../../assets/user.png"

function Coversation({conversation, currentUser}) {

  const member = conversation.filter((m) => m._id!== currentUser._id)

  return (
    <div className="conversation">
      {member.map((m) => 
      <div key={m._id}>
      <img src={m.profilePic ? `/upload/${m.profilePic}` : User} alt="" className="conversationImg" />
      <span style={{fontWeight : "500", fontSize : "18px"}} className="conversationName">{m.name}</span>
      </div>
      )}
      
    </div>
  )
}

export default Coversation
