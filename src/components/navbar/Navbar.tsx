'use client'; 
import { useState } from 'react';
import { CgProfile } from "react-icons/cg";
import { BsLink } from "react-icons/bs";
import Link from "next/link";
import { HiOutlineEye } from "react-icons/hi";
import { GoLink } from "react-icons/go";

const Navbar = ({ setView }: { setView: (view: string) => void }) => {

  const [active, setActive] = useState("links");

  const handleNavigation = (view: string) => {
    setActive(view);
    setView(view);
  };

  return (
    <nav className="bg-white shadow-sm m-8 rounded-xl">
      <div className="mx-auto flex items-center justify-between p-8">
        <Link href="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="bg-[#633CFF] rounded-md text-white p-2">
              <BsLink />
            </div>
            <span className="font-bold text-2xl text-[#333333] hidden md:inline">devlinks</span>
          </div>
        </Link>
        
        <div className="flex space-x-4">
          <button
            className={`flex items-center space-x-2 py-4 px-8 rounded-md font-bold  text-base ${active === 'links' ? 'bg-[#efebff] text-[#633CFF]' : 'text-[#737373]'} text-[16px]'}`}
            onClick={() => handleNavigation('links')}
          >
            <GoLink className='text-xl'/>
            <span className='hidden md:inline'>Links</span>
          </button>
          <button
            className={`flex items-center space-x-2 py-2 px-4 rounded-md font-bold  ${active === 'profile' ? 'bg-[#efebff] text-[#633CFF]' : 'text-[#737373] hover:text-[#633CFF]'}`}
            onClick={() => handleNavigation('profile')}
          >
            <CgProfile className='text-xl'/>
            <span className="hidden md:inline text-1xl">Profile Details</span>
          </button>
        </div>
        
        <Link href="/preview" passHref>
          <p className="items-center justify-center space-x-2 text-[#633CFF] font-bold py-4 px-8 rounded-md border border-[#633CFF] hover:bg-[#efebff] hover:text-[#633CFF] hidden md:flex">
            <HiOutlineEye className="md:hidden" />
            <span className="hidden md:inline">Preview</span>
          </p>
        </Link>
        <div className="md:hidden py-3 px-5 rounded-md border border-[#633CFF] flex text-center justify-center">
          <Link href="/preview">
            <p>
              <HiOutlineEye className="text-[#633CFF] text-2xl " />
            </p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
