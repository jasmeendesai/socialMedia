import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios";


function Posts({userId}) {


  const { isLoading, error, data } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      try {
        if(userId){
          const response = await makeRequest.get(`/posts/${userId}`);
          return response.data;
        } else{
          const response = await makeRequest.get("/posts");
          return response.data;
        }
      } catch (error) {
        throw new Error("Failed to fetch posts");
      }
    }
  });


  return (
    <div className="posts">
      {error ? "Someting went wrong!" : isLoading ? "Loading..." : data.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  )
}

export default Posts
