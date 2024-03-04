import "./message.scss"

function Message({own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className="messageImg" />
        <p className="messageText">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita placeat, porro ullam accusamus </p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  )
}

export default Message
