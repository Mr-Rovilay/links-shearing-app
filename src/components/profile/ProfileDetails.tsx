'use client';
import AnimationWrapper from '@/components/common/AnimationWrapper';
import { useState } from 'react';
import { CiImageOn } from "react-icons/ci";

const ProfileDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
  });
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFileChange = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Cant be empty';
    if (!formData.lastName) newErrors.lastName = 'Cant be empty';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
    return newErrors;
  };

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
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

    <div className="shadow-md rounded-xl w-full h-screen flex flex-col justify-between">
      <div className="p-8 bg-white shadow-md rounded-lg mx-auto h-full">
        <h1 className="text-3xl font-bold mb-4">Profile Details</h1>
        <p className="mb-6 text-gray-700">Add your details to create a personal touch on your profile.</p>
        
        <div className="grid gap-8 mb-8">
          <div className="grid lg:grid-cols-3 grid-cols-1 bg-gray-100 items-center p-6 rounded-lg border border-gray-300">
            <h2 className="text-xl font-semibold mb-2">Profile Picture</h2>
            <div className="relative flex flex-col my-6 items-center justify-center bg-[#efebff] border-dashed border-2 border-gray-300 rounded-lg h-48 overflow-hidden">
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
            <div className="text-left p-4">
              <p className="text-sm text-gray-500">Image must be below 1024x1024px. Use PNG or JPEG format.</p>
            </div>
          </div>
        </div>
          
        <form onSubmit={handleFormSubmit} className="bg-gray-100 p-12 rounded-lg border border-gray-300">
          <div className="mb-4 lg:grid lg:grid-cols-2 grid-cols-1 items-center relative">
            <label htmlFor="firstName" className="block text-[16px] font-medium text-[#737373] mb-1">First Name*</label>
            <div className="relative w-full">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder='e.g. John'
                value={formData.firstName}
                onChange={handleChange}
                className={`block w-full inputField p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.firstName && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">{errors.firstName}</p>}
            </div>
          </div>
          
          <div className="mb-4 lg:grid lg:grid-cols-2 grid-cols-1 items-center relative">
            <label htmlFor="lastName" className="block text-[16px] font-medium text-[#737373] mb-1">Last Name*</label>
            <div className="relative w-full">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder='e.g. Doe'
                value={formData.lastName}
                onChange={handleChange}
                className={`block inputField w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.lastName && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="mb-6 lg:grid lg:grid-cols-2 grid-cols-1 items-center relative">
            <label htmlFor="email" className="block text-[16px] font-medium text-[#737373] mb-1">Email*</label>
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                name="email"
                placeholder='e.g. 123@example.com'
                value={formData.email}
                onChange={handleChange}
                className={`block w-full inputField p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 text-sm">{errors.email}</p>}
            </div>
          </div>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-b-lg flex justify-end lg:pr-8 lg:py-2">
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