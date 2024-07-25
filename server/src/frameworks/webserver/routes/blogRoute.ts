import express from 'express'
import verifyToken from '../../middlewares/jwt/authMiddleware';
import blogController from '../../../adaptors/Controllers/blogController';
import checkRole from '../../middlewares/jwt/checkRole';


const blogRouter = express.Router();
const parser = require('../../../config/cloudinary.config');

blogRouter.post('/addBlog',verifyToken,parser.single("image"),blogController.addBlog);
blogRouter.get('/getAllblogs' , verifyToken , blogController.getAllBlogs);
blogRouter.get('/getBlog' , verifyToken , blogController.getBlog);
blogRouter.get('/getmentorBlog' , verifyToken , blogController.getMentorBlog);
blogRouter.post('/updateBlog' , verifyToken ,parser.single("image") ,blogController.updateBlog);
blogRouter.delete('/deleteBlog' , verifyToken , blogController.deleteBlog);

export default blogRouter