import { Admins } from "../../frameworks/database/mongoDb/models/adminModel"
import MentorApplication from "../../frameworks/database/mongoDb/models/mentorApplicationModel";
import { Users } from "../../frameworks/database/mongoDb/models/user";
import Availability, { IAvailability } from "../../frameworks/database/mongoDb/models/Availability";
import { Blog } from "../../frameworks/database/mongoDb/models/blog";

export const findAdmin = async (email:string)=> await Admins.findOne({email})

export const getMentoresForVerification = async() =>{
  const requestedMentors = await MentorApplication.find({status:'Pending'});
  console.log(requestedMentors);
  return requestedMentors;
}

export const updateMentorVerificationVerify =async(id:string , userId:string)=>{
   try {
    
    const userUpdate = await Users.updateOne(  {_id:userId} , { isMentor: true });
    const saveFormInUser = await Users.findByIdAndUpdate(userId , {mentorAdditional:id});
    
    return  await MentorApplication.findByIdAndUpdate(id , {status:"Approved"});
   } catch (error:any) {
    throw new Error(error);
   }
}

export const updateMentorVerificationReject =async(id:string , userId:string)=>{
  try {
      const mentorapp =  await MentorApplication.findByIdAndUpdate(id , {status:"Rejected"});     
     return mentorapp;
  } catch (error:any) {
   throw new Error(error)
  }
}

export const getAllUsers = async()=>{
  try {
     const data = await Users.find({verified:true});     
     return data
  } catch (error) {
   throw error
  }
} 

export const getAllMentors = async()=>{
  try {
    const data = await Users.find({verified:true,isMentor:true});
     console.log(data);
     return data;
  } catch (error) {
    throw error
  }
}

export const updateBlockStatus = async (userId : string,isBlocked:boolean) => {
  try {
    // Find the user by ID and update the isBlocked status
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      { isBlocked: isBlocked },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  } catch (error) {
    console.error('Error updating block status:', error);
    throw error;
  }
};

export const updateBlogStatus = async (blogId : string,isBlocked:boolean) => {
  try {
  
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { isBlocked: isBlocked },
      { new: true } 
    );

    if (!updatedBlog) {
      throw new Error('User not found');
    }

    return updatedBlog;
  } catch (error) {
    console.error('Error updating block status:', error);
    throw error;
  }
};

export const getAllSlots = async () => {
  try {
      const now = new Date();
      const slots: IAvailability[] = await Availability.find({
      date: { $gte: now },
      status: { $ne: 'Completed' },
      startTime: { $gte: now.toISOString().split('T')[1] }
    })
    .populate('mentorId')
    .populate('bookedBy')
    .exec();

    return slots;
  } catch (error) {
    throw error;
  }
};

export const fetchChartData = async()=>{

  const userJoinStatus = await Users.aggregate([
    { $match: { isMentor: false } }, // Filter for non-mentors (users) only
    { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, userCount: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  const mentorJoinStatus = await Users.aggregate([
    { $match: { isMentor: true } }, // Filter for mentors only
    { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, mentorCount: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  const blogtCreationStats = await Blog.aggregate([
    { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, blogCount: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  const slotCreationStats = await Availability.aggregate([
    { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, slotCount: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);

  const chartData = {
    slotCreationStats,
    blogtCreationStats,
    userJoinStatus,
    mentorJoinStatus
  };

  return chartData
}

export const getDashboardStatus = async () => {
  try {
    const totalBlogs = await Blog.countDocuments();
    return {
      totalBlogs,
    };
  } catch (error) {
    console.error("Error fetching dashboard status:", error);
    throw error;
  }
};
