import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import Link from 'next/link';
import { AiOutlineDashboard } from "react-icons/ai";
import { IoAnalytics, IoPricetags, IoPricetagSharp, IoCutOutline } from "react-icons/io5";
import { FaInbox } from "react-icons/fa";
import { BiSolidBox } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi2";
import { LuBox } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
// import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem('authToken');

    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode(storedToken);
        console.log("Decoded Token:", decoded);
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        sessionStorage.removeItem('authToken');
        router.replace('/');
      }
    } else {
      router.replace('/');
    }
  }, []);

  // Check if user role is "operator"
  const isOperator  = user?.role === 'operator';
  const isAdmin = user?.role === 'admin';
  const isSuperviser = user?.role === 'supervisor';

  return (
    <div className='flex'>
      <div className='bg-[#592fb4] w-64 h-screen overflow-y-auto pb-11 flex flex-col pl-4'>
        <div className='text-white mt-7 mb-2 text-2xl flex font-bold'>Mechanite</div>

        <div className='mt-5'>
          <p className='text-gray-100 ml- font-mono'>MAIN</p>

          {/* {(isSuperviser || isOperator || isAdmin) && ("")} */}
          {/* {(isSuperviser || isOperator || isAdmin) && ()} */}
            <>
            {(isSuperviser  || isAdmin) && ( <div className='ml- mt-3 text-sm font-light text-gray-200 flex'>
                <AiOutlineDashboard className='mt-[3px]' />
                <p className='ml-2 '><Link href="/AddProduct">Add Product</Link></p>
              </div>)}

            {(isSuperviser || isOperator || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
              <BiSolidBox className='mt-[3px]' />
              <p className='ml-2 '><Link href="/ProductList">Product List</Link></p>
            </div>)}
             
            {(isSuperviser  || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <IoAnalytics className='mt-[3px]' />
                <p className='ml-2 '><Link href="/Customers">Create Customer</Link></p>
              </div>)}
             
              
              
              {(isSuperviser  || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <IoAnalytics className='mt-[3px]' />
                <p className='ml-2 '><Link href="/CustomerList">Customer List</Link></p>
              </div>)}
              
              
              {(isSuperviser  || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <IoAnalytics className='mt-[3px]' />
                <p className='ml-2 '><Link href="/Vendor">Create Vendor</Link></p>
              </div>)}
              
              
              {(isSuperviser || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <IoAnalytics className='mt-[3px]' />
                <p className='ml-2 '><Link href="/VendorList">Vendor List</Link></p>
              </div>)}
              
              
              {(isSuperviser  || isAdmin) && ( <div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <MdEmail className='mt-[3px]' />
                <p className='ml-2 '><Link href="/SalesOrder">Create Sales Order</Link></p>
              </div>)}
             
              
              {(isSuperviser || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <MdEmail className='mt-[3px]' />
                <p className='ml-2 '><Link href="/SalesList">Sales Order List</Link></p>
              </div>)}

              
            </>
          
          
          
            {(isSuperviser || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
            <FaInbox className='mt-[3px]' />
            <p className='ml-2 '><Link href="/Machine">Machine </Link></p>
          </div>)}

            {(isSuperviser || isOperator || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
            <FaInbox className='mt-[3px]' />
            <p className='ml-2 '><Link href="/MachineList">Machine List</Link></p>
          </div>)}

           {(isSuperviser || isOperator || isAdmin) && (<div className='ml- mt-3 text-sm font-light text-gray-200 flex'>
            <IoPricetagSharp className='mt-[3px]' />
            <p className='ml-2 '><Link href="/WorkOrderList">Work Order List</Link></p>
          </div>)}

          {(isSuperviser  || isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <HiUserGroup className='mt-[3px]' />
                <p className='ml-2 '><Link href="/CreateRawMaterial">Create Raw Material</Link></p>
              </div>)}

           {(isSuperviser || isOperator || isAdmin) && (<div className='ml- mt-3 text-sm font-light text-gray-200 flex'>
            <IoPricetagSharp className='mt-[3px]' />
            <p className='ml-2 '><Link href="/RawMaterialList">Raw Material List</Link></p>
          </div>)}
          

         
            <div className='mt-7'>
              
              {/* <p className='text-gray-100 ml- font-mono'>Additional Pages</p> */}
              
               {( isAdmin) && ( 
                
                <div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <MdEmail className='mt-[3px]' />
                <p className='ml-2 '><Link href="/AddRawMaterial">Add Raw Material</Link></p>
              </div>)}

              {( isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <MdEmail className='mt-[3px]' />
                <p className='ml-2 '><Link href="/StockDetails">Stock Details</Link></p>
              </div> )}
              
               {( isAdmin) && (<div className='ml- mt-4 text-sm font-light text-gray-200 flex'>
                <IoCutOutline className='mt-[3px]' />
                <p className='ml-2 '><Link href="/ProductHistory">Product History</Link></p>
              </div> )}
              
            </div>
         
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
