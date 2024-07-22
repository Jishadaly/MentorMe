import blogReposetory from "../repositories/blogReposetory";

interface IBlockData {
  text?: string;
  level?: number;
  file?: {
    url: string;
  };
  caption?: string;
  withBorder?: boolean;
  stretched?: boolean;
  withBackground?: boolean;
}

interface IBlock {
  type: string;
  data: IBlockData;
}


interface Content {
  time: number;
  blocks: IBlock[];
  version: string;
}

export default {

  addBlog:async( title: string, summary: string, image: any, content: Content , mentorId:string)=>{  
    
    const blocks: IBlock[] = content.blocks;

    
    const blocksArray: IBlock[] = [];
    blocks.forEach((block: IBlock) => {
      console.log('Block: ', block);
      blocksArray.push(block);
    });

    
    const blogData = {
      title,
      summary,
      image,
      content: {
        time: content.time,
        blocks: blocksArray,
        version: content.version,
      },
      mentor:mentorId,
    };

    
    
    const savedBlog = blogReposetory.saveBlog(blogData);

    return savedBlog;
      
  },
  getAllBlogs:async(page:any)=>{
    try {
       const blogs = await blogReposetory.getBlogs(page);
       return blogs
    } catch (error:any) {
      throw Error(error)
    }
  },
  getBlog:async(blogId:string)=>{
    try {
       const blog = await blogReposetory.getBlogById(blogId);
       return blog;

    } catch (error:any) {
      throw Error(error)
    }
  },

  getMentorBlog:async(mentorId:string)=>{
     try {
      const blog = await blogReposetory.getBlogbyMentorId(mentorId);
       return blog;
     } catch (error:any) {
      throw Error(error)
     }
  },
  updateBlog:async( title: string, summary: string, image: any, content: Content , mentorId:string , blogId:string)=>{  
    
    const blocks: IBlock[] = content.blocks;

    
    const blocksArray: IBlock[] = [];
    blocks.forEach((block: IBlock) => {
      console.log('Block: ', block);
      blocksArray.push(block);
    });

  
    const blogData = {
      title,
      summary,
      // image,
      content: {
        time: content.time,
        blocks: blocksArray,
        version: content.version,
      },
      mentor:mentorId,
    };

    console.log(blogData);
    
    const updated = blogReposetory.updateBlog(blogData , blogId);

    return updated;
      
  },
  deleteBlog:async(blogId:string)=>{
   try {
     const blog = await blogReposetory.deleteBlog(blogId);
     return blog
   } catch (error) {
    throw error
   }  
  }
  
}