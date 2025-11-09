import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className="w-full h-screen flex flex-col justify-between bg-cover  bg-[url('https://images.stockcake.com/public/a/5/3/a533e641-41ae-4200-a5ff-ff68d52703ba_large/green-light-glow-stockcake.jpg')]  ">
           <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt=""  className='w-[120px] h-[80px] object-contain  ml-4'/>
          
           <div className="p-6 bg-white rounded   flex flex-col">
            <h1 className='text-[25px] font-bold ml-[-20px] mt-[-20px]'>Get started with uber </h1>
            <Link to="/userlogin" className="bg-black rounded font-bold text-[20px] text-center text-white p-4 mt-2 mb-[-10px]">
              CONTINUE
            </Link>
           </div>

        </div>
    </div>
  )
}

export default Home