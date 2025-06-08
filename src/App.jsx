import { BrowserRouter, Route, Routes } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Register from "./pages/Register"
import { ToastContainer } from "react-toastify"
import Login from "./pages/Login"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home"
import Profil from "./pages/Profil"
import HomeMain from "./pages/HomeMain"
import 'bootstrap-icons/font/bootstrap-icons.css'
import UserProfil from "./pages/UserProfile"
import FollowPost from "./pages/FollowPost"
import Follows from './pages/Folows'

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<MainLayout />}>
              <Route path="/home" element={<Home />}>
                <Route index element={<HomeMain/>}/>
                <Route path="/home/profil" element={<Profil />}>
                  <Route path="/home/profil/follows-user" element={<Follows/>} />
                </Route>
                <Route path="/home/user-profile/:id" element={<UserProfil />} />
                <Route path="/home/follow" element={<FollowPost />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
