import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import {updateUserStart,updateUserFailure,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess,signOutUserFailure,signOutUserStart,signOutUserSuccess} from '../redux/user/userSlice'
import { useDispatch,useSelector } from 'react-redux';
export default function Profile() {
  const {currentUser,loading,error} = useSelector((state)=>state.user);
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const [showListingsError,setShowListingsError] = useState(false);
  const [userListings,setUserListings] = useState([]);
  const handleDeleteUser = async() =>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
        {
          method:'DELETE',
        });
        const data = await res.json();
        if(data.success===false){
          dispatch(deleteUserFailure(error.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  };
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body: JSON.stringify(formData),
          });
        const data = await res.json();
        if(data.success===false){
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleSignout = async()=>{
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success===false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };
  const showListings = async () =>{
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false){
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async(listingId)=>{
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`,{
      method:"DELETE",
    });
    const data = await res.json();
    if(data.success === false){
      console.log(data.message);
      return;
    }
    setUserListings((prev)=>prev.filter((listing)=>listing._id!==listingId));
  } catch (error) {
    console.log(error.message);
  }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <img className = 'mx-auto m-3 rounded-full object-cover mt-2 w-24 h-24 self-center' src = "https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt='profile-photo'/>
    <form onSubmit = {handleSubmit} className='flex flex-col gap-4'>
       <input className = 'border p-3 rounded-lg' type = "text" placeholder='Username' id='username' onChange={handleChange}/>
      <input className = 'border p-3 rounded-lg' type = "email" placeholder='Email' id='email' onChange={handleChange}/>
      <input className = 'border p-3 rounded-lg' type = "password" placeholder='Password' id='password' onChange={handleChange}/>
      <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:cursor-pointer hover:opacity-95 disabled:opacity-80'>{loading?'Loading':'Update'}</button>
      <Link className = 'bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to = '/create-listing'>Create Listing</Link>
    </form>
    <div className='flex justify-between mt-5'>
      <span onClick = {handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
      <span onClick = {handleSignout} className='text-green-700 cursor-pointer'>Sign Out</span>
    </div>
    <p className='text-red-700 mt-5'>{error?error:''}</p>
    <p className='text-green-700 mt-5'>{updateSuccess?'User Details Updated Successfully':''}</p>
    <button onClick = {showListings} className='text-green-700 w-full'>Show Listings</button>
    <p className='text-red-700 mt-5'>{showListingsError?'Error Showing Your Listings':''}</p>
    {userListings &&userListings.length > 0 && 
    <div className='flex flex-col gap-4'>
      <h1 className='text-center mt-7 text-2xl font-semibold'>Your Listings</h1>
    {userListings.map((listing)=>(
    <div key = {listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
      <Link to = {`/listing/${listing._id}`}>
        <img src={listing.imageUrls[0]} alt="listing image" className='h-16 w-16 object-contain'/>
      </Link>
      <Link className='flex-1 text-slate-700 font-semibold hover:underline truncate' to = {`/listing/${listing._id}`}>
        <p>{listing.name}</p>
      </Link>
      <div className='flex flex-col items-center'>
        <button onClick = {()=>handleListingDelete(listing._id)} className='uppercase text-red-700'>delete</button>
        <button className='uppercase text-green-700'>edit</button>
      </div>
    </div>
  ))}
  </div>}
    </div>
  );
}
