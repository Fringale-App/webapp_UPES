import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { app } from '../firebase';
import { uploadBytesResumable, getDownloadURL, getStorage, ref } from 'firebase/storage';
import { signOutUserSuccess, failure, setLoading, signInSuccess, updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';

function Profile() {
  const { loading } = useSelector((state) => state.user);
  const currentUser=useSelector(state=>state.user.currentUser)
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [userUpdateSuccess, setUserUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccessText, setUpdateSuccessText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  function handleFileUpload(file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({ ...formData, avatar: downloadUrl });
        });
      }
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(updateUserStart()); // Start the update process
  
    try {
      console.log('formData:', formData);
      const result = await fetch(`http://localhost:3000/api/user/update/${currentUser?._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include credentials (e.g., cookies)
      });
  
      const data = await result.json();
      console.log("res",data);
      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }
  
      dispatch(updateUserSuccess(data)); // Update success
      setUserUpdateSuccess(true);
      setUpdateSuccessText('User Updated Successfully.');
      
      setTimeout(() => {
        setUpdateSuccessText('');
      }, 4000);
    } catch (err) {
      dispatch(updateUserFailure('Failed to update user, try again.'));
    }
  }
  

  async function handleDeleteUser() {
    try {
      dispatch(setLoading(true));
      const result = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await result.json();
      dispatch(signOutUserSuccess());
      navigate('/signin');
    } catch (err) {
      dispatch(setLoading(false));
      dispatch(failure(err.message));
    }
  }

  async function handleSignOut() {
    try {
      dispatch(setLoading(true));
      const result = await fetch('http://localhost:3000/api/user/signout');
      const data = await result.json();
      if (data.success === false) {
        dispatch(failure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (err) {
      dispatch(failure(err.message));
    }
  }

  return (
    <div className='mt-2 p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg'>
      <h1 className="text-2xl uppercase text-center font-semibold text-gray-800">Profile</h1>
      <div className='w-full flex justify-center mt-5'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" hidden ref={fileRef} accept='image/*' />
        <img
          onClick={() => fileRef.current.click()}
          className='object-cover cursor-pointer self-center rounded-full h-20 w-20'
          src={formData.avatar || currentUser?.data?.avatar || '/default-avatar.png'} // Safely access avatar
          alt="User Avatar"
        />
      </div>
      <p className='text-sm mt-1 text-center'>
        {fileUploadError ? (
          <span className="text-red-600 font-semibold">Error while uploading</span>
        ) : filePer > 0 && filePer < 100 ? (
          <span className="text-blue-600">{`Uploading.. ${filePer}%`}</span>
        ) : filePer === 100 ? (
          <span className="text-green-600 font-semibold">Uploaded Successfully</span>
        ) : (
          ''
        )}
      </p>

      <form onSubmit={handleSubmit} className='flex mt-4 flex-col gap-4'>
        <input
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500'
          type="text"
          placeholder='Username'
          id='username'
          defaultValue={currentUser?.name} // Safely access name
          onChange={handleChange}
        />
        <input
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500'
          type="email"
          placeholder='Email'
          id='email'
          defaultValue={currentUser?.email} // Safely access email
          onChange={handleChange}
        />
        <input
          className='border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-500'
          type="password"
          placeholder='Password'
          id='password'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="uppercase rounded-lg p-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-300"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>

      <div className='flex justify-between mt-4'>
        <button onClick={handleDeleteUser} className='text-red-600 hover:text-red-800 transition duration-300'>
          Delete Account
        </button>
        <button onClick={handleSignOut} className='text-blue-600 hover:text-blue-800 transition duration-300'>
          Sign Out
        </button>
      </div>

      <p className="text-green-600 font-semibold text-center">{updateSuccessText}</p>
    </div>
  );
}

export default Profile;
