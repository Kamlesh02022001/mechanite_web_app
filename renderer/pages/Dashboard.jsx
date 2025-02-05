import React from 'react';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoAnalytics } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";
import { BiSolidBox } from "react-icons/bi";
import { IoPricetagSharp, IoPricetags, IoCutOutline } from "react-icons/io5";
import { CgToolbox } from "react-icons/cg";
import { HiUserGroup } from "react-icons/hi2";
import { LuBox } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import Link from 'next/link'; // Use Next.js Link for routing

const Dashboard = () => {
  
  return (
    // Main div
    <div className='flex'>
      {/* Left sidebar  bg-[#0b0f24fa]*/}
      <div className='bg-[#592fb4] w-64 h-screen pb-11 flex flex-col pl-4'>
        {/* Heading */}
        <div className='text-white mt-7 mb-2 text-2xl flex ml- font-bold'>
          Machanite
        </div>

        {/* Main option */}
        <div className=' mt-5'>
          <p className='text-gray-100 ml- font-mono'>MAIN</p>

          <div className=' ml- mt-3 text-sm font-light text-gray-200 flex'>
            <AiOutlineDashboard className='mt-[3px]' />
            <p className='ml-2 '><Link href="/Home">DashBoard</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <FaInbox className='mt-[3px]' />
            <p className='ml-2 '><Link  href="/Login"  >Login</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <IoAnalytics className='mt-[3px]' />
            <p className='ml-2 '><Link href="/AddProduct">Add Product</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <BiSolidBox className='mt-[3px]' />
            <p className='ml-2 '><Link href="/ProductList">Product List</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <IoPricetags className='mt-[3px]' />
            <p className='ml-2 '><Link href="/Vendor">Vendor</Link></p>
          </div>
          
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <IoCutOutline className='mt-[3px]' />
            <p className='ml-2 '><Link href="/VendorInfo">Vendor Info</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <MdEmail className='mt-[3px]' /> 
            <p className='ml-2 '><Link href="/VendorList">Vendor List</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <HiUserGroup className='mt-[3px]' />
            <p className='ml-2 '><Link href="/Customers">Customers</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <MdEmail className='mt-[3px]' />
            <p className='ml-2 '><Link href="/PurchaseOrder">Purchase Order</Link></p>
          </div>
          <div className=' ml- mt-3 text-sm font-light text-gray-200 flex'>
            <IoPricetagSharp className='mt-[3px]' />
            <p className='ml-2 '><Link href="/StockDetails">Stock Details</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <MdEmail className='mt-[3px]' />
            <p className='ml-2 '><Link href="/ProductHistory">Product History</Link></p>
          </div>
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <MdEmail className='mt-[3px]' />
            <p className='ml-2 '><Link href="/ViewProduct">View Product </Link></p>
          </div>
        </div>

        {/* Sales channel */}
        <div className='mt-7'>
          <p className='text-gray-100 ml- font-mono'>SALES CHANNELS</p>
          <div className=' ml- mt-3 text-sm font-light text-gray-200 flex'>
            <LuBox className='mt-[3px]' />
            <p className='ml-2 '><Link href="/Temp">Temp</Link></p>
          </div>
          
          <div className=' ml- mt-4 text-sm font-light text-gray-200 flex'>
            <MdEmail className='mt-[3px]' />
            <p className='ml-2 '><Link href="/CustomerInfo">Customer Info</Link></p>
          </div>
         
         
          
         
        </div>    
      </div>
    </div>
  );
};

export default Dashboard;

