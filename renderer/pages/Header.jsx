import React from 'react';
import { IoMdNotificationsOutline } from "react-icons/io";
import { useRouter } from 'next/router';
import Link from 'next/link'; // Use Next.js Link for routing

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token from localStorage or state
    localStorage.removeItem('token'); 
    sessionStorage.removeItem('token'); // Optional, if using sessionStorage

    // Redirect to login page
    router.push('/Login');
  };

  return (
    <div>
      <div className='flex justify-end bg-[#f7f5f5]'>

        {/* Nav bar */}
        <div className='h-16 w-full flex justify-end'>

          {/* Notifications */}
          <div className='my-auto font-semibold mr-5'>
            <IoMdNotificationsOutline className="font-semibold" />
          </div>

          {/* Logout */}
          <div className='mr-5 mt-5 flex cursor-pointer' onClick={handleLogout}>
            <p className='ml-2  font-semibold'>Logout</p>
          </div>

          {/* Profile Logo */}
          <div className='h-10 w-10 border border-black rounded-full shadow-2xl flex justify-center my-auto mr-5 items-center'>
            <p className='flex justify-center items-center'>M</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
