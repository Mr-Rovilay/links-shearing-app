'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLongArrowAltRight } from "react-icons/fa";
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseConfig';
import { Link as LinkType } from '@/types/link';

const Preview = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [links, setLinks] = useState<LinkType[]>([]);
  const colors = ["#FF3939", "#333333", "#6336ff", "#Beadff", "#FF8C33", "#FAFAFA", "#8D493A"];


  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <>
      <div className="relative h-screen flex flex-col">
        <div className="hidden sm:block bg-[#633cff] h-1/2 w-full rounded-b-3xl"></div>
        <div className="bg-white h-1/2 w-full"></div>
        <nav className="absolute top-0 left-0 right-0 bg-white shadow-lg rounded-xl mx-8 mt-8 sm:px-11">
          <div className="flex items-center justify-between px-6 py-5">
            <Link href="/" passHref>
              <button className="border border-[#633cff] text-[#633cff] font-bold px-7 py-4 rounded-lg hover:bg-[#BEADFF]">
                Back to Editor
              </button>
            </Link>
            <button onClick={handleLogout} className="hidden sm:block border border-red-500 text-red-500 font-bold px-7 py-4 rounded-lg transition-transform transform hover:scale-105">
              Logout
            </button>
            <Link href="/share-link" passHref>
              <button className="bg-[#633CFF] text-white font-bold px-7 py-4 rounded-lg hover:bg-[#BEADFF] transition-colors duration-200">
                Share Link
              </button>
            </Link>
          </div>
        </nav>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-20 px-24 rounded-2xl shadow-xl max-w-sm mt-16 pb-auto">
          <div className="flex flex-col gap-6 items-center justify-center mb-12">
            <img 
              src={user?.photoURL || "/default-profile.png"}
              alt="Profile" 
              className="w-24 h-24 rounded-full mb-2 mt-6 shadow-md" 
            />
            <div className="flex gap-2 justify-center items-center">
              <p className="text-gray-600">{user?.displayName?.split(' ')[0] || "First Name"}</p>
              <p className="text-gray-600">{user?.displayName?.split(' ')[1] || "Last Name"}</p>
            </div>
            <p className="text-gray-600">{user?.email || "user.email@example.com"}</p>
          </div>
          
          {links.map((link, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-6 rounded-md shadow-sm"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <div className="flex justify-center items-center gap-2">
                <span className='text-white text-xl'>{link.icon}</span>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-white">{link.title}</a>
              </div>
              <div className="text-white">
                <FaLongArrowAltRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Preview;
