import './profile.scss'
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/posts/Posts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import {useCustomMutation} from "../../customMutation"
import Update from '../../components/update/Update';
import User from '../../assets/user.png'
import NoCover from '../../assets/noCover.png'

function Profile() {

  const queryClient = useQueryClient();

  const userId = (useLocation().pathname.split("/")[2])
  const {currentUser} = useContext(AuthContext)

  const [openUpdate, setOpenUpdate] = useState(false)


  const { isLoading, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`/users/find/${userId}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch user's data");
      }
    }
  });

  const { isLoading: rIsLoading, data : relationData } = useQuery({
    queryKey: ["relationship"],
    queryFn: async () => {
      try {
        const response = await makeRequest.get(`/relationships?followedUserId=${userId}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch relationships");
      }
    }
  });

  console.log(relationData)

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


 // Custom hook to handle mutations
const { mutate } = useCustomMutation(queryClient, mutationOptions);


const handleFollow = async (e) => {
e.preventDefault();
if (relationData && relationData.includes(currentUser._id)) {
  await mutate(() => makeRequest.delete(`/relationships?followedUserId=${userId}&followerUserId=${currentUser._id}`));
} else {

  await mutate(() => makeRequest.post(`/relationships?followedUserId=${userId}&followerUserId=${currentUser._id}`));
}
};

  return (
    <div className='profile'>
      { isLoading ? "Loading..." :
      <>
      <div className="images">
        <img src={data.coverPic ? `/upload/${data.coverPic}` : NoCover} alt="" className='cover' />
        <img src={data.profilePic ? `/upload/${data.profilePic}` : User} alt="" className='profilePic' />
      </div>
      <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              {/* <a href="http://facebook.com"> */}
              <a href={data.facebook}>
                <FacebookTwoToneIcon fontSize='medium' />
              </a>
              {/* <a href="http://facebook.com"> */}
              <a href={data.Instagram}>
                <InstagramIcon fontSize='medium' />
              </a>
              {/* <a href="http://facebook.com"> */}
              <a href={data.Twitter}>
                <TwitterIcon fontSize='medium' />
              </a>
              {/* <a href="http://facebook.com"> */}
              <a href={data.LinkedIn}>
                <LinkedInIcon fontSize='medium' />
              </a>
              {/* <a href="http://facebook.com"> */}
              <a href={data.Printrest}>
                <PinterestIcon fontSize='medium' />
              </a>
            </div>
            <div className="center">
              <span>{data.name}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon fontSize='small'/>
                  <span>{data.city}</span>
                </div>
                <div className="item">
                  <LanguageIcon fontSize='small'/>
                  <span>{data.language}</span>
                </div>
              </div>
              {rIsLoading ? "Loading..." : userId === currentUser._id ? 
                (<button onClick={()=>setOpenUpdate(true)}>update</button>) : 
                (<button onClick={handleFollow}>
                  {relationData.includes(currentUser._id) ? "Following" : "Follow"}
                  </button>)}
            </div>
            <div className="right">
              <EmailOutlinedIcon/>
              <MoreVertIcon/>
            </div>
          </div>
          <Posts userId={userId}/>
      </div>
      </>}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  )
}

export default Profile
