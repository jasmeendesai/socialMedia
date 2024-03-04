import Message from "../../components/message/Message"
import "./messenger.scss"

function Messenger() {
  return (
    <div className="messenger">
        <div className="chatBoxTop">
          <Message/>
          <Message own={true}/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
          <Message/>
        </div>
        <div className="chatBoxBottom">
          {/* <textarea className="chatMessageInput" placeholder="Write Something"></textarea> */}
          <input className="chatMessageInput" placeholder="Write Something"/>
          <button className="chatSubmitButton">Send</button>
        </div>
    </div>
  )
}

export default Messenger
