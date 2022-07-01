import './otp.css'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogContext from '../../context/blogContext';

export default function Otp() {

  const [user, setUser] = useState();
  const navigate = useNavigate();
  const { sendError } = useContext(blogContext)

  const verify = (e) => {
    e.preventDefault();
    // console.log(user)
    fetch('/user/otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
              sendError(data.msg)
              navigate('/Error')
              setTimeout(() => {
                navigate(`${data.navigate}`)
              }, 2000);
          }
    )
    .catch(err => {        
      sendError(err)
      navigate('/Error')
    })
  }

  return (
    <form className='otpForm' onSubmit={verify}>
        <p style={{ fontWeight: 'bold', marginBottom: '40px' }}>Verify your account?</p>
        <input
            className='otpInps'
            placeholder='Enter email here...' 
            type='email'
            required
            onChange={(e) => setUser((prev) => ({...prev, email: e.target.value}))}
        />
        <input 
            className='otpInps'
            type='text'
            placeholder='otp'
            minLength='6'
            maxLength='6'
            required
            onChange={(e) => setUser((prev) => ({...prev, otp: e.target.value}))}
        />
        <button className='otpBut'>submit</button>
    </form>
  )
}
