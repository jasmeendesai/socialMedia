import './chatOnline.scss'

function ChatOnline() {
  return (
    <div className='chatOnline'>
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user" />
                <div className='chatOnlineBadge'/>
            </div>
            <span className="chatOnlineName">Jhon Doe</span>
        </div>       
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user" />
                <div className='chatOnlineBadge'/>
            </div>
            <span className="chatOnlineName">Jhon Doe</span>
        </div>       
        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img className='chatOnlineImg' src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user" />
                <div className='chatOnlineBadge'/>
            </div>
            <span className="chatOnlineName">Jhon Doe</span>
        </div>       
    </div>
  )
}

export default ChatOnline
