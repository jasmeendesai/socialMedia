import { Link, useNavigate } from 'react-router-dom'
import './register.scss'
import { useState } from 'react'
import axios from "axios"

function Register() {

  const [inputs, setInputs] = useState({
    username : "",
    email : "",
    password : "",
    name : "",
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=> ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async(e)=>{
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password || !inputs.name) {
      setErr("Please fill in all the details");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/auth/register", inputs)
      navigate("/login")
    } catch (err) {
      setErr(err.response.data)
    }
  }
  console.log(err)
  return (
    <div className='register'>
      <div className="card">
        <div className="left">
          <h1>Friend Fiesta!</h1>
          <p>
          Join the fiesta of friendships! Sign up for Friend Fiesta and start building connections.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
          
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder='Username' name='username' onChange={handleChange} />
            <input type="email" placeholder='Email' name='email' onChange={handleChange} />
            <input type="password" placeholder='Password' name='password' onChange={handleChange} />
            <input type="text" placeholder='Name' name='name' onChange={handleChange} />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
