import React, { useContext } from 'react'
import blogContext from '../../context/blogContext'
import './error.css'

export default function ErrorHandle() {

  const { error } = useContext(blogContext)

  return (
    <div className='Error'>
        {
          !error? 'Internal server error' : error 
        }
    </div>
  )
};
