import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';
import Papa from 'papaparse';


const ViewWorkOrder = () => {
    const [productData, setProductData] = useState("");
    const [users, setUsers] = useState([]); // State to store user data
    const [operators, setOperators] = useState([]);

    const router = useRouter();
    const { id } = router.query;
    console.log('Received ID: Effect', id);
   
   
    // Fetch data from API using Axios
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`http://localhost:4000/work-order/${id}`);
                setProductData(response.data);
                
                
                const data = response.data;
                console.log('API response:',data);

               

                                            

            } catch (error) {
                console.error('Error fetching data:', error);
                // console.error('Error fetching data:', error.response?.data || error.message);

                console.error(
                    'Full error details:',
                    error.response?.data || error.message,
                );
            }
        };

        fetchData();
    }, []);

 // Fetch Users Data
 useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/users/all`);
            setOperators(response.data.operator || []); // Ensure `operator` exists
            console.log('Users Data:', response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    fetchUsers();
}, []);
  
    return (
        <div className="flex">
            {/* Dashboard  */}
            <div className="">
                <Dashboard />
            </div>

            {/* Right side */}
            <div className="w-full overflow-hidden ">
                
                {/* Main Content */}
                <div className=" pb-10 h-screen overflow-y-auto bg-[#f7f5f5] border-black">
                    {/* Header */}
                    <div className="sticky top-0">
                        <Header />
                    </div>

                    {/* Main data  */}
                    <div className="w-[800px] mx-auto flex flex-col  py-10 mt-8 px-8 bg-[#ffffffe2] shadow-2xl rounded-2xl">
                    
                        <h1 className="flex justify-center text-2xl font-bold  text-[#7d40ff]">MES/WO/02/2025/001</h1>
                        <h1 className="flex justify-center text-gray-800 font-bold mt-1">Date : 13/02/2025</h1>
                        <div className='border border-[#7d40ff] w-full mt-4'></div> 

                           

                         {/* Component Description and Status */}
                        <div className='flex  mt-6'>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Customer Name :</strong> {productData.data?.product?.customer?.customer_name || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Item No :</strong> {productData.data?.product?.item_code || 'N/A'}</p>
                        </div>  

                        <div className='flex  mt-4  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Part Name :</strong> {productData.data?.product?.component_description || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Scheduled Machine Number :</strong> {productData.data?.product?.product_histories?.scheduled_machine_number || 'N/A'}</p>
                            {/* <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Raw Material Type :</strong> {productData.data?.workOrderRawMaterials?.material_type || 'N/A'}</p> */}
                        </div>
                         
                        
                        <div className='flex  mt-4  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Expected Quantity :</strong> {productData.data?.billing_address || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Mold Number :</strong> {productData.data?.product?.mold_no || 'N/A'}</p>
                        </div> 

                        {/* Table for Raw Material Details */}
                        <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-300 mt-6 mx-10">
                            <table className="min-w-full border border-gray-300 hadow-lg bg-white">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Raw Material Type</th>
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Name</th>
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.data?.workOrderRawMaterials?.map((material, index) => (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">{material.material_type || 'N/A'}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">{material.rawMaterial?.material_name || 'N/A'}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">{material.required_quantity || 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className='flex  mt-6'>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Used Machine Number :</label>
                                <input type="text" 
                                       placeholder='Enter Used Machine Number' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Finished Date :</label>
                                <input type="date" 
                                       placeholder='Enter Finished Date' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                        </div> 

                        <div className='flex  mt-4  '>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Shift / Date :</label>
                                <input type="date" 
                                       placeholder='Enter Shift / Date' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Operator Name :</label>
                                <select 
                                    id="operator"
                                    className='bg-gray-200 rounded-full outline-none border border-gray-400 mt-1 py-2 px-4 w-72'
                                >
                                    <option value="">-- Select Operator --</option>
                                    {operators.map((operator) => (
                                        <option key={operator.id} value={operator.id}>
                                            {operator.name}
                                        </option>
                                    ))}
                                </select>


                            </div>
                        </div>

                        <div className='flex  mt-6'>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Standard Qty :</label>
                                <input type="text" 
                                       placeholder='Enter Standard Qty' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Working Hrs :</label>
                                <input type="type" 
                                       placeholder='Enter Working Hrs' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                        </div> 
                        
                        <div className='flex  mt-4  '>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >OK Qty No's :</label>
                                <input type="text" 
                                       placeholder='Enter OK Qty No' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Rejected Qty No's :</label>
                                <input type="text" 
                                       placeholder='Enter Rejected Qty No' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                        </div>
                        
                        <div className='flex  mt-4  '>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Reason of Rejection :</label>
                                <input type="text" 
                                       placeholder='Enter Reason of Rejection' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Runner Kg's :</label>
                                <input type="text" 
                                       placeholder='Enter Runner kg' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72'/>
                            </div>
                        </div>
                        
                        <div className='flex  mt-4  '>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Lumps Kg's :</label>
                                <input type="text" 
                                       placeholder='Enter Lumps kg' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' 
                                       name="" id="" />
                            </div>
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Opeartor Efficiency (%) :</label>
                                 <input type="text" 
                                       placeholder='Enter Efficiency' 
                                       className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72'/>
                            </div>
                        </div>
                        
                        <div className='flex  mt-4  '>
                            
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="" className='text-gray-800 ml-1 font-bold' >Remark :</label>
                                <select 
                                name="" className='bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72' id="">
                                    <option value="Machine Breakdown" disabled>-- Select Remark --</option>
                                    <option value="Machine Breakdown">Machine Breakdown</option>
                                    <option value="Mold Breakdown">Mold Breakdown</option>
                                    <option value="No Man Power">No Man Power</option>
                                    <option value="Power off">Power off</option>
                                    <option value="RM Shortage">RM Shortage</option>
                                    <option value="No Plan">No Plan</option>
                                </select>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            className=" bg-[#7d40ff] mx-auto  rounded-full w-52 px-4 py-2.5 my-auto text-white mt-10"
                        >
                            Save
                        </button>


                    </div>
                </div>
            </div>
        </div>  
    );

};

export default ViewWorkOrder;
