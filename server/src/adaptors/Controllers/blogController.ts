import { Request, Response, NextFunction } from "express"
import blogInteractor from "../../domain/usecases/blogInteractor";

declare module 'express-serve-static-core' {
  interface Request {
      userId?: string;
  }
}

export default {
  addBlog: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
    console.log(req.file?.path);
    const { title, summary, content , mentorId }: { title: string; summary: string; image: any; content: any , mentorId:string } = req.body;
    const parsedContent = JSON.parse(content);
    const image = req.file?.path;
    const data = await blogInteractor.addBlog(title, summary, image, parsedContent,mentorId);
    res.status(200).json({ message: 'Blog saved successfully', data });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllBlogs:async( req:Request ,res: Response, next: NextFunction)=>{
    try {
       const page : any = req.query.page;
       
       if(!page) throw Error('page not provided')
       const blogs  = await blogInteractor.getAllBlogs(page);
      console.log('blooogs',blogs);
      
       res.status(200).json(blogs);
    } catch (error:any) {
      res.status(400).json(error.message)
    }
  },

  getBlog:async(req:Request ,res: Response, next: NextFunction)=>{
    try {
      console.log(req.query);
      const blogId = req.query.blogId;
      const blogID = blogId as string;
      const blog  = await blogInteractor.getBlog(blogID);
      res.status(200).json(blog);
   } catch (error:any) {
     res.status(400).json(error.message)
   }
  },

  getMentorBlog:async(req:Request ,res: Response, next: NextFunction)=>{
    try {

      const mentorId = req.userId;
      const mentor = mentorId as string
      const blog  = await blogInteractor.getMentorBlog(mentor);
      res.status(200).json(blog);
      
    } catch (error:any) {
      res.status(400).json(error.message)
    }
  },
  updateBlog: async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      
      const { title, summary, content , mentorId , blogId}: { title: string; summary: string;  content: any , mentorId:string ,blogId:string } = req.body;
      const parsedContent = JSON.parse(content);
      const image = req.file?.path;
      const data = await blogInteractor.updateBlog(title, summary, image, parsedContent,mentorId , blogId);
      res.status(200).json({ message: 'Blog saved successfully', data });
    } catch (error:any) {
      res.status(400).json(error.message);
    }
    
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
  },

  reportBlog:async(req:Request , res:Response , next:NextFunction)=>{
      const { reason , additionalDetails , blogId} : {reason:string , additionalDetails:string , blogId:string} = req.body;
      const userId = req.userId as string
    try {
      const savedReport = await blogInteractor.reportBlog(reason , additionalDetails , userId ,blogId );
      res.status(200).json({message:"Report submited "});
    } catch (error:any) {
      res.status(400).status(error.message)
    }
  },

  getAllReports:async(req:Request , res:Response , next:NextFunction)=>{
    console.log("rerere");
    
    try {
      const reports = await blogInteractor.getReports();
      res.status(200).json(reports)
    } catch (error:any) {
      console.log(error);
      
      res.status(400).json(error.message)
    }
  }

}