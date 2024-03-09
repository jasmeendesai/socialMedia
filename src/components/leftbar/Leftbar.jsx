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
import { ChatContext } from "../../context/chatContext"
import { useLocation } from "react-router-dom"
import Coversation from "../conversation/Coversation"
import { useQuery } from "@tanstack/react-query"
import { makeRequest } from "../../axios"


function Leftbar() {

  const {currentUser} = useContext(AuthContext)
  const {setCurrentChat} = useContext(ChatContext)
  const location = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations", currentUser._id],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`conversations/${currentUser._id}`);
        return response.data;
        
      } catch (error) {
        throw new Error("Failed to fetch likes");
      }
    },
  });

  
  return (
    <div className="leftbar">
      <div className="container">
        {location.pathname !== "/messenger" &&
        <>
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
        </> 
        }
        {location.pathname === "/messenger" && 
        <div className="menu">
          {/* <div className="item"> */}
            <input type="text" placeholder="Search for friends" className="chatMenuInput" />
            {error ? "Something went wrong!" : isLoading ? "Loading..." : data.map((c) =>

                <div onClick={()=> setCurrentChat(c)} key={c._id}>
                  <Coversation conversation={c.members} currentUser={currentUser} />
                </div>
          
            )}

          {/* </div> */}
        </div>
        }
      </div>
    </div>
  )
}

export default Leftbar
