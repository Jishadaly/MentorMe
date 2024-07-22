import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getMentorData, updateMentorProfile } from '@/Api/services/mentorServices';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/redux/slice/userAuthSlice';

const MentorProfile = () => {
    const user = useSelector((state) => state.auth.user);
    const [mentorDetails, setMentorDetails] = useState(null);
    const [userName , setUserName] = useState(null);
    const [loading, setLoading] = useState(true);


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = ()=>{
        
       dispatch(logout());
       navigate('/mentor/login');
       persistor.purge();
       localStorage.clear(); 
    }


    const fetchUserData = async () => {
        setLoading(true);
        const data = await getMentorData(`user/getMentorDetails`, user.id);
        setMentorDetails(data);
        console.log("data",data);
        setUserName(data.userName);
        formik.setValues({
            userName: data.userName || '',
            phone: data.phone || '',
            bio: data.mentorAdditional.bio || '',
            jobTitle: data.mentorAdditional.jobTitle || '',
            company: data.mentorAdditional.company || '',
            location: data.mentorAdditional.location || '',
            motivation: data.mentorAdditional.motivation || '',
            programmingLanguages: data.mentorAdditional.programmingLanguages || [''],
            skills: data.mentorAdditional.skills || [''],
            languagePreference: data.mentorAdditional.languagePreference || [''],
            linkedInProfile: data.mentorAdditional.linkedInProfile || '',
        });
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const formik = useFormik({
        initialValues: {
            userName: '',
            phone: '',
            bio: '',
            jobTitle: '',
            company: '',
            location: '',
            motivation: '',
            programmingLanguages: [''],
            skills: [''],
            languagePreference: [''],
            linkedInProfile: '',
        },
        validationSchema: Yup.object({
            userName: Yup.string().required('Username is required'),
            phone: Yup.string().required('Phone is required'),
            bio: Yup.string().required('Bio is required'),
            jobTitle: Yup.string().required('Job Title is required'),
            company: Yup.string(),
            location: Yup.string().required('Location is required'),
            programmingLanguages: Yup.array().of(Yup.string()).min(1, 'At least one programming language is required'),
            skills: Yup.array().of(Yup.string()).min(1, 'At least one skill is required'),
            languagePreference: Yup.array().of(Yup.string()).min(1, 'At least one language preference is required'),
            motivation: Yup.string().required('Motivation is required'),
            linkedInProfile: Yup.string().url('Invalid URL').required('LinkedIn Profile Link is required'),
        }),
        onSubmit: async (values) => {
            try {
                console.log(values);
                const updated = await updateMentorProfile('user/updateMentor',values)
                console.log(updated);
                // setUserName(updated.userName);
                toast.success('profile updated');
            } catch (error) {
                console.log(error);
                toast.info(error.response.data)
            }
        },
    });

    const handleArrayChange = (field) => (index) => (e) => {
        const newArray = [...formik.values[field]];
        newArray[index] = e.target.value;
        formik.setFieldValue(field, newArray);
    };

    const addToArray = (field) => {
        formik.setFieldValue(field, [...formik.values[field], '']);
    };

    const removeFromArray = (field, index) => {
        const newArray = formik.values[field].filter((_, i) => i !== index);
        formik.setFieldValue(field, newArray);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-1 bg-gray-50 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                    
                    <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8  mt-28 w-auto">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                            <div className="w-full bg-white p-4 rounded-lg shadow-sm">
                                <div className="bg-grey flex flex-row mb-5">
                                    <img className="mr-2 rounded-full w-24 h-24 mb-4" src="https://via.placeholder.com/150" alt="Profile" />
                                    <div className="flex flex-col">
                                        <h2 className="text-xl font-bold font-inter">{userName ? userName : "mentorDetails.userName"}</h2>
                                        <a href="#edit-profile-picture" className="text-blue-500">Update profile picture</a>
                                        <p className="text-gray-500">signed up • 6 days ago</p>
                                    </div>
                                </div>

                                <form onSubmit={formik.handleSubmit} className="grid gap-6">
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        <div className="grid gap-2">
                                            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username</label>
                                            <input
                                                id="userName"
                                                type="text"
                                                {...formik.getFieldProps('userName')}
                                                className="block w-full p-2 border rounded-md"
                                            />
                                            {formik.touched.userName && formik.errors.userName ? (
                                                <div className="text-red-600">{formik.errors.userName}</div>
                                            ) : null}
                                        </div>

                                        <div className="grid gap-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                            <input
                                                id="phone"
                                                type="tel"
                                                {...formik.getFieldProps('phone')}
                                                className="block w-full p-2 border rounded-md"
                                            />
                                            {formik.touched.phone && formik.errors.phone ? (
                                                <div className="text-red-600">{formik.errors.phone}</div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                                        <textarea
                                            id="bio"
                                            {...formik.getFieldProps('bio')}
                                            className="block w-full p-2 border rounded-md"
                                        />
                                        {formik.touched.bio && formik.errors.bio ? (
                                            <div className="text-red-600">{formik.errors.bio}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                                        <input
                                            id="jobTitle"
                                            type="text"
                                            {...formik.getFieldProps('jobTitle')}
                                            className="block w-full p-2 border rounded-md"
                                        />
                                        {formik.touched.jobTitle && formik.errors.jobTitle ? (
                                            <div className="text-red-600">{formik.errors.jobTitle}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                                        <input
                                            id="company"
                                            type="text"
                                            {...formik.getFieldProps('company')}
                                            className="block w-full p-2 border rounded-md"
                                        />
                                        {formik.touched.company && formik.errors.company ? (
                                            <div className="text-red-600">{formik.errors.company}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            id="location"
                                            type="text"
                                            {...formik.getFieldProps('location')}
                                            className="block w-full p-2 border rounded-md"
                                        />
                                        {formik.touched.location && formik.errors.location ? (
                                            <div className="text-red-600">{formik.errors.location}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">Motivation</label>
                                        <input
                                            id="motivation"
                                            type="text"
                                            {...formik.getFieldProps('motivation')}
                                            className="block w-full p-2 border rounded-md"
                                        />
                                        {formik.touched.motivation && formik.errors.motivation ? (
                                            <div className="text-red-600">{formik.errors.motivation}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="programmingLanguages" className="block text-sm font-medium text-gray-700">Programming Languages</label>
                                        {formik.values.programmingLanguages.map((lang, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={lang}
                                                    onChange={handleArrayChange('programmingLanguages')(index)}
                                                    className="block w-full p-2 border rounded-md"
                                                />
                                                <button type="button" onClick={() => removeFromArray('programmingLanguages', index)}>-</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addToArray('programmingLanguages')}>Add</button>
                                        {formik.touched.programmingLanguages && formik.errors.programmingLanguages ? (
                                            <div className="text-red-600">{formik.errors.programmingLanguages}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                                        {formik.values.skills.map((skill, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={skill}
                                                    onChange={handleArrayChange('skills')(index)}
                                                    className="block w-full p-2 border rounded-md"
                                                />
                                                <button type="button" onClick={() => removeFromArray('skills', index)}>-</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addToArray('skills')}>Add</button>
                                        {formik.touched.skills && formik.errors.skills ? (
                                            <div className="text-red-600">{formik.errors.skills}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="languagePreference" className="block text-sm font-medium text-gray-700">Language Preference</label>
                                        {formik.values.languagePreference.map((lang, index) => (
                                            <div key={index} className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={lang}
                                                    onChange={handleArrayChange('languagePreference')(index)}
                                                    className="block w-full p-2 border rounded-md"
                                                />
                                                <button type="button" onClick={() => removeFromArray('languagePreference', index)}>-</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={() => addToArray('languagePreference')}>Add</button>
                                        {formik.touched.languagePreference && formik.errors.languagePreference ? (
                                            <div className="text-red-600">{formik.errors.languagePreference}</div>
                                        ) : null}
                                    </div>
                                    <div className="grid gap-2">
                                        <label htmlFor="linkedInProfile" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
                                        <input
                                            id="linkedInProfile"
                                            type="url"
                                            {...formik.getFieldProps('linkedInProfile')}
                                            className="block w-full p-2 border rounded-md"
                                        />
                                        {formik.touched.linkedInProfile && formik.errors.linkedInProfile ? (
                                            <div className="text-red-600">{formik.errors.linkedInProfile}</div>
                                        ) : null}
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-inter font-bold"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="hidden space-y-4 lg:flex lg:flex-col">
                            <div className="w-full flex-1 overflow-hidden rounded-lg border bg-background shadow-sm">
                                <div className="p-4">
                                    <div className="flex items-center justify-between space-y-0 pb-4">
                                        <h4 className="text-sm font-semibold">Latest Posts</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-sm">
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">Finding simplicity in life</p>
                                                <p className="text-muted-foreground">September 11, 2023</p>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">Exploring the world of code</p>
                                                <p className="text-muted-foreground">September 11, 2023</p>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">Contributing to open source</p>
                                                <p className="text-muted-foreground">September 11, 2023</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex-1 overflow-hidden rounded-lg border bg-background shadow-sm">
                                <div className="p-4">
                                    <div className="flex items-center justify-between space-y-0 pb-4">
                                        <h4 className="text-sm font-semibold">Contact Information</h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="text-sm">
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">Email</p>
                                                <p className="text-muted-foreground">{mentorDetails.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">Phone</p>
                                                <p className="text-muted-foreground">{mentorDetails.phone}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            <div className="space-y-1">
                                                <p className="font-medium leading-none">LinkedIn</p>
                                                <p className="text-muted-foreground">{mentorDetails.linkedInProfile}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div>
                                <button
                                            onClick={handleLogout}
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 font-inter font-bold"
                                        >
                                            Logout
                                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default MentorProfile;
