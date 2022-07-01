import React, { useEffect, useState } from 'react'
import axios from 'axios'
import blogContext from './blogContext'

const BlogState = ({children}) => {

  // DISPLAY BLOGS COMPONENT...
    const [blogs, setBlogs] = useState([])
    const fetchBlogs = async() => {
        const res = await axios.get("/blog/allBlogs", {
            headers:{
                "Content-Type":"application/json"
            }
        })
        setBlogs(res.data)
    }

    useEffect(()=>{
        fetchBlogs()
    },[])


  // TARGET BLOG COMPONENT...
    const [targetBlog, setTargetBlog] = useState({})
    const displayBlogId = (blog) => {
      setTargetBlog(blog)
    }


  // SEND COMMENT...
   const sendComment = async(comments, id) => {
    try {
      const res = await axios.patch(`/blog/update/${id}`, { query: 'comments', ...comments }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setTargetBlog(res.data)
    } catch (error) {
      setTargetBlog({ msg: error, navigate: '/Error' })
    }
   }


  // FOR ERRORS
  const [error, setError] = useState('')
   const sendError = (msg) => {
        setError(msg)
   }



  // MY ALL PROVIDERS...
    const providers = {
      blogs,
      displayBlogId,
      targetBlog,
      sendComment,
      error,
      sendError,
    }
    

  return (
    <blogContext.Provider value={ providers }>
        {children}
    </blogContext.Provider>
  )
}

export default BlogState;





// --------------------------------------------------------


// blogs.......
  // const blogs = [
  //   {
  //     title: 'Ironman',
  //     shortNote: 'Iron Man is a fictional superhero who wears a suit of armor. His alter ego is Tony Stark. He is also one of the main protagonists in the Marvel Cinematic Universe.',
  //     bloggerName: 'Tonystark',
  //     image: 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution-758x505.jpg',
  //     createdAt: '01-05-2020',
  //     updatedAt: '20-07-2020',
  //     l: 201,
  //     d: 400,
  //     bloggerId: 1,
  //     color: 'green',
  //   },
  //   {
  //     title: 'Ironman',
  //     shortNote: 'Iron Man is a fictional superhero who wears a suit of armor. His alter ego is Tony Stark. He is also one of the main protagonists in the Marvel Cinematic Universe.',
  //     bloggerName: 'Tonystark',
  //     image: 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution-758x505.jpg',
  //     createdAt: '01-05-2020',
  //     updatedAt: '20-07-2020',
  //     l: 201,
  //     d: 400,
  //     bloggerId: 1,
  //     color: 'orange',
  //   },
  //   {
  //     title: 'Ironman',
  //     shortNote: 'Iron Man is a fictional superhero who wears a suit of armor. His alter ego is Tony Stark. He is also one of the main protagonists in the Marvel Cinematic Universe.',
  //     bloggerName: 'Tonystark',
  //     image: 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution-758x505.jpg',
  //     createdAt: '01-05-2020',
  //     updatedAt: '20-07-2020',
  //     l: 201,
  //     d: 400,
  //     bloggerId: 1,
  //     color: 'aqua',
  //   },
  //   {
  //     title: 'Ironman',
  //     shortNote: 'Iron Man is a fictional superhero who wears a suit of armor. His alter ego is Tony Stark. He is also one of the main protagonists in the Marvel Cinematic Universe.',
  //     bloggerName: 'Tonystark',
  //     image: 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution-758x505.jpg',
  //     createdAt: '01-05-2020',
  //     updatedAt: '20-07-2020',
  //     l: 201,
  //     d: 400,
  //     bloggerId: 1,
  //     color: 'yellow',
  //   },
  //   {
  //     title: 'Ironman',
  //     shortNote: 'Iron Man is a fictional superhero who wears a suit of armor. His alter ego is Tony Stark. He is also one of the main protagonists in the Marvel Cinematic Universe.',
  //     bloggerName: 'Tonystark',
  //     image: 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution-758x505.jpg',
  //     createdAt: '01-05-2020',
  //     updatedAt: '20-07-2020',
  //     l: 201,
  //     d: 400,
  //     bloggerId: 1,
  //     color: 'blue',
  //   },
  //   {
  //     title: 'Ironman',
  //     shortNote: 'Iron Man is a fictional superhero who wears a suit of armor. His alter ego is Tony Stark. He is also one of the main protagonists in the Marvel Cinematic Universe.',
  //     bloggerName: 'Tonystark',
  //     image: 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution-758x505.jpg',
  //     createdAt: '01-05-2020',
  //     updatedAt: '20-07-2020',
  //     l: 201,
  //     d: 400,
  //     bloggerId: 1,
  //     color: 'green',
  //   },
  //   {
  //     title: 'Ironman',
  //     shortNote: 'Iron Man is a fictional superhero who wears a suit of armor. His alter ego is Tony Stark. He is also one of the main protagonists in the Marvel Cinematic Universe.',
  //     bloggerName: 'Tonystark',
  //     image: 'https://fandomwire.com/wp-content/uploads/2021/08/tony-stark-evolution-758x505.jpg',
  //     createdAt: '01-05-2020',
  //     updatedAt: '20-07-2020',
  //     l: 201,
  //     d: 400,
  //     bloggerId: 1,
  //     color: 'red',
  //   },
  // ]


  // comments.......

// const comments = [
//   {
//     bloggerId: 1,
//     title: 'Ironman',
//     blogDescription: `Anthony Edward Stark, more commonly known as Tony Stark, is a fictional character primarily 
//                 portrayed by Robert Downey Jr. in the Marvel Cinematic Universe (MCU) media franchise—based 
//                 on the Marvel Comics character of the same name—commonly known by his alias, Iron Man. Stark 
//                 is initially depicted as an industrialist, genius inventor, and playboy who is CEO of Stark 
//                 Industries. Initially the chief weapons manufacturer for the U.S. military, he has a change 
//                 of heart and redirects his technical knowledge into the creation of mechanized suits of armor 
//                 which he uses to defend against those that would threaten peace around the world. He becomes 
//                 a founding member and leader of the Avengers. Following his failed Ultron Program, the internal 
//                 conflict within the Avengers due to the Sokovia Accords, and Thanos successfully erasing half 
//                 of all life in the Blip, Stark retires, marries Pepper Potts, and they have a daughter named 
//                 Morgan. However, Stark rejoins the Avengers on a final mission to undo Thanos' actions. He 
//                 creates time travel, and the Avengers successfully restore trillions of lives across the 
//                 universe. However, Stark inevitably sacrifices his life to defeat Thanos and his army. Stark 
//                 chooses Peter Parker as a successor.`,
//     bloggerName: 'Tonystark',
//     userComments: [
//       { msg: 'good', user: 'Thor' },
//       { msg: 'nice', user: 'Banner' },
//       { msg: "i don't like it", user: 'Peter' },
//       { msg: 'nice', user: 'Thor' },
//       { msg: 'good', user: 'Banner' },
//       { msg: 'it is a nice blog', user: 'Banner' },
//       { msg: 'good', user: 'Banner' },
//       { msg: 'good', user: 'Banner' },
//       { msg: 'that image looks fantastic.', user: 'Banner' },
//       { msg: 'keep posting blogs like this, it is really a nice blog.', user: 'Banner' }
//     ]
//   }
// ]
