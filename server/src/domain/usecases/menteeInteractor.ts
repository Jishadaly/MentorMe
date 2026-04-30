import mentorRepository from "../repositories/mentorRepository";
import { getUserbyId, updateUserName, updateUserPhone } from "../repositories/userRepository"
import authInteractor from "./auth/authInteractor";

export default {

  getMentors: async () => {
    const mentors = await mentorRepository.getMentorsBasic();

    const formattedMentors = await Promise.all(
      mentors.map(async (mentor: any) => {

        const [sessionStats, ratingStats] = await Promise.all([
          mentorRepository.getMentorSessionStats(mentor._id),
          mentorRepository.getMentorRatingStats(mentor._id)
        ]);

        return {
          mentorId: mentor.mentorAdditional?._id,
          name: mentor.userName,
          profilePic: mentor.profilePic,
          jobTitle: mentor.mentorAdditional?.jobTitle || "",
          company: mentor.mentorAdditional?.company || "",
          skills: mentor.mentorAdditional?.skills || [],
          totalSessions: sessionStats.totalSessions,
          lastSessionPrice: sessionStats.lastSessionPrice,
          avgRating: Number(ratingStats.avgRating.toFixed(1)),
          totalReviews: ratingStats.totalReviews
        };
      })
    );

    return formattedMentors;
  },
  getMentee: async (userId: string) => {
    try {
      const mentee = await getUserbyId(userId);
      if (!mentee) {
        throw Error("user not found");
      }
      return mentee
    } catch (error) {
      return error
    }
  },
  editMenteeProfile: async (userId: string, field: string, newVal: string) => {
    try {

      let response;
      switch (field) {
        case "name":
          response = await updateUserName(userId, newVal);
          break;
        case "phone":
          response = await updateUserPhone(userId, newVal);
          break;

        case "password":
          response = await authInteractor.resetPassword(userId, newVal)
          break;
      };

      if (!response) {
        throw Error("no response")
      }

      return response;

    } catch (error) {
      throw error
    }
  },
  postFeedback: async (userId: string, feedback: string, mentorId: string, sessionId: string, rating: string) => {
    try {
      const feedBack = await mentorRepository.saveFeedback(userId, feedback, mentorId, sessionId, rating);
      return feedBack
    } catch (error) {
      throw error
    }
  },
  getMentorReviews: async (mentorId: string) => {
    try {
      const reviews = await mentorRepository.getReviews(mentorId)
      return reviews
    } catch (error) {
      throw error
    }
  },
  searchMentors: async (query: string) => {
    try {
      const mentors = await mentorRepository.getSearchedMentors(query);
      return mentors;
    } catch (error) {

    }
  }

}