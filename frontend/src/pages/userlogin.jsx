import React , { useState } from 'react'
import { Link } from 'react-router-dom'

const userlogin = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [userData , setUserData] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({email:email , password:password});
    console.log(userData);
    setEmail("");
    setPassword("");
  }
  return (
  <div>
    <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt=""  className='w-[60px] h-[60px] object-contain  ml-4'/>
          
   <form className='p-7' onSubmit={(e)=>{submitHandler(e)}}  >
    <h3 className='text-xl mb-2'>What's your email?</h3>
    <input required type="email" value={email} onChange={(e) => {setEmail(e.target.value) }}  className='bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base ' placeholder="Email@eg.com" />
    <h3 className='text-xl mb-2'>Enter your password</h3>
    <input required type="password" value={password} onChange={(e) => {setPassword(e.target.value) }} className='bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base ' placeholder="Password" />
    <button className='bg-[#111] font-semibold mt-4 text-white rounded px-4 py-2  w-full text-lg placeholder:text-base '>Login</button>
   <p className='text-sm mt-1'>New here? <Link to="/usersignup" className='text-blue-500 '>Create an account</Link>  </p>
   </form>
   
    </div>
    <div className='mt-[-10px] flex justify-center ml-7 mr-7 '>
   <Link to="/captainlogin" className='bg-[#10b461]  font-semibold text-center  text-white rounded px-4 py-2  w-full text-lg placeholder:text-base '>Sign in as  Captain </Link>
    </div>
  </div>
  )
}

export default userlogin