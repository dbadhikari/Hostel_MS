import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/LoginPage'
import HomePage from './pages/HomePage'
import EmailVerification from './pages/EmailVerification'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import Rooms from './pages/Rooms'
import Facilities from './pages/Facilities'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import AdminRooms from './pages/Admin/AdminRooms'

const App = () => {
  return (
    <div>
       <Navbar />
      <Routes>
         <Route path="/" element={<HomePage/>}/>
         <Route path="/register" element={<RegisterPage />}/>
         <Route path="/login" element={<Login />}/>
         <Route path="/verify-email" element={<EmailVerification />} />
         <Route path="/about" element={<AboutPage />}/>
         <Route path="/rooms" element={<Rooms />}/>
        <Route path="/facilities" element={<Facilities/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/contact" element={<Contact/>}/>

        <Route path="/admin/rooms" element={<AdminRooms />} />

      </Routes>
      <Footer/>
    </div>
  )
}

export default App