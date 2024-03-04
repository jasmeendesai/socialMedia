import { useQuery, useQueryClient } from '@tanstack/react-query';
import './rightbar.scss'
import { makeRequest } from '../../axios';
import User from "../../assets/user.png"
import { Link, useLocation } from 'react-router-dom';
import { useCustomMutation } from '../../customMutation';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import ChatOnline from '../chatOnline/ChatOnline';

function Rightbar() {

  const queryClient = useQueryClient();
  const {currentUser} = useContext(AuthContext)
  const [userId, setUserId] = useState("")
  const [relationData, setRelationData] = useState([])
  const location = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`/users`);
        return response.data.filter(user => user._id !== currentUser._id)

      } catch (error) {
        throw new Error("Failed to fetch user's data");
      }
    },
    onSuccess: (data) => {
      // Extract user IDs from the fetched data
      const userIds = data.map((user) => user._id);
      setRelationData(userIds);
    }
  });


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
    queryKey: ['relationship'], // Query key to invalidate on mutation success
  };

const { mutate: followMutation } = useCustomMutation(queryClient, mutationOptions);
const { mutate: unfollowMutation } = useCustomMutation(queryClient, mutationOptions);


const handleFollow = async (userId) => {
  try {
    await followMutation(() => makeRequest.post(`/relationships?followedUserId=${userId}&followerUserId=${currentUser._id}`));
    setRelationData((prevData) => [...prevData, userId]);
  } catch (error) {
    console.error("Failed to follow user:", error);
  }
};

const handleUnfollow = async (userId) => {
  try {
    await unfollowMutation(() => makeRequest.delete(`/relationships?followedUserId=${userId}&followerUserId=${currentUser._id}`));
    setRelationData((prevData) => prevData.filter((id) => id !== userId));
  } catch (error) {
    console.error("Failed to unfollow user:", error);
  }
};

  // Initial load or when userId changes
  useEffect(() => {
    if (userId !== "") {
      if (relationData.includes(userId)) {
        handleUnfollow(userId);
      } else {
        handleFollow(userId);
      }
      setUserId(""); // Reset userId after handling follow/unfollow
    }
  }, [userId, relationData]);


  return (
    <div className='rightbar'>
      <div className="container">
        {location.pathname !== "/messenger" &&
          <>
          <div className="item">
          <span>Suggestions For You</span>
          {error ? "Something went wrong!" : isLoading ? "Loading..." : data.map((user) => (
            
            <div className="user" key={user._id}>
              <Link
                to={`/profile/${user._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              ><div className="userInfo">
              <img src={user.profilePic ? `/upload/${user.profilePic}` : User} alt="user" />
              <span>{user.name}</span>
            </div>
            </Link>
            
            <div className="buttons">
            {relationData.includes(user._id) ? (
                  <button id='Unfollow' onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                ) : (
                  <button id='follow' onClick={() => handleFollow(user._id)}>Follow</button>
                )}
            </div>
          </div>
          ))}
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user" />
              <p>
                <span>Jane Doe</span>
                changed their cover picture
              </p>
              
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user" />
              <p>
                <span>Jane Doe</span>
                changed their cover picture
              </p>
              
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user" />
              <p>
                <span>Jane Doe</span>
                 changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="user" />
              <p>
                <span>Jane Doe</span>
                changed their cover picture
              </p>
              
            </div>
            <span>1 min ago</span>
          </div>
          
        </div>
        </>
        }

        <div className="item">
        <span>Online Friends</span>
        <ChatOnline/>
        </div>
      </div>
    </div>
  )
}

export default Rightbar
