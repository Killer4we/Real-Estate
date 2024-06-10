import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import About from './Pages/About'
import SignUp from './Pages/SignUp'
import Header from './Components/Header'
import Signin from './Pages/Signin'
import PrivateRoute from './Components/PrivateRoute'
export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element = {<Home/>}></Route>
        <Route element = {<PrivateRoute/>}>
          <Route path='/profile' element = {<Profile/>}></Route>
        </Route>
        <Route path='/about' element = {<About/>}></Route>
        <Route path='/sign-up' element = {<SignUp/>}></Route>
        <Route path='/sign-in' element = {<Signin/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
