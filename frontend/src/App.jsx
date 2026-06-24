import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/LoginPage'
import HomePage from './pages/HomePage'
import EmailVerification from './pages/EmailVerification'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/login" element={<Login />}/>
         <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </div>
  )
}

export default App