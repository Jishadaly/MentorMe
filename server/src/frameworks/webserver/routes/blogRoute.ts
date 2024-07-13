import express from 'express'
import verifyToken from '../../middlewares/jwt/authMiddleware';
import blogController from '../../../adaptors/Controllers/blogController';
import checkRole from '../../middlewares/jwt/checkRole';


const blogRouter = express.Router();


blogRouter.post('/addBlog',verifyToken,blogController.addBlog);
blogRouter.get('/getAllblogs' , verifyToken , blogController.getAllBlogs);
blogRouter.get('/getBlog' , verifyToken , blogController.getBlog);
blogRouter.get('/getmentorBlog' , verifyToken , blogController.getMentorBlog);
blogRouter.post('/updateBlog' , verifyToken , blogController.updateBlog);
blogRouter.delete('/deleteBlog' , verifyToken , blogController.deleteBlog);

export default blogRouter