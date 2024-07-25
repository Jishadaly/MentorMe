import React, { useState } from 'react';
import { uploadProfilePicture } from '@/Api/services/menteeService'; // Make sure to implement this API service
import { toast } from 'sonner';

const EditProfilePicture = ({ menteeId, onUpdate }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('testField', 'testValue'); // Add static data
    formData.append('profilePicture', selectedFile);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]); // Check this output
    }

    const uploadProfilePicturePromise = new Promise((resolve, reject) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      uploadProfilePicture('user/uploadProfilePicture', formData, config)
        .then((data) => {
          console.log(data);
          resolve({ message: 'Profile picture updated successfully', data });
          
        })
        .catch((error) => {
          reject(error);
  

        });
    });

    await toast.promise(uploadProfilePicturePromise, {
      loading: 'Uploading profile picture...',
      success: (response) => {
        console.log(response);
        onUpdate('profilePic', response.data.profilePic);
        return response.message;
      },
      error: 'Error uploading profile picture',
    });
  };


  return (
    <div className="flex flex-col items-center">
      <input type="file" name='image' accept='image/*' onChange={handleFileChange} />
      <button onClick={handleUpload} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Upload
      </button>
    </div>
  );
};

export default EditProfilePicture;
