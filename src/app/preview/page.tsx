'use client';

import React from 'react';
import Link from 'next/link';
import { FaLongArrowAltRight } from "react-icons/fa";
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebaseConfig';

const Preview = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    sessionStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <>
      <div className="relative h-screen flex flex-col">
        <div className="bg-[#633cff] h-1/2 w-full"></div>
        <div className="bg-white h-1/2 w-full"></div>
        <nav className="absolute top-0 left-0 right-0 bg-white shadow-lg rounded-xl mx-8 mt-8 sm:px-11">
          <div className="flex items-center justify-between p-8">
            <Link href="/" passHref>
              <button className="border border-[#633cff] text-[#633cff] font-bold px-7 py-4 rounded-lg transition-transform transform hover:scale-105">
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white py-16 px-20 rounded-2xl shadow-xl max-w-md mt-28">
          <div className="flex flex-col gap-6 items-center mb-12">
            <img 
              src={user?.photoURL || "/default-profile.png"}
              alt="Profile" 
              className="w-24 h-24 rounded-full mb-2 mt-6 shadow-md" 
            />
            <p className="text-2xl font-bold text-gray-800">{user?.displayName || "User Name"}</p>
            <p className="text-gray-600">{user?.email || "user.email@example.com"}</p>
          </div>
          
          <div className="flex items-center justify-between p-6 rounded-md shadow-inner bg-gray-100 w-full">
            <div className="flex justify-center items-center gap-2">
              <span className='text-black text-xl'>link icon</span>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#633cff] transition-colors">
                link label
              </a>
            </div>
            <div className="text-black">
              <FaLongArrowAltRight />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preview;
