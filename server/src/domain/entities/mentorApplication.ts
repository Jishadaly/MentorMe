export interface ApplicationForm {
  user?: string; // Assuming user ID will be a string representation of ObjectId
  name?: string;
  phone?:string;
  email?: string;
  bio?: string;
  jobTitle?: string;
  company?: string;
  location?: string;
  programmingLanguages?: string[];
  skills?: string[];
  languagePreference?: string[];
  linkedInProfile?: string;
  motivation?: string;
  status?: 'Pending' | 'Approved' | 'Rejected';
  createdAt?: Date;
}
