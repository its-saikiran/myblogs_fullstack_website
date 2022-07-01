import React, { useContext, useState  } from 'react';
import './targetBlogDisplay.css';
import blogContext from '../../context/blogContext';
import { useNavigate } from 'react-router-dom';

export default function TargetBlog() {

    const { targetBlog, sendComment, sendError } = useContext(blogContext)
    const [inpComment, setInpComment] = useState('');
    const navigate = useNavigate();

    if(targetBlog.navigate){
        if(targetBlog.navigate.error){
            sendError(targetBlog.msg)
            navigate('/Error')
        }
    }

    const sendCommentFun = (e) => {
        e.preventDefault();
        sendComment({ msg: inpComment, user: targetBlog.user.name }, targetBlog.id)
    }

console.log(targetBlog)
  return (
    <>
        <div className='targetBlogDiv' style={{ backgroundColor: `${ targetBlog.color }`}} >
            <p className='cap' style={{ fontWeight: 'bold', fontSize: 'xx-large' }}>{ targetBlog.title } :</p>
            <p className='fl targetBlogDesc'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                { targetBlog.description }
            <i className='cap' style={{ float: 'right', fontWeight: 'bold', margin: '2vh 30vw', fontSize: 'x-large' }}>{ targetBlog.user.name }</i>
            </p>
        </div>
        <div className='targetBlogImgDiv' style={{ backgroundColor: `${ targetBlog.color }`}} >
            <img 
                className='targetBlogImg'
                src={ 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution.jpg' }
                alt='i'
            />
        </div>
        <div className='targetBlogDiv' style={{ backgroundColor: `${ targetBlog.color }`}} >
            <h1>Comments :</h1>
            <ul className='targerBlogCommentUl'>
                {
                    targetBlog.comments.length === 0 ? <li>No comments till yet.</li> :
                    targetBlog.comments.map((comment,index) => (
                        <li key={`comment${index}`}>{ JSON.parse(comment).msg }<i className='cap'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- { JSON.parse(comment).user }</i></li>
                    ))
                }
            </ul>
            <form onSubmit={sendCommentFun}>
                <input 
                    className='commentInp'
                    placeholder='comment here...'
                    onChange={(e) => setInpComment(e.target.value)}
                />
                <button className='commentBut'>comment</button>
            </form>
        </div>
    </>
  )
}
