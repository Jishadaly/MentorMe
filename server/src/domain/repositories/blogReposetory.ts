
import { Blog } from "../../frameworks/database/mongoDb/models/blog";
import { Users } from "../../frameworks/database/mongoDb/models/user";
import Report from "../../frameworks/database/mongoDb/models/report";

export default {
  saveBlog: async (blog: { title: string, summary: string, content: any }) => {
    try {
      const newBlog = new Blog(blog);
      const savedBlog = await newBlog.save();

      console.log('Blog created successfully:', savedBlog);

      return savedBlog;
    } catch (error) {
      console.error('Error saving blog:', error);
      throw error;
    }

  },
  getBlogs: async (page:any) => {
    try {
        let resultsPerPage = 4;
        const blogs = await Blog.find({isBlocked:false}).populate({
        path: 'mentor',
        select: '_id userName profilePic'
      }).sort({ createdAt: -1 })
        .lean()
        .limit(resultsPerPage)
        .skip(page * resultsPerPage)

        return blogs
    } catch (error: any) {
      throw Error(error);
    }
  },

  getBlogById: async (blogId: string) => {
    try {
      
      const blog = await Blog.findById(blogId).populate({
        path: 'mentor',
        select: '_id userName'
      })

      return blog
    } catch (error: any) {
      throw Error(error)
    }
  },

  getBlogbyMentorId: async (mentorId: string) => {
    try {
      const blog = await Blog.find({ mentor: mentorId }).populate({
        path: 'mentor',
        select: '_id userName'
      })
        .sort({ updatedAt: -1 });
      console.log(blog);

      return blog
    } catch (error: any) {
      throw Error(error)
    }
  },
  updateBlog: async (blog: { title: string, summary: string, content: any, }, blogId: string) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true });

      if (!updatedBlog) {
        throw new Error('Blog not found');
      }

      console.log('Blog updated successfully:', updatedBlog);

      return updatedBlog;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }

  },
  deleteBlog: async (id: string) => {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);

      if (!deletedBlog) {
        throw new Error('Blog not found');
      }
      console.log('Blog deleted successfully:', deletedBlog);
      return deletedBlog;
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  },
  saveReport:async(reason:string , additionalDetails:string , userId:string , blogId:string)=>{
    try {
      
      const report = new Report({
          userId,
          blogId,
          reason,
          additionalDetails
      })

      await report.save();
      
      const reportCount = await Report.countDocuments({ blogId });

      if (reportCount >= 3) {
        await Blog.findByIdAndUpdate(blogId, { isBlocked: true });
      }

      return report
    } catch (error) {
      console.error('Error saving report:', error);
      throw error;
    }
  },

  getReports:async()=>{
      try {
        const reports = await Report.find().populate({
          path:'userId',
          select:'userId userName',
        }).populate({
          path:'blogId',
          select:"title isBlocked"
        })
        return reports
      } catch (error) {
        throw error
      }
  }
}