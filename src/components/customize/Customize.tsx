// src/components/customize/Customize.tsx
import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { LuInstagram } from "react-icons/lu";
import { AiOutlineGithub, AiOutlineFacebook, AiOutlineTwitter, AiOutlineLinkedin } from 'react-icons/ai';
import { ImTwitch } from "react-icons/im";
import { SiFrontendmentor, SiCodewars } from "react-icons/si";
import { FaHashnode } from "react-icons/fa6";
import { FaDev, FaFreeCodeCamp, FaGitlab, FaStackOverflow } from "react-icons/fa";
import { Link } from '@/types/link';

const platformOptions = [
  { value: 'Github', label: 'Github', icon: <AiOutlineGithub className="mr-2" /> },
  { value: 'Frontend Mentor', label: 'Frontend Mentor', icon: <SiFrontendmentor className="mr-2" /> },
  { value: 'Facebook', label: 'Facebook', icon: <AiOutlineFacebook className="mr-2" /> },
  { value: 'Instagram', label: 'Instagram', icon: <LuInstagram className="mr-2" /> },
  { value: 'LinkedIn', label: 'LinkedIn', icon: <AiOutlineLinkedin className="mr-2" /> },
  { value: 'Twitter', label: 'Twitter', icon: <AiOutlineTwitter className="mr-2" /> },
  { value: 'Twitch', label: 'Twitch', icon: <ImTwitch className="mr-2" /> },
  { value: 'Dev.to', label: 'Dev.to', icon: <FaDev className="mr-2" /> },
  { value: 'Codewars', label: 'Codewars', icon: <SiCodewars className="mr-2" /> },
  { value: 'FreeCodeCamp', label: 'FreeCodeCamp', icon: <FaFreeCodeCamp className="mr-2" /> },
  { value: 'GitLab', label: 'GitLab', icon: <FaGitlab className="mr-2" /> },
  { value: 'Hashnode', label: 'Hashnode', icon: <FaHashnode className="mr-2" /> },
  { value: 'Stack Overflow', label: 'Stack Overflow', icon: <FaStackOverflow className="mr-2" /> },
];

interface CustomizeProps {
  onAddLink: (newLink: Link) => void;
}

const Customize: React.FC<CustomizeProps> = ({ onAddLink }) => {
  const [showForm, setShowForm] = useState(false);
  const [newLink, setNewLink] = useState<Omit<Link, 'title'>>({ url: '', icon: null, label: '' });
  const [selectedPlatform, setSelectedPlatform] = useState<typeof platformOptions[number] | null>(null);
  const [errors, setErrors] = useState({ url: '', platform: '' });

  const handleAddLink = () => {
    setShowForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { url: '', platform: '' };

    if (!newLink.url) {
      newErrors.url = 'Cannot be empty';
      valid = false;
    } else if (!/^https?:\/\/.+\..+/.test(newLink.url)) {
      newErrors.url = 'Invalid URL';
      valid = false;
    }

    if (!selectedPlatform) {
      newErrors.platform = 'Platform is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const newLinkData: Link = { 
        ...newLink, 
        icon: selectedPlatform?.icon || null, 
        label: selectedPlatform?.label || '', 
        title: selectedPlatform?.label || '' 
      };
      console.log('New link added:', newLinkData);
      onAddLink(newLinkData);
      setNewLink({ url: '', icon: null, label: '' });
      setSelectedPlatform(null);
      setShowForm(false);
    }
  };

  const handleRemove = () => {
    setSelectedPlatform(null);
  };

  return (
    <>
      <div className="shadow-md rounded-xl w-full h-screen flex flex-col gap-2">
        <div className="flex-grow bg-white p-8 rounded-t-xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#333333] mb-4">Customize your links</h1>
            <p className="text-[#737373] mb-8">Add/edit/remove links below and share all your profiles with the world.</p>
            <button 
              className="w-full text-[#633CFF] border border-[#633CFF] font-bold py-2 px-4 rounded-md hover:bg-[#BEADFF] transition-colors duration-200"
              onClick={handleAddLink}
            >
              + Add Link
            </button>
          </div>
          {showForm ? (
            <form onSubmit={handleFormSubmit} className="bg-[#fafafa] p-6 rounded-lg mb-8 flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex items-center justify-center gap-2">
                  <HiOutlineMenuAlt4 className='text-2xl'/><h1>Link</h1> <h1>#1</h1>
                </div>
                <button 
                  onClick={handleRemove}
                  className='text-2xl'
                  type="button"
                >
                  Remove
                </button>
              </div>
              <h1 className='text-1xl'>Platform</h1>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className={`flex w-full inputField justify-between gap-x-1.5 rounded-md bg-white px-3 py-3 text-xl text-[#737373]  ${errors.platform ? 'border-red-600' : ''}`}>
                    <div className="flex items-center justify-center gap-2">
                      {selectedPlatform ? selectedPlatform.icon : <span className="mr-2"></span>}
                      {selectedPlatform ? selectedPlatform.label : <span className='text-sm '>Select Platform</span>}
                    </div>
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
                  </MenuButton>
                </div>
                <Menu.Items className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border">
                  <div className="">
                    {platformOptions.map((option, index) => (
                      <div key={option.value}>
                        <MenuItem>
                          {({ active }) => (
                            <div
                              onClick={() => {
                                setSelectedPlatform(option);
                                setErrors({ ...errors, platform: '' });
                              }}
                              className={`px-4 py-4 text-sm text-gray-700 flex w-full ${active ? 'bg-gray-100 text-gray-900' : ''}`}
                            >
                              <div className="flex items-center justify-center cursor-pointer hover:text-[#633CFF]">
                                <div className="text-xl">
                                  {option.icon}
                                </div>
                                <div className="text-xl ">
                                  {option.label}
                                </div>
                              </div>
                            </div>
                          )}
                        </MenuItem>
                        {index < platformOptions.length - 1 && <hr className="border-t border-gray-300 mx-4" />}
                      </div>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
              {errors.platform && <p className="text-red-600 text-sm">{errors.platform}</p>}
              <h1 className={`text-1xl ${errors.platform ? 'text-red-600' : ''}`}>Link</h1>

              <div className="relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="url"
                  value={newLink.url}
                  onChange={handleFormChange}
                  placeholder="https://example.com"
                  className={`block w-full rounded-md inputField bg-white px-3 py-3 text-xl text-[#737373] border ${errors.url ? 'border-red-600' : 'border-gray-300'}`} 
                />
                {errors.url && <p className="text-red-600 text-sm absolute right-2 top-1/2 transform -translate-y-1/2">{errors.url}</p>}
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img src="/images/Group 273.svg" className="max-w-full h-auto w-80" />
              <h2 className="text-5xl font-bold mb-2">Let's get you started</h2>
              <p className="text-[#737373] text-center pb-20 pt-10">
                Use the "Add new link" button to get started. Once you have more than one link, you can reorder and edit them. We're here to help you share your profile with everyone.
              </p>
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-b-lg flex justify-end p-4 lg:pr-8 lg:py-2">
          <button 
            onClick={handleFormSubmit}
            className="bg-[#633CFF] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#BEADFF] transition-colors duration-200 sm:w-full lg:w-auto"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default Customize;
