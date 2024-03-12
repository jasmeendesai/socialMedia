import { useQuery, useQueryClient } from '@tanstack/react-query';
import './rightbar.scss';
import { makeRequest } from '../../axios';
import User from "../../assets/user.png";
import { Link, useLocation } from 'react-router-dom';
import { useCustomMutation } from '../../customMutation';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import ChatOnline from '../chatOnline/ChatOnline';

function Rightbar() {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  
  const location = useLocation();

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get("/users");
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user's data");
      }
    }
  });

  const { isLoading: rIsLoading, data : relationData } = useQuery({
    // queryKey: ["relationship", userId],
    queryKey: ["relationships"],
    queryFn: async () => {
      try {
        // const response = await makeRequest.get(`/relationships?followedUserId=${userId}`);
        const response = await makeRequest.get("/relationships");
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch relationships");
      }
    }
  });

  const mutationOptions = {
    onSuccess: () => {
      console.log('Mutation succeeded');
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    onSettled: () => {
      console.log('Mutation completed');
    },
    queryKey: ['relationships'], // Query key to invalidate on mutation success
  };

  const { mutate } = useCustomMutation(queryClient, mutationOptions);

  const handleFollow = async (userId) => {
    setUserId(userId);

    try {
      if (relationData.some(rel => rel.followedUserId._id === userId && rel.followerUserId === currentUser._id)) {
        // Unfollow the user
        await mutate(() =>
          makeRequest.delete(`/relationships?followedUserId=${userId}&followerUserId=${currentUser._id}`)
        );

      } else {
        // Follow the user
        await mutate(() =>
          makeRequest.post(`/relationships?followedUserId=${userId}&followerUserId=${currentUser._id}`)
        );

      }
    } catch (error) {
      console.error("Failed to follow/unfollow user:", error);
    }
  };


  

  return (
    <div className='rightbar'>
      <div className="container">
        {location.pathname !== "/messenger" && (
          <>
          <div className="item">
            <span>Suggestions For You</span>
            {error ? "Something went wrong!" : isLoading ? "Loading..." : data.map((user) => 
              (user._id !== currentUser._id && (
                <div className="user" key={user._id}>
                  <Link
                    to={`/profile/${user._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div className="userInfo">
                      <img src={user.profilePic ? `/upload/${user.profilePic}` : User} alt="user" />
                      <span>{user.name}</span>
                    </div>
                  </Link>
                  <div className="buttons">

                    <button id={relationData?.some((u) => u.followerUserId === currentUser._id && u.followedUserId._id === user._id) ? "Unfollow" : "follow"} onClick={() => handleFollow(user._id)}>
                      {relationData?.some((u) => u.followerUserId === currentUser._id && u.followedUserId._id === user._id) ? "Unfollow" : "follow"}
                    </button>
                    
                  </div>
                </div>
              ))
            )}
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
        </div>
          </>
          
          
        )}

        <div className="item">
          <span>Online Friends</span>
          <ChatOnline/>
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
