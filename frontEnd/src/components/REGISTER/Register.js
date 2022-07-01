import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css'
import blogContext from '../../context/blogContext';

export default function Register() {

    const [user, setUser] = useState()
    const navigate = useNavigate();
    const { sendError } = useContext(blogContext)

    const register = (e) => {
        e.preventDefault()
        // console.log(user)
        fetch('user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
            setTimeout(() => {
                navigate('/')
            }, 2000);
        })
    }

  return (
        <form className='regForm' onSubmit={register}>
            <div className='regFormDiv'>
                <div className='flex'>
                    <label htmlFor='forName'>Name</label>
                    <p style={{ fontWeight: 'bold'}}>Already have an account?<span style={{ color: 'green', margin: ' 0 20px 0 10px' }} onClick={() => navigate('/login')}>Log in</span></p>
                </div>
                <input
                    className='regInps' 
                    id='forName'
                    placeholder=' Enter your full name here...'     
                    type='text'       
                    minLength='3'
                    maxLength='30'
                    required
                    onChange={(e) => setUser((prev) => ({...prev, name: e.target.value}))}
                />
            </div>
            <div className='regFormDiv'>
                <label htmlFor='forEmail'>Email</label>
                <input
                    className='regInps' 
                    id='forEmail'
                    placeholder=' Enter your email here...'
                    type='email'
                    required
                    onChange={(e) => setUser((prev) => ({...prev, email: e.target.value}))}
                />
            </div>
            <div className='regFormDiv'>
                <label htmlFor='forPas'>Password</label>
                <input
                    className='regInps'  
                    id='forPas'
                    placeholder=' password...'
                    type='password'
                    minLength='8'
                    required
                    onChange={(e) => setUser((prev) => ({...prev, password: e.target.value}))}
                />
            </div>
            <div className='regFormDiv'>
                <label htmlFor='forConf'>Confirm password</label>
                <input
                    className='regInps' 
                    id='forConf'
                    placeholder=' confirm password...'
                    type='password'
                    minLength='8'
                    required
                    onChange={(e) => setUser((prev) => ({...prev, confirmPassword: e.target.value}))}
                />
            </div>
            <div className='regFormDiv'>
                <label htmlFor='forNum'>Phone number</label>
                <input
                    className='regInps' 
                    id='forNum'
                    placeholder=' phone number...'
                    type='phonenumber'
                    minLength='10'
                    maxLength='10'
                    onChange={(e) => setUser((prev) => ({...prev, phoneNumber: e.target.value}))}
                />
            </div>
            <div className='regFormDiv'>
                <label htmlFor='forDob'>Date of birth</label>
                <input
                    className='regInps' 
                    id='forDob'
                    placeholder=' dob'
                    type='date'
                    onChange={(e) => setUser((prev) => ({...prev, dob: e.target.value}))}
                />
            </div>
            <div className='regFormDiv'>
                <label htmlFor='forBio'>Bio</label>
                <textarea
                    id='forBio'
                    placeholder=' Bio'           
                    type='textarea' 
                    maxLength={120}
                    rows={3}
                    onChange={(e) => setUser((prev) => ({...prev, bio: e.target.value}))}
                />
            </div>
            <button className='regBut'>submit</button>
        </form>
  )
}
    
