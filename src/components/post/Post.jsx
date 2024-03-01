import "./post.scss";
import { Link } from "react-router-dom";
import User from "../../assets/user.png"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

import {useCustomMutation} from "../../customMutation"


// function useCustomMutation(queryClient, mutationOptions) {
//   const mutate = async (mutationFn, variables) => {
//     try {
//       const response = await mutationFn(variables); 
//       mutationOptions.onSuccess?.(response.data, variables);
//       mutationOptions.onSettled?.(response.data, null, variables);
//       queryClient.invalidateQueries(mutationOptions.queryKey);
//     } catch (error) {
//       mutationOptions.onError?.(error);
//       mutationOptions.onSettled?.(undefined, error);
//     }
//   };

//   return { mutate };
// }


function Post({ post }) {
    const queryClient = useQueryClient();

    const [commentOpen, setCommentOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const {currentUser} = useContext(AuthContext)

    // console.log(post._id)
    const { isLoading, error, data } = useQuery({
      queryKey: ["likes", post._id],
      queryFn: async () => {
        try {
          const response = await makeRequest.get(`likes?postId=${post._id}`);
          return response.data;
          
        } catch (error) {
          throw new Error("Failed to fetch likes");
        }
      }
    });

    // ---------------------------------------------------------

    const {isLoading: cIsLoading, error: cError, data : commentData } = useQuery({
      queryKey: ["comments", post._id],
      queryFn: async () => {
        try {
          const response = await makeRequest.get(`/comments?postId=${post._id}`);
          return response.data;
        } catch (error) {
          throw new Error("Failed to fetch comments");
        }
      }
    });



    // ---------------------------------------------------------


    // console.log(data.includes(currentUser._id))
    const mutationOptions = {
      onSuccess: () => {
        console.log('Mutation succeeded');
      },
      onError: (error) => {
        console.error('Mutation error:', error);
      },
      onSettled: () => {
        console.log('Mutation completed');
        queryClient.invalidateQueries(["likes", post._id]);
    } // Query key to invalidate on mutation success
    };




   // Custom hook to handle mutations
const { mutate } = useCustomMutation(queryClient, mutationOptions);



const handleLike = async (e) => {
  e.preventDefault();
  if (data && data.includes(currentUser._id)) {
    await mutate(() => makeRequest.delete(`/likes?postId=${post._id}&userId=${currentUser._id}`));
  } else {
    console.log(currentUser._id)
    await mutate(() => makeRequest.post(`/likes?postId=${post._id}&userId=${currentUser._id}`));
  }
};

const handleDelete = async (e) =>{
  e.preventDefault();
  await mutate(() => makeRequest.delete(`/posts?postId=${post._id}&userId=${currentUser._id}`));
  queryClient.invalidateQueries("posts");
}


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={currentUser.profilePic ? `/upload/${post.userId.profilePic}` : User} alt="user" />
            <div className="details">
              <Link
                to={`/profile/${post.userId._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.userId.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon onClick={()=>{setMenuOpen(!menuOpen)}} />
          {menuOpen && post.userId._id === currentUser._id &&
            <button onClick={handleDelete} >delete</button>
          }
        </div>
        <div className="content">
          <p>{post.desc}</p>
          {post.img && <img src={`/upload/${post.img}`} alt="" />}
        </div>
        <div className="info">
            <div className="item">
                {isLoading ? "Loading..." : data.includes(currentUser._id) ? 
                // <FavoriteOutlinedIcon style={{color : "red"}} onClick={handleLike}/>
                <FavoriteIcon style={{color : 'red' }} onClick={handleLike}/>
                 : <FavoriteBorderOutlinedIcon onClick={handleLike}/>}
                {data && data.length>0 ? data.length : "0"} Likes
            </div>
            {/* <div className="item" onClick={()=> setCommentOpen(!commentOpen)}> */}
            <div className="item">
                <TextsmsOutlinedIcon onClick={()=> setCommentOpen(!commentOpen)}/>
                {commentData && commentData.length > 0 ? commentData.length : "0" } Comments
            </div>
            <div className="item">
                <ShareOutlinedIcon/>
                Share
            </div>
        </div>
        {/* {commentOpen && <Comments postId={post._id}/>} */}
        {commentOpen && <Comments postId={post._id} data={commentData} isLoading={cIsLoading} error={cError}/>}
      </div>
    </div>
  );
}

export default Post;
