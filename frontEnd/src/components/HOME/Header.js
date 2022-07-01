import './header.css'

export default function Header() {
  return (
    <div className='headerSection'>
        <p className='headerTitle'>my blogs</p>
        <div className='headerIntro'>
            <img 
                src='https://i.natgeofe.com/n/394276c5-fed2-4558-8a65-1724a8121e9d/75-iconic-claustral-canyon-new-south-wales-australia.jpg?w=636&h=956'
                alt='img'
                className='headerImgs headerImgOne'
            />
            <img 
                src='https://i.pinimg.com/736x/c4/04/42/c4044213af736e7cbe528f5be2627844--colourful-birds-exotic-birds.jpg'
                alt='img'
                className='headerImgs headerImgTwo'
                />
            <img 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4l7BTxXiKJvMfsAOLm8iYADofClGuCT0svbHvZ6UWiObqVlSyKrZSNXmsujoULQZN7Tk&usqp=CAU'
                alt='img'
                className='headerImgs headerImgThree'
                />
            <img 
                src='https://dpwhatsapp.xyz/wp-content/uploads/2021/06/Baby-Groot-Profile-Images.jpg'
                alt='img'
                className='headerImgs headerImgFour'
            />
        </div>
    </div>
  )
} 