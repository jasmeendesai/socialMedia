import Login from "./pages/login/Login";
import './style.scss'
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Leftbar from './components/leftbar/Leftbar'
import Rightbar from './components/rightbar/Rightbar'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {

  const {currentUser} = useContext(AuthContext)

  const {darkMode} =useContext(DarkModeContext)

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar/>
          <div style={{display : "flex"}}>
            <Leftbar/>
            <div style={{ flex : 6}}>
              <Outlet/>
            </div>
            <Rightbar/>
          </div>
        </div>
      </QueryClientProvider>
      
    )
  }

  const ProtectedRoute = ({children}) =>{

    if(!currentUser._id || !currentUser.username || !currentUser.name || !currentUser.email || !currentUser) {
      return <Navigate to="/login"/>
    } else {
      return children
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>

          <Route path="/" element={
            <ProtectedRoute>
              <Layout/>
            </ProtectedRoute> }>
            <Route path="/" element={<Home/>} />
            <Route path="/profile/:id" element={<Profile/>} />
          </Route>

          {/* <Route element={<Layout />}>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          </Route> */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
    
      
    
  );
}

export default App;
