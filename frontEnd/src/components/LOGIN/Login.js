import './login.css'
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import blogContext from '../../context/blogContext';

export default function Login() {

    const navigate = useNavigate();
    const [user, setUser] = useState();
    const { sendError } = useContext(blogContext)

    const login = (e) => {
        e.preventDefault();
        // console.log(user)
        fetch('/user/login', {
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
            })
            .catch(err => {
                sendError(err)
                navigate('/Error')
                setTimeout(() => {
                    navigate('/')
                }, 2000);
            })
    }

    return (
        <form className='logForm' onSubmit={login}>
            <p style={{ fontWeight: 'bold', marginBottom: '40px' }}>Don't have an account?<span style={{ color: 'green', marginLeft: '20px' }} onClick={() => navigate('/register')}>Register.</span></p>
            <input
                className='logInps'
                type='email'
                placeholder=' Enter email here..'
                required
                onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
            />
            <input
                className='logInps'
                type='password'
                placeholder=' Enter password here..'
                minLength='8'
                required
                onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
            />
            <button className='logBut'>submit</button>
        </form>
    )
}
