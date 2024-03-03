import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import './App.css'
import Home from './pages/Home'
import NavbarComp from './components/Navbar'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Album from './pages/Album'
import Photo from './pages/Photo'
import Register from './pages/Register'
import UploadAlbum from './pages/UploadAlbum'
import UploadPhoto from './pages/UploadPhoto'
import EditPhoto from './pages/EditPhoto'
import EditAlbum from './pages/EditAlbum'

function App() {
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      const userId = decode.userId;
      if (userId) {
        setLogin(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isLogin === null) {
      if (
        window.location.pathname !== "/login" &&
        window.location.pathname !== "/register" &&
        window.location.pathname !== "/"
      ) {
        Swal.fire('Access requires authentication', 'Please log in', 'warning').then(() => {
          window.location.href = "/login";
        });
      }
    }
  }, [isLogin]);

  return (
    <>
    <NavbarComp />
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/album/:albumId' element={<Album />} />
      <Route path='/album/edit/:albumId' element={<EditAlbum />} />
      <Route path='/photo/:photoId' element={<Photo />} />
      <Route path='/photo/edit/:photoId' element={<EditPhoto />} />
      <Route path='/post/album' element={<UploadAlbum  />} />
      <Route path='/post/photo/:albumId' element={<UploadPhoto  />} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
