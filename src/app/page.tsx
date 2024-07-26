'use client'
import { ReactNode, useState, useEffect } from 'react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseConfig';
import Navbar from '@/components/navbar/Navbar';
import AnimationWrapper from '@/components/common/AnimationWrapper';
import ProfileDetails from '@/components/profile/ProfileDetails';
import Customize from '@/components/customize/Customize';
import { Link } from '@/types/link';

const Home = () => {
  const [user, loading, error] = useAuthState(auth); // Include loading and error states
  const router = useRouter();
  const [view, setView] = useState('links');
  const [links, setLinks] = useState<Link[]>([]);
  const colors = ["#FF3939", "#333333", "#6336ff", "#Beadff", "#FF8C33", "#FAFAFA", "#8D493A"];

  const handleAddLink = (newLink: Link) => {
    setLinks((prevLinks) => [...prevLinks, newLink]);
  };

  useEffect(() => {
    console.log('User state changed:', { user, loading, error }); // Log user state
    if (loading) {
      console.log('Loading user authentication...');
      return;
    }
    if (error) {
      console.error('Error in authentication:', error);
      return;
    }
    if (!user) {
      console.log('User not authenticated. Redirecting to login...');
      router.push('/login');
    }
  }, [user, loading, error, router]);

  return (
    <>
      <Navbar setView={setView} />
      <AnimationWrapper keyValue="uniqueKey1">
        <div className={`m-8 flex flex-col lg:flex-row gap-8 h-screen`}>
          <div className="bg-white shadow-md rounded-xl w-full lg:w-[40%] pt-20 justify-center p-4 hidden lg:flex">
            <div className="flex flex-col w-[60%] gap-4">
              {links.length === 0 ? (
                <div className="w-full">
                  <img src="/images/Frame257.png" alt="Placeholder" className="h-[100%] w-[100%]" />
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-6 items-center mb-4">
                    <img 
                      src={user?.photoURL || "/default-profile.png"}
                      alt="Profile" 
                      className="w-24 h-24 rounded-full mb-2 mt-6" 
                    />
                    <div className="flex gap-2 justify-center items-center">
                      <p className="text-xl font-bold">{user?.displayName || "User Name"}</p>
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
                </>
              )}
            </div>
          </div>

          <div className="rounded-xl w-full lg:w-[60%] flex flex-col gap-2">
            {view === 'links' ? (
             <Customize onAddLink={handleAddLink} />
            ) : (
              <ProfileDetails />
            )}
          </div>
        </div>
      </AnimationWrapper>
    </>
  );
};

export default Home;
