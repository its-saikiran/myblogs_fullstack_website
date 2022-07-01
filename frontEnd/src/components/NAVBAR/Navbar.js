import './navbar.css'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate();

  return (
    <div className='topNavbar'>
        <div className='topLeft'>blog app</div>
        <div className='topCenter'>
            <ul className='topList'>
                <li className='topListItem' onClick={() => navigate('/')}>HOME</li>
                <li className='topListItem' onClick={() => navigate('/blogs')}>BLOGS</li>
                <li className='topListItem' onClick={() => navigate('/about')}>ABOUT</li>
                <li className='topListItem' onClick={() => navigate('/login')}>LOGIN</li>
                <li className='topListItem' onClick={() => navigate('/createBlog')}>CREATEBLOG</li>
            </ul>
        </div>
        <div className='topRightSearch'>
            <input
                className='topbarInp'
                placeholder=' search...'
            />
            <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className='topRightProfile'>
            <i class="fa-regular fa-user"></i>  
        </div>
    </div>
  )
}
