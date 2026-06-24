import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/LoginPage'
import HomePage from './pages/HomePage'
import EmailVerification from './pages/EmailVerification'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'

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
      </Routes>
      <Footer/>
    </div>
  )
}

export default App