import "./navbar.scss"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import User from '../../assets/user.png'

function Navbar() {

  const {toggle, darkMode} = useContext(DarkModeContext)
  const {currentUser, logout} = useContext(AuthContext)

  const [menuOpen, setMenuOpen] = useState(false)

  const [err, setErr] = useState(null);
  const navigate = useNavigate()

  const handleLogout = async (e)=>{
    e.preventDefault();
    try {
      await logout();
      navigate("/login")
      localStorage.removeItem("user")
    } catch (err) {
      setErr(err.response.data);
    }
  }

  return (
    <div className='navbar'>
      <div className="left">
        <Link to="/" style={{textDecoration : "none"}}>
          <span>lamasocial</span>
        </Link>
        <HomeOutlinedIcon/>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        {/* <PersonOutlinedIcon/> */}
        <EmailOutlinedIcon/>
        <NotificationsOutlinedIcon/>
        <div className="user" onClick={()=>{setMenuOpen(!menuOpen)}} >
          <img src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : User} alt="" />
          <span>{currentUser.name}</span>
          {menuOpen && 
          <div className="list">
            <div className="listItems">
              <span onClick={()=>{setMenuOpen(!menuOpen)}}>X</span>
            </div>
            <div className="listItems">
              <PersonOutlinedIcon/>
              <Link to={`/profile/${currentUser._id}`} style={{textDecoration : "none"}}>
                <span>Profile</span>
              </Link>
            </div>
            <div className="listItems">
              <LogoutIcon/>
              <span onClick={handleLogout} >Logout</span>
            </div>
            
              
            {/* <button onClick={handleLogout} >Logout</button> */}
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar
