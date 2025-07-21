import React from 'react'
import SignUpPage from './pages/Authentication/SignUpPage'
import LogInPage from './pages/Authentication/LogInPage.jsx'
import { Routes, Route } from 'react-router'
import toast from 'react-hot-toast'



const App = () => {

  

  return (
    <div>

      <Routes>

      <Route path="/" element={<LogInPage/>}></Route>
      
      <Route path="/signup" element={<SignUpPage/>}></Route>

      </Routes>

    </div>
  )
}

export default App
