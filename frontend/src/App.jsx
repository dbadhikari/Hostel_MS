import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/LoginPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />}/>
        '<Route path="/login" element={<Login />}/>
      </Routes>
    </div>
  )
}

export default App