import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa';
import { Link,useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
export default function Header() {
  const {currentUser} = useSelector(state=>state.user);
  const [searchTerm,setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams =  new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(()=>{
    const urlParams= new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    }
  },[location.search]); 
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-400'>Stellar</span>
            <span className='text-slate-700'>Scribe</span>
        </h1>
        </Link>
        <form onSubmit = {handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
            <input value = {searchTerm} onChange = {(e)=>setSearchTerm(e.target.value)} type='text' placeholder='Search Something' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
            <button>
              <FaSearch className='text-slate-600'/>
            </button>
        </form>
        <ul className='flex gap-4 text-slate-700'>
            <Link to='/'><li className='hidden sm:inline hover:cursor-pointer'>Home</li></Link>
            <Link to='/about'><li className='hidden sm:inline hover:cursor-pointer'>About</li></Link>
            <Link to='/profile'>
            {currentUser?(
              <li className='hover:cursor-pointer'>Profile</li>
              ) : (
              <li className='hover:cursor-pointer'>Sign In</li>
              )}
            </Link>
        </ul>
        </div>
    </header>
  )
}
