import React from 'react'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import Navbar from '../NAVBAR/Navbar';
import Home from '../HOME/Home';
import Register from '../REGISTER/Register';
import Otp from '../OTP/Otp';
import Login from '../LOGIN/Login';
import CreateBlog from '../CREATEBLOG/CreateBlog';
import BlogList from '../DISPLAYBLOGS/BlogList';
import TargetBlog from '../DISPLAYBLOGS/TargetBlog';
import About from '../ABOUT/About';
import ErrorHandle from '../ERROR/ErrorHandle';

export default function HandleRoute() {
  return (
    <>
        <Router>
            <Navbar />
            <Routes>
              <Route path='/' element={ <Home/> } />
              <Route path='/register' element={ document.cookie? <ErrorHandle /> : <Register /> } />
              <Route path='/otp' element={ <Otp /> } />
              <Route path='/login' element={ document.cookie? <ErrorHandle /> : <Login /> } />
              <Route path='/createBlog' element={ document.cookie? <CreateBlog /> : <Login />} />
              <Route path='/blogs' element={ <BlogList /> } />
              <Route path='/blogId' element={ <TargetBlog /> } />
              <Route path='/comments' element={ <TargetBlog /> } />
              <Route path='/about' element={ <About /> } />
              <Route path='*' element={ <ErrorHandle /> } />
            </Routes>
        </Router>
    </>
  )
}
