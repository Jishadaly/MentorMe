import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import { initialValues, validationSchema } from '@/utils/validations/mentorAppFormValidation';
import { fetchLocations } from '@/Api/services/thirdParty/fetchLocation';
import { mentorApplicationFormApi } from '@/Api/services/auth/user-auth-service';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';


function MentorApplicationForm() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  
  const userId = useParams();

  useEffect(() => {
    fetchLocations(setLocations, setLoading);
  }, []);

  const handleSubmit = async (values, {setSubmitting}) => {
     const applicationData = {...values , ...userId}
     setSubmitting(false);
    try {
      const response = await mentorApplicationFormApi('user/mentorAppicationForm' , applicationData);
      toast.success(response.data.message);
      navigate('/MentorConfirmationPage');
      
    } catch (error) {
      toast.error(error.response.data.error);
    }finally{
      setSubmitting(false);
    }
  }

  
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="container mx-auto my-4 px-4 lg:px-20">
        <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl bg-white">
          <div className="flex bg-white p-4 z-10 mb-4">
            <h4 className="text-3xl font-black font-sans">Mentor Application</h4>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, touched , errors, isSubmitting, handleChange }) => (
              <Form>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div className="flex flex-col">
                    <label className="text-gray-700">Name*</label>
                    <Field
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      name="name"
                    />
                    {touched.name && errors.name && <div className="text-red-500">{errors.name}</div>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Email*</label>
                    <Field
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      name="email"
                    />
                    {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
                  </div>
                  <div className="flex flex-col md:col-span-2">
                    <label className="text-gray-700">Bio*</label>
                    <Field
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      component="textarea"
                      rows="5"
                      name="bio"
                    />
                   {touched.bio && errors.bio && <div className="text-red-500">{errors.bio}</div>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Job Title*</label>
                    <Field
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      name="jobTitle"
                    />
                    {touched.jobTitle && errors.jobTitle && <div className="text-red-500">{errors.jobTitle}</div>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Company (Optional)</label>
                    <Field
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      name="company"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Location*</label>
                    <Field
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      component="select"
                      name="location"
                    >
                      <option value="" disabled>
                        {loading ? 'Loading...' : 'Select Location'}
                      </option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </Field>
                    {touched.location && errors.location && <div className="text-red-500">{errors.location}</div>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Programming Languages*</label>
                    <FieldArray name="programmingLanguages">
                      {({ push, remove }) => (
                        <>
                          <div className="flex">
                            <Field
                              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                              type="text"
                              name="newProgrammingLanguage"
                              placeholder="Add a programming language"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const input = e.target;
                                  if (input.value.trim() !== '') {
                                    push(input.value.trim());
                                    input.value = '';
                                  }
                                }
                              }}
                            />
                          </div>
                          <div className="mt-2">
                            {values.programmingLanguages.map((language, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2"
                              >
                                {language}
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => remove(index)}
                                >
                                  x
                                </button>
                              </span>
                            ))}
                          </div>
                          {touched.programmingLanguages && errors.programmingLanguages && <div className="text-red-500">{errors.programmingLanguages}</div>}
                        </>
                      )}
                    </FieldArray>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Skills*</label>
                    <FieldArray name="skills">
                      {({ push, remove }) => (
                        <>
                          <div className="flex">
                            <Field
                              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                              type="text"
                              name="newSkill"
                              placeholder="Add a skill"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const input = e.target;
                                  if (input.value.trim() !== '') {
                                    push(input.value.trim());
                                    input.value = '';
                                  }
                                }
                              }}
                            />
                          </div>
                          <div className="mt-2">
                            {values.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2"
                              >
                                {skill}
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => remove(index)}
                                >
                                  x
                                </button>
                              </span>
                            ))}
                          </div>
                          {touched.skills && errors.skills && <div className="text-red-500">{errors.skills}</div>}
                        </>
                      )}
                    </FieldArray>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">Language Preference*</label>
                    <FieldArray name="languagePreference">
                      {({ push, remove }) => (
                        <>
                          <div className="flex">
                            <Field
                              className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                              type="text"
                              name="newLanguagePreference"
                              placeholder="Add a language preference"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  const input = e.target;
                                  if (input.value.trim() !== '') {
                                    push(input.value.trim());
                                    input.value = '';
                                  }
                                }
                              }}
                            />
                          </div>
                          <div className="mt-2">
                            {values.languagePreference.map((language, index) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2"
                              >
                                {language}
                                <button
                                  type="button"
                                  className="ml-2 text-red-500"
                                  onClick={() => remove(index)}
                                >
                                  x
                                </button>
                              </span>
                            ))}
                          </div>
                          {touched.languagePreference && errors.languagePreference && <div className="text-red-500">{errors.languagePreference}</div>}
                        </>
                      )}
                    </FieldArray>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-gray-700">LinkedIn Profile Link*</label>
                    <Field
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="url"
                      name="linkedInProfile"
                    />
                    {touched.linkedInProfile && errors.linkedInProfile && <div className="text-red-500">{errors.linkedInProfile}</div>}
                  </div>
                </div>
                <div className="my-4">
                  <label className="text-gray-700">What is the motivation to having a mentor?*</label>
                  <Field
                    placeholder="What is the motivation to having a mentor?"
                    className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    component="textarea"
                    name="motivation"
                  />
                  {touched.motivation && errors.motivation && <div className="text-red-500">{errors.motivation}</div>}
                </div>
                <div className="my-2 w-full md:w-1/2 lg:w-1/4">
                  <button
                    className="uppercase text-sm font-bold tracking-wide bg-[rgb(68,64,203)] text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default MentorApplicationForm;