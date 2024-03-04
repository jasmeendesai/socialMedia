import { useState } from "react";
import "./update.scss"
import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "../../customMutation";
import { makeRequest } from "../../axios";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function Update({setOpenUpdate, user}) {
    const queryClient = useQueryClient();

    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);
    const [inputs, setInputs] = useState({
        email: user.email,
        password : user.password,
        name : user.name,
        city : user.city,
        facebook : user.facebook,
        Instagram : user.Instagram,
        Twitter : user.Twitter,
        LinkedIn : user.LinkedIn,
        Printrest : user.Printrest,
        language : user.language
      })


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
        queryKey: ['user'], // Query key to invalidate on mutation success
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

    const handleChange = e =>{
        setInputs(prev=> ({...prev, [e.target.name] : e.target.value}))
      }

      const handleClick = async (e) => {
        e.preventDefault();
        let coverUrl = cover ? await upload(cover) : user.coverPic;
        let profileUrl = profile ? await upload(profile) : user.profilePic;


        await mutate(makeRequest.put.bind(null, `/users`), { ...inputs, coverPic : coverUrl, profilePic : profileUrl, userId:user._id});
        setOpenUpdate(false)
        setCover(null)
        setProfile(null)
      };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
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
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Email</label>
          <input
            type="text"
            value={inputs.email}
            name="email"
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="text"
            value={inputs.password}
            name="password"
            onChange={handleChange}
          />
          <label>Name</label>
          <input
            type="text"
            value={inputs.name}
            name="name"
            onChange={handleChange}
          />
          <label>Country / City</label>
          <input
            type="text"
            name="city"
            value={inputs.city}
            onChange={handleChange}
          />
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            value={inputs.facebook}
            onChange={handleChange}
          />
          <label>Instagram</label>
          <input
            type="text"
            name="Instagram"
            value={inputs.Instagram}
            onChange={handleChange}
          />
          <label>Twitter</label>
          <input
            type="text"
            name="Twitter"
            value={inputs.Twitter}
            onChange={handleChange}
          />
          <label>LinkedIn</label>
          <input
            type="text"
            name="LinkedIn"
            value={inputs.LinkedIn}
            onChange={handleChange}
          />
          <label>Printrest</label>
          <input
            type="text"
            name="Printrest"
            value={inputs.Printrest}
            onChange={handleChange}
          />
          <label>Language</label>
          <input
            type="text"
            name="language"
            value={inputs.language}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
}

export default Update
