import express from 'express'
import verifyToken from '../../middlewares/jwt/authMiddleware';
import blogController from '../../../adaptors/Controllers/blogController';
import checkRole from '../../middlewares/jwt/checkRole';
import checkBlocked from '../../middlewares/jwt/checkBlocked';

const blogRouter = express.Router();
const parser = require('../../../config/cloudinary.config');

blogRouter.post('/addBlog',verifyToken,checkBlocked,parser.single("image"),blogController.addBlog);
blogRouter.get('/getAllblogs' , verifyToken , checkBlocked,blogController.getAllBlogs);
blogRouter.get('/getBlog' , verifyToken ,checkBlocked, blogController.getBlog);
blogRouter.get('/getmentorBlog' , verifyToken ,checkBlocked, blogController.getMentorBlog);
blogRouter.post('/updateBlog' , verifyToken ,checkBlocked,parser.single("image") ,blogController.updateBlog);
blogRouter.delete('/deleteBlog' , verifyToken ,checkBlocked, blogController.deleteBlog);
blogRouter.post('/report',verifyToken , checkBlocked,checkRole(['mentee']) ,blogController.reportBlog);
blogRouter.get('/getAllReports' , blogController.getAllReports);

export default blogRouter;