import { useContext, useState } from "react"
import "./stories.scss"
import { AuthContext } from "../../context/authContext"
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp'
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { makeRequest } from "../../axios"
import { useCustomMutation } from "../../customMutation"
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Stories() {
  const queryClient = useQueryClient();
    const {currentUser} = useContext(AuthContext)

    const [menuOpen, setMenuOpen] = useState(false)
    const [cover, setCover] = useState(null);

    const { isLoading, error, data } = useQuery({
      queryKey: ["stories"],
      queryFn: async () => {
        try {
          const response = await makeRequest.get(`/stories`);
            return response.data;
        } catch (error) {
          throw new Error("Failed to fetch stories");
        }
      }
    });

    console.log(data)

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
      queryKey: ['story'], // Query key to invalidate on mutation success
    };


   // Custom hook to handle mutations
const { mutate } = useCustomMutation(queryClient, mutationOptions);

    const upload = async (file) =>{
      try {
          const formData = new FormData();
          formData.append("file", file);
          const res = await makeRequest.post("/upload", formData);
          return res.data;
      } catch (err) {
          console.log(err)
      }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl = cover ? await upload(cover) : data.img;

    mutate(makeRequest.post.bind(null, `/stories`), { img : coverUrl, userId : currentUser._id});

    setCover(null)
    setMenuOpen(false)

  };

  const handleDelete = async (storyId) =>{
    try {
      await mutate(makeRequest.delete.bind(null, `/stories?storyId=${storyId}&userId=${currentUser._id}`));
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  }

  return (
    <div className="stories">
        <div className="story">
            <img src={`/upload/${currentUser.profilePic}`} alt="Story" />
            <span>{currentUser.name}</span>
            <AddCircleSharpIcon className="button" onClick={() =>setMenuOpen(!menuOpen)}/>
        </div>
        {menuOpen && (
          <div className="addStory">
            <div className="wrapper">
            <h1>Add Your Story</h1>
            <form>
              <div className="file">
            <label htmlFor="cover">
              <span>Image</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : `/upload/${currentUser.profilePic}`
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
          </div>
          <button onClick={handleClick}>Post</button>
            </form>
          <button className="close" onClick={()=>setMenuOpen(!menuOpen)}>Close</button> 
          </div>
          </div>
          
          
        )}
      { error ? "Something went wrong!" : isLoading ? "Loading" : data.map((story) => (
        <div className="story" key={story._id}>
            <img src={`/upload/${story.img}`} alt="Story" />
            <div className="delete" onClick={() =>handleDelete(story._id)}>
              <span>X</span>
            </div>
            <span>{story.userId.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories


