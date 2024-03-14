import { Link, useNavigate } from 'react-router-dom'
import './login.scss'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'

function Login() {

  const {login} = useContext(AuthContext)

  const [inputs, setInputs] = useState({
    username : "",
    password : ""
  })

  const [err, setErr] = useState(null)

  const navigate = useNavigate()

  const handleChange = e =>{
    setInputs(prev=> ({...prev, [e.target.name] : e.target.value}))
  }

  const handleClick = async (e)=>{
    e.preventDefault()
    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      setErr(err.response.data)
    }
  }

  return (
    <div className='login'>
      <div className="card">
        <div className="left">
          <h1>Hello World!</h1>
          <p>
          Log in to Friend Fiesta and dive back into the vibrant community of friendships waiting for you.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
          
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
            <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
            {err && err}
            <button onClick={handleClick}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
