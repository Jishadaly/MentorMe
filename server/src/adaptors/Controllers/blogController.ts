
import { Request, Response, NextFunction } from "express"
import blogInteractor from "../../domain/usecases/blogInteractor";

export default {
  addBlog: async (req: Request, res: Response, next: NextFunction) => {
    
    const { title, summary, content , mentorId }: { title: string; summary: string; image: any; content: any , mentorId:string } = req.body;
     
   
    const parsedContent = JSON.parse(content);
    const image = req.file?.path;
    const data = await blogInteractor.addBlog(title, summary, image, parsedContent,mentorId);
    res.status(200).json({ message: 'Blog saved successfully', data });
    
  },

  getAllBlogs:async( req:Request ,res: Response, next: NextFunction)=>{
    try {
       const page : any = req.query.page;
       console.log(page);
       
       if(!page) throw Error('page not provided')
       const blogs  = await blogInteractor.getAllBlogs(page);
      console.log(blogs);
      
       res.status(200).json(blogs);
    } catch (error:any) {
      res.status(400).json(error.message)
    }
  },

  getBlog:async(req:Request ,res: Response, next: NextFunction)=>{
    try {
      console.log(req.query);
      
      const blogId = req.query.blogId;
      const blogID = blogId as string
      const blog  = await blogInteractor.getBlog(blogID);
      res.status(200).json(blog);
   } catch (error:any) {
     res.status(400).json(error.message)
   }
  },
  getMentorBlog:async(req:Request ,res: Response, next: NextFunction)=>{
    try {
      console.log(req.query);
      
      const mentorId = req.query.mentorId;
      const mentor = mentorId as string
      const blog  = await blogInteractor.getMentorBlog(mentor);
      res.status(200).json(blog);
      
    } catch (error:any) {
      res.status(400).json(error.message)
    }
  },
  updateBlog: async (req: Request, res: Response, next: NextFunction) => {
    const { title, summary, image, content , mentorId , blogId}: { title: string; summary: string; image: any; content: any , mentorId:string ,blogId:string } = req.body;
    const data = await blogInteractor.updateBlog(title, summary, image, content,mentorId , blogId);
    res.status(200).json({ message: 'Blog saved successfully', data });
    
  },
  
  deleteBlog:async(req: Request, res: Response, next: NextFunction)=>{
   try {
    const blogId = req.query.blogId;
    const id = blogId as string
     const blog =   await blogInteractor.deleteBlog(id);
     res.status(200).json({ message: 'Blog saved successfully', blog });
   } catch (error:any) {
    res.status(400).json(error)
   }
  }


}