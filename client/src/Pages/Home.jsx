import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Top */}
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect </span><br/>place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
        Everview Estate is the best place to find your next perfect place to live.
          <br/>
          We have wide range of properties for you to choose from
        </div>
        <Link className = 'text-xs sm:text-sm text-blue-800 font-bold hover:underline' to = '/search'>Let's start now</Link>
      </div>
      <div className='flex flex-col gap-6 py-7 px-3 max-w-6xl mx-auto'>
        <Link className = 'text-slate-700 font-semibold text-3xl' to = '/about'>Learn About Everview Estate</Link>
      </div>      
    </div>
  )
}
