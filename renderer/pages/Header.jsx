import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";

const Header = () => {
  return (
    <div>
       <div className=' flex justify-end bg-[#f7f5f5]'>

        {/* Nav bar */}
        <div className='h-16  w-full flex justify-end'>
            {/* settings */}
            <div className=' my-auto mr-10 '>
                <IoMdNotificationsOutline />
            </div>
            {/* logo */}
            <div className='h-10 w-10 border border-black rounded-full shadow-2xl flex justify-center my-auto mr-5 items-center'>
                <p className='flex justify-center items-center '>m</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Header