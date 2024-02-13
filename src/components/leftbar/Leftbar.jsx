import "./leftbar.scss"
import Friends from '../../assets/friend.png'
import User from '../../assets/user.png'
import Groups from '../../assets/groups.png'
import Market from '../../assets/market.png'
import Watch from '../../assets/watch.png'
import Memories from '../../assets/memories.png'
import Events from '../../assets/schedule.png'
import Gaming from '../../assets/gamepad.png'
import Gallery from '../../assets/image.png'
import Video from '../../assets/filming.png'
import Message from '../../assets/chat-box.png'
import Fundaraiser from '../../assets/marketing.png'
import Tutorials from '../../assets/tutorial.png'
import Courses from '../../assets/book.png'
import { useContext } from "react"
import { AuthContext } from "../../context/authContext"


function Leftbar() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className="leftbar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : User} alt="person" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="Friend"  />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Groups} alt="Group"  />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="Market"  />
            <span>Marketplace</span>
          </div>
          <div className="item">
            <img src={Watch} alt="Watch"  />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="Memories"  />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="Events"  />
            <span>Events</span>
          </div>
          <div className="item">
            <img src={Gaming} alt="Gaming"  />
            <span>Gaming</span>
          </div>
          <div className="item">
            <img src={Gallery} alt="Gallery"  />
            <span>Gallery</span>
          </div>
          <div className="item">
            <img src={Video} alt="Video"  />
            <span>Video</span>
          </div>
          <div className="item">
            <img src={Message} alt="Message"  />
            <span>Message</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fundaraiser} alt="Fundaraiser"  />
            <span>Fundaraiser</span>
          </div>
          <div className="item">
            <img src={Tutorials} alt="Tutorials"  />
            <span>Tutorials</span>
          </div>
          <div className="item">
            <img src={Courses} alt="Courses"  />
            <span>Courses</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leftbar
