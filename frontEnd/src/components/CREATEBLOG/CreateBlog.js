import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createBlog.css'

export default function CreateBlog() {

    const [blog, setBlog] = useState();
    const navigate = useNavigate();

    const createBlog = (e) => {
        e.preventDefault();
        // console.log(blog);
        fetch('/blog/addBlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.navigate) {
                    return navigate(data.navigate)
                }
                navigate('*')
            })
            .catch(err => console.log(err))
    }
    return (
        <form className='createForm' onSubmit={createBlog}>
            <div className='createFormDiv'>
                <label htmlFor='title'>Title:</label>
                <input
                    id='title'
                    maxLength='30'
                    required
                    onChange={(e) => setBlog((prev) => ({ ...prev, title: e.target.value }))}
                />
            </div>
            <div className='createFormDiv'>
                <label htmlFor='blogNote'>Short Note:</label>
                <textarea
                    id='blogNote'
                    maxLength='120'
                    onChange={(e) => setBlog((prev) => ({ ...prev, shortNote: e.target.value }))}
                />
            </div>
            <input
                id='chooseFile'
                type='file'
                accept='image/png, image/jpeg'
                onChange={(e) => setBlog((prev) => ({ ...prev, image: e.target.value }))}
            />
            <div className='createFormDiv'>
                <label htmlFor='blogDesc'>Desctiption:</label>
                <textarea
                    id='blogDesc'
                    maxLength='1500'
                    rows={9}
                    onChange={(e) => setBlog((prev) => ({ ...prev, description: e.target.value }))}
                />
            </div>
            <div className='templateColor'>
                <span>choose templeate color:</span>
                <input type='radio' name='color' value='#e1b382' onChange={(e) => setBlog((prev) => ({ ...prev, color: e.target.value }))} />
                <label>sandTan</label>
                <input type='radio' name='color' value='#8bf0ba' onChange={(e) => setBlog((prev) => ({ ...prev, color: e.target.value }))} />
                <label>Green</label>
                <input type='radio' name='color' value='#82716e' onChange={(e) => setBlog((prev) => ({ ...prev, color: e.target.value }))} />
                <label>Brown</label>
                <input type='radio' name='color' value='#39a0ca' onChange={(e) => setBlog((prev) => ({ ...prev, color: e.target.value }))} />
                <label>blueWater</label>
                <input type='radio' name='color' value='#ffde22' onChange={(e) => setBlog((prev) => ({ ...prev, color: e.target.value }))} />
                <label>Yellow</label>
                <input type='radio' name='color' value='#bccbde' onChange={(e) => setBlog((prev) => ({ ...prev, color: e.target.value }))} />
                <label>graySilver</label>
            </div>
            <button className='createBut'>Add blog</button>
        </form>
    )
}
