import "./share.scss"
import Image from "../../assets/image.png"
import User from "../../assets/user.png"
import Map from "../../assets/map.png"
import Friend from "../../assets/friend.png"
import { AuthContext } from "../../context/authContext"
import { useContext, useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { makeRequest } from "../../axios"
import {useCustomMutation} from "../../customMutation"

// Custom hook to handle mutations
// function useCustomMutation(queryClient, mutationOptions) {
//     const mutate = async (mutationFn, variables) => {
//       try {
//         const response = await mutationFn(variables);
//         mutationOptions.onSuccess?.(response.data, variables);
//         mutationOptions.onSettled?.(response.data, null, variables);
//         queryClient.invalidateQueries(mutationOptions.queryKey);
//       } catch (error) {
//         mutationOptions.onError?.(error);
//         mutationOptions.onSettled?.(undefined, error);
//       }
//     };
  
//     return { mutate };
//   }


function Share() {
    const queryClient = useQueryClient();

    const [file, setFile] = useState(null)
    const [desc, setDesc] = useState("");
    const { currentUser } = useContext(AuthContext)

    // console.log(currentUser._id)

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
        queryKey: ['posts'], // Query key to invalidate on mutation success
      };


     // Custom hook to handle mutations
  const { mutate } = useCustomMutation(queryClient, mutationOptions);

    const upload = async () =>{
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }





    // const mutation = useMutation(
    //     (newPost) => {
    //         return makeRequest.post("/posts", newPost);
    //     },
    //     {
    //         onSuccess : ()=>{
    //             // Invalidate and refresh
    //             queryClient.invalidateQueries(["posts"]);
    //         },
    //     }
    // );

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = '';
        if (file) imgUrl = await upload();
        mutate(makeRequest.post.bind(null, '/posts'), { desc, img: imgUrl, userId : currentUser._id });
        setDesc('');
        setFile(null);
      };
    // const handleClick = async (e) => {
    //     e.preventDefault();
    //     let imgUrl = "";
    //     if (file) imgUrl = await upload();
    //     mutation.mutate({ desc, img: imgUrl });
    //     setDesc("");
    //     setFile(null);
    // }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {/* <img src={"/upload/" + currentUser.profilePic} alt="" /> */}
            <img src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : User} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share


