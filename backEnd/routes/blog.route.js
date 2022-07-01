const router = require('express').Router();

const { authorize } = require('../auth/jwt');
const { 
  addBlog,
  getBlogs,
  updateBlog,
  getBlogById,
  getBlogsByBloggerId,
} = require('../controllers/blog.controller');


router.post('/addBlog', authorize, addBlog)
router.get('/allBlogs', getBlogs)
router.patch('/update/:id', authorize, updateBlog)
router.get('/blog/:id', getBlogById)
router.get('/blogs/blogger/:id', getBlogsByBloggerId)


module.exports = router;