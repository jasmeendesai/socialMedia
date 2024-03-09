import "./message.scss"
import moment from "moment";
import User from "../../assets/user.png"

function Message({message, own}) {

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={message.sender.profilePic ? `/upload/${message.sender.profilePic}` : User} alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{moment(message.createdAt).fromNow()}</div>
    </div>
  )
}

export default Message
