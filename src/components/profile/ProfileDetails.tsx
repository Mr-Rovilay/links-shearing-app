'use client';

import AnimationWrapper from '@/components/common/AnimationWrapper';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { CiImageOn } from "react-icons/ci";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseConfig';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string | null;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const ProfileDetails = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,
  });

  const [errors, setErrors] = useState<Errors>({});
  const [user] = useAuthState(auth); // Get the current user from Firebase

  useEffect(() => {
    if (user) {
      // Populate formData with user's email when component mounts
      setFormData(prevData => ({
        ...prevData,
        email: user.email || ''
      }));
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.firstName) newErrors.firstName = "Can't be empty";
    if (!formData.lastName) newErrors.lastName = "Can't be empty";
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    return newErrors;
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Form data:', formData);
      alert('Profile updated successfully!');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <AnimationWrapper keyValue="uniqueKey1">
        <div className="flex flex-col justify-between gap-3 bg-white rounded-xl shadow-md">
        <div className="">
        <h1 className="text-[32px] font-bold my-2 pl-8">Profile Details</h1>
        <p className="mb-6 text-gray-700 px-8">Add your details to create a personal touch on your profile.</p>
        </div>
        <div className="grid gap-8 mb-8 px-8">
          <div className="grid lg:grid-cols-3 grid-cols-1 bg-gray-100 items-center pl-6 rounded-lg">
            <h2 className="text-sm text-[#737373] mb-2">Profile Picture</h2>
            <div className="relative flex flex-col my-6 items-center justify-center bg-[#efebff] rounded-lg h-48 overflow-hidden">
              {formData.profileImage ? (
                <img src={formData.profileImage} alt="Profile Preview" className="w-full h-full object-cover" />
              ) : (
                <CiImageOn className='text-5xl text-[#633CFF]' />
              )}
              <label htmlFor="fileInput" className="absolute bottom-9 cursor-pointer text-center font-bold text-[16px] text-[#633CFF] z-10">
                + Upload image here
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
              />
            </div>
            <div className="text-left pl-4">
              <p className="text-sm text-[#737373] ">Image must be below 1024x1024px. Use PNG or JPEG format.</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 m-8 rounded-lg">
          <div className="flex flex-col mb-5">
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div className="mt-7 lg:grid lg:grid-cols-2 grid-cols-1 items-center relative px-8">
                <label htmlFor="firstName" className="block text-[16px] font-medium text-[#737373] mb-1">First Name*</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder='e.g. John'
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full inputField p-2 text-[16px] text-[#737373] border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">{errors.firstName}</p>}
                </div>
              </div>
              <div className="mb-4 lg:grid lg:grid-cols-2 grid-cols-1 items-center relative px-8">
                <label htmlFor="lastName" className="block text-[16px] font-medium text-[#737373] mb-1">Last Name*</label>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder='e.g. Doe'
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block inputField w-full p-2 text-[16px] text-[#737373] border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">{errors.lastName}</p>}
                </div>
              </div>
              <div className="mb-10 lg:grid lg:grid-cols-2 grid-cols-1 items-center relative px-8">
                <label htmlFor="email" className="block text-[16px] font-medium text-[#737373] mb-1">Email*</label>
                <div className="relative w-full">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='e.g. 123@example.com'
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full text-[16px] text-[#737373] inputField p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-[#fafafa]'}`}
                  />
                  {errors.email && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">{errors.email}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="bg-white rounded-b-lg lg:pr-auto lg:py-2 flex justify-end mt-4 pr-7">
          <button 
            onClick={handleFormSubmit}
            className="bg-[#633CFF] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#BEADFF] transition-colors duration-200 sm:w-full lg:w-auto"
          >
            Save
          </button>
        </div>

        </div>
      </AnimationWrapper>
    </>
  );
};

export default ProfileDetails;
