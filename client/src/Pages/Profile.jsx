import React from 'react'
import {useSelector} from 'react-redux';
export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form className='flex flex-col gap-4'>
      <img className = 'rounded-full object-cover mt-2 w-24 h-24 self-center' src = {currentUser.avatar} alt='profile-photo'/>
      <input className = 'border p-3 rounded-lg' type = "text" placeholder='Username' id='username'/>
      <input className = 'border p-3 rounded-lg' type = "text" placeholder='Email' id='email'/>
      <input className = 'border p-3 rounded-lg' type = "text" placeholder='Password' id='password'/>
      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:cursor-pointer hover:opacity-95 disabled:opacity-80'>Update</button>
    </form>
    <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer'>Delete Account</span>
      <span className='text-green-700 cursor-pointer'>Sign Out</span>
    </div>
    </div>
  )
}
