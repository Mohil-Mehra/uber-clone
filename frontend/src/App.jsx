import React from 'react'
import {Route, Routes} from 'react-router-dom'
import UserSignup from './pages/usersignup'
import UserLogin from './pages/userlogin'
import CaptainSignup from './pages/captainsignup'
import CaptainLogin from './pages/captainlogin'
import Home from './pages/home'

const App = () => {
  return (
    <div > <Routes>
                     <Route path='/usersignup' element={<UserSignup/>}/>
                     <Route path='/userlogin' element={<UserLogin/>}/>
                     <Route path='/captainsignup' element={<CaptainSignup/>}/>
                     <Route path='/captainlogin' element={<CaptainLogin/>}/>
                     <Route path='/' element={<Home/>}/>
       </Routes> </div>
  ) 
}

export default App