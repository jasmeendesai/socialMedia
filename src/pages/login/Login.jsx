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
          <h1>Hello World.</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus vel error veniam reiciendis sed, ducimus nesciunt officiis temporibus facilis odio ad pariatur vitae excepturi ullam impedit? Sunt animi dolorum ut?
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
