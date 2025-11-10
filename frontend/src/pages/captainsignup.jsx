import React , { useState } from 'react'
import { Link } from 'react-router-dom'

const captainsignup = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [Firstname , setFirstname] = useState("");
  const [Lastname , setLastname] = useState("");
  const [userData , setUserData] = useState({});
  



  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({  fullname: { Firstname:Firstname , Lastname:Lastname},email:email , password:password});
    console.log(userData);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
  }
  return (
  <div>
    <div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt=""  className='w-[60px] h-[60px] object-contain  ml-4'/>
          
   <form className='p-7'  onSubmit={(e)=>{submitHandler(e)}} >
    <h3 className='text-xl mb-2'>What's your Name ?</h3>
  <div className='flex gap-4 mb-5'>
    <input required type="text" value={Firstname} onChange={(e) => {setFirstname(e.target.value) }} className='bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base ' placeholder="First name" />
    <input required type="text" value={Lastname} onChange={(e) => {setLastname(e.target.value) }} className='bg-[#eeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base ' placeholder="Last name"/>
  </div>
   <h3 className='text-xl mb-2'>What's your email?</h3>
    <input required type="email" value={email} onChange={(e) => {setEmail(e.target.value) }}  className='bg-[#eeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base ' placeholder="Email@eg.com" />
    <h3 className='text-xl mb-2'>Enter your password</h3>
    <input required type="password"   value={password} onChange={(e) => {setPassword(e.target.value) }} className='bg-[#eeee] rounded px-4 py-2 border mb-5 w-full text-lg placeholder:text-base ' placeholder="Password" />
    <button className='bg-[#111] font-semibold mt-4 text-white rounded px-4 py-2  w-full text-lg placeholder:text-base '>Login</button>
   <p className='text-sm mb-5 mt-1'>Already have a account? <Link to="/captainlogin" className='text-blue-500 '>Login here </Link>  </p>
   </form>
   
    </div>
    <div className='mt-[-10px] flex justify-center ml-7 mr-7 '>
   <p className='mt-[10vh]  text-[10px]' >By creating an account, you agree to the Terms and Conditions and Privacy Notice </p>
    </div>
  </div>
  )
}

export default captainsignup