import React, { useState, useEffect } from 'react'
import userContext from './userContext';
import axios from 'axios';

const UserState = ({children}) => {

    const [user, setUser] = useState();

    const fetchUser = async() => {
        const res = await axios.get(`/user/${'id'}`, {
            headers: {
                'Content-Type': 'application-json'
            }
        })
        setUser(res.data)
    }

    useEffect(() => {
        fetchUser()
    }, []);

  return (
    <userContext.Provider value={ user }>
        { children }
    </userContext.Provider>
  )
}

export default UserState;