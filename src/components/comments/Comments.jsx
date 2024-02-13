import { useContext, useState } from "react";
import "./comments.scss"
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import {useCustomMutation} from "../../customMutation"
import User from "../../assets/user.png"

// Custom hook to handle mutations
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

function Comments({postId}) {
    const queryClient = useQueryClient();

    const {currentUser} = useContext(AuthContext) 
    const [desc, setDesc] = useState("")

    const { isLoading, error, data } = useQuery({
      queryKey: ["comments"],
      queryFn: async () => {
        try {
          const response = await makeRequest.get(`/comments?postId=${postId}`);
          return response.data;
        } catch (error) {
          throw new Error("Failed to fetch comments");
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
      onSettled: (data, error, variables) => {
        console.log('Mutation completed');
      },
      queryKey: ['comments'], // Query key to invalidate on mutation success
    };


   // Custom hook to handle mutations
const { mutate } = useCustomMutation(queryClient, mutationOptions);

const handleClick = async (e) => {
  e.preventDefault();

  mutate(makeRequest.post.bind(null, '/comments'), { desc, postId, userId : currentUser._id });
  setDesc('');
};

  return (
    <div className="comments">
        <div className="write">
            <img src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : User} alt="" />
            <input type="text" value={desc} placeholder="write a comment" onChange={e=> setDesc(e.target.value)} />
            <button onClick={handleClick} >Send</button>
        </div>
      {error ? "Something went wrong!" : isLoading ? "Loading..." : data.map((comment)=>(
        <div className="comment" key={comment._id}>
            <img src={comment.userId.profilePic ? `/upload/${comment.userId.profilePic}` : User} alt="" />
            <div className="info">
                <span>{comment.userId.name}</span>
                <p>{comment.desc}</p>
            </div>
            <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  )
}

export default Comments
