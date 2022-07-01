import React, { useContext } from 'react';
import './blogList.css';
import { useNavigate } from 'react-router-dom';
import blogContext from '../../context/blogContext';


export default function BlogList() {

    const { blogs, displayBlogId } = useContext(blogContext);
    const navigate = useNavigate();

    return (
        <>
            <ul className='blogListParent'>
                { blogs.length !== 0 &&
                    blogs.map((blog, index, blogs) => (
                        <li 
                            className='blogList' 
                            style={{ backgroundColor: `${ blog.color }`}} 
                            key={`blogListItem${blog.id}`} 
                            onClick={() => { displayBlogId(blog); navigate('/blogId') } } 
                        >
                            <p style={{ float: 'right', border: 'solid' }}>E</p>
                            <p className='fl blogTitle'>{ blog.title } :</p>
                            <p className='fl blogShortNote'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ blog.shortNote }</p>
                            <p className='fl blogItalic'>{ blogs[index].user.name }</p>
                            <img
                                src={ 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution.jpg' }
                                alt='i'
                                className='blogListImg'
                            />
                            <div className='timeSection'>
                                <div>
                                    <p>CreatedAt: { '2022-06-28' }</p>
                                </div>
                                <div>
                                    <p>EditedAt: { '2022-06-28' }</p>
                                </div>
                            </div>
                            <div className='ldSection'>
                                <div className='commentFlex' onClick={() => navigate('/comments') }>
                                    <i id='comment' class="fa-solid fa-message"></i>
                                    <p>comments</p>
                                </div>
                                <div className='commentFlex'>
                                    <i id='thumbsup' class="fa-regular fa-thumbs-up"></i>
                                    <p>{ blog.l }</p>
                                </div>
                                <div className='commentFlex'>
                                    <i id='thumbsdown' class="fa-regular fa-thumbs-down"></i>
                                    <p>{ blog.d }</p>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
