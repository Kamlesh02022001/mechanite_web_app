import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import Header from './Header';

const ProductionTable = () => {
    const router = useRouter();
    const id = router.query?.id;

    console.log("Product ID:", id); // Debugging

    const [productionData, setProductionData] = useState([]);
    const [productData, setProductData] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     
          const [token, setToken] = useState('');
        
          useEffect(() => {
            const storedToken = sessionStorage.getItem('authToken');
            
            if (storedToken) {
                setToken(storedToken);
               
            } else {
                router.replace('/'); // Redirect to login if no token
            }
        }, []);
           console.log("token", token);    

     // Fetch Production Data 
     
     useEffect(() => {
        if (!token || !id || !router.isReady) return;

        const fetchProductionData = async () => {
            try {
                const response = await axios.get(`https://machanite-be.onrender.com/work-order/get-operator-work-order/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                console.log("Full API Response:", response.data); // Debugging

                if (response.data && Array.isArray(response.data.data)) {
                    setProductionData([...response.data.data]); // Extract array from `data`
                } else {
                    console.error("API response does not contain an array:", response.data);
                    setProductionData([]);
                }
            } catch (err) {
                console.error("Error fetching production data:", err);

                if (err.response?.status === 401) {
                    setError("Unauthorized: Please log in again.");
                } else if (err.response?.status === 403) {
                    setError("Forbidden: Insufficient privileges.");
                } else {
                    setError("Failed to fetch production data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProductionData();
    }, [id, token, router.isReady]);


    // Fetch Work Order Data
    useEffect(() => {
        if (!token || !id) return;

        const fetchProductData = async () => {
            try {
                const response = await axios.get(`https://machanite-be.onrender.com/work-order/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProductData(response.data);
                console.log("Work Order Data:", response.data);
            } catch (err) {
                console.error("Error fetching work order data:", err);

                if (err.response?.status === 401) {
                    setError("Unauthorized: Please log in again.");
                } else if (err.response?.status === 403) {
                    setError("Forbidden: Insufficient privileges.");
                } else {
                    setError("Failed to fetch work order data.");
                }
            }
        };

        fetchProductData();
    }, [id, token]);
    return (
        <div className="flex">
            {/* Sidebar - Dashboard */}
            <div className="w-1/5 min-h-screen bg-gray-100">
                <Dashboard />
            </div>

            {/* Right Side */}
            <div className="w-4/5  h-screen overflow-y-auto  bg-[#f7f5f5]"> 
                {/* Header */}
                <div className="sticky top-0 bg-white">
                    <Header />
                </div>
                
                <div className="w-[1000px] mx-auto flex flex-col mr-5 py-10 px-8 bg-[#ffffffe2] shadow-2xl rounded-2xl">

               
                       
                `` <h1 className="flex justify-center text-2xl font-bold  text-[#7d40ff]">{productData.data?.work_order_no}</h1>
                            {/* <h1 className="flex justify-center text-gray-800 font-bold mt-1"> Date: {new Date().toLocaleDateString('en-GB')}</h1> */}
                            <h1 className="flex justify-center text-gray-800 font-bold mt-1">
                                Date: {new Date(selectedDate).toLocaleDateString('en-GB')}
                            </h1>

                            
                        
                            <div className='border border-[#7d40ff] w-full mt-4'></div> 

                            <div className='w-[800px] mx-auto'>                            

                            {/* Component Description and Status */}
                            <div className='flex  mt-6'>
                                <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Customer Name:</strong> {productData.data?.product?.customer?.customer_name || 'N/A'}</p>
                                <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Item No:</strong> {productData.data?.product?.item_code || 'N/A'}</p>
                            </div>  

                            <div className='flex  mt-4  '>
                                <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Part Name:</strong> {productData.data?.product?.component_description || 'N/A'}</p>
                                <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Scheduled Machine Number:</strong> {productData.data?.product?.product_histories?.scheduled_machine_number || 'N/A'}</p>
                                {/* <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Raw Material Type:</strong> {productData.data?.workOrderRawMaterials?.material_type || 'N/A'}</p> */}
                            </div>
                            
                            <div className='flex  mt-4  '>
                                <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Expected Quantity:</strong> {productData.data?.sales_order_quantity || 'N/A'}</p>
                                <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Mold Number:</strong> {productData.data?.product?.mold_no || 'N/A'}</p>
                            </div> 

                            {/* Table for Product */}
                            <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-300 mt-8 mx-10">
                                <table className="min-w-full border border-gray-300 shadow-lg bg-white">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Product Name</th>
                                            <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Stock Quantity</th>
                                            <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Required Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="hover:bg-gray-100">
                                            {/* ✅ Product Name */}
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">
                                                {productData.data?.product?.component_description || 'N/A'}
                                            </td>                        
                                            {/* ✅ Stock Quantity from stockDetail */}
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">
                                                {productData.data?.product?.stockDetail?.quantity || 'N/A'}
                                            </td>
                                            {/* ✅ Required Quantity */}
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">
                                                {productData.data?.expected_quantity || 'N/A'}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Table for Raw Material Details */}
                            <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-300 mt-6 mx-10">
                                <table className="min-w-full border border-gray-300 hadow-lg bg-white">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Raw Material Type</th>
                                            <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Name</th>
                                            <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Stock Quantity</th>
                                            <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Required Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {productData.data?.workOrderRawMaterials?.map((material, index) => {
                                        // Determine the unit based on material type
                                        let unit = "";
                                        if (material.material_type === "insert") {
                                            unit = "No";
                                        } else if (material.material_type === "material") {
                                            unit = "kg";
                                        } else if (material.material_type === "colour") {
                                            unit = "kg";
                                        }

                                        return (
                                            <tr key={index} className="hover:bg-gray-100">
                                                <td className="border border-gray-300 px-4 py-1.5 text-center">{material.material_type || 'N/A'}</td>
                                                <td className="border border-gray-300 px-4 py-1.5 text-center">{material.rawMaterial?.material_name || 'N/A'}</td>
                                                <td className="border border-gray-300 px-4 py-1.5 text-center">{material.rawMaterial?.quantity || 'N/A'}</td>
                                                <td className="border border-gray-300 px-4 py-1.5 text-center">
                                                    {material.required_quantity ? `${material.required_quantity} ${unit}`: 'N/A'}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    </tbody>
                                </table>
                            </div>
                            </div> 
                                    {/* Table Section */}
                            <div className="max-w-7xl mx-auto flex flex-col justify-center items-center  py-10">
                                <h1 className="text-4xl font-bold mb-6 text-[#7d40ff]">
                                    Production Report
                                </h1>

                                {/* Error Message */}
                                {error && <p className="text-red-500 text-lg">{error}</p>}

                                {/* Loading Message */}
                                {loading ? (
                                    <p className="text-lg text-gray-600">Loading data...</p>
                                ) : (
                                    <div className="overflow-x-auto w-full bg-white shadow rounded-lg">
                                        <table className="min-w-full border border-gray-300 rounded-lg">
                                            {/* Table Head */}
                                            <thead className="bg-[#7d40ff] text-white uppercase text-sm">
                                                <tr>
                                                    <th className="border border-gray-300 px-5 py-3 text-center">Operator Name</th>
                                                    <th className="border border-gray-300 px-2 py-2 text-center">Standard Qty</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">Working Hrs</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">OK Qty</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">Rejection Qty</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">Rejection Reason</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">Runner (kg)</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">Lumps (kg)</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">Efficiency (%)</th>
                                                    <th className="border border-gray-300 px-2 py-3 text-center">Remark</th>
                                                </tr>
                                            </thead>

                                            {/* Table Body */}
                                            <tbody>
                                                {productionData.length > 0 ? (
                                                    productionData.map((item, index) => {
                                                        console.log("Rendering Row:", item);
                                                        return (
                                                            <tr key={index} className={`text-gray-800 border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200 transition`}>
                                                                <td className="border border-gray-300 px-5 text-center">{item.operator?.name || "N/A"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.standard_qty || "0"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.working_hours || "0"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.ok_qty || "0"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.rejected_qty || "0"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.reason_of_rejection || "None"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.runners_kg || "0"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.lumps_kg || "0"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.efficiency || "0"}</td>
                                                                <td className="border border-gray-300 px-5 text-center">{item.remarks || "N/A"}</td>
                                                            </tr>
                                                        );
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan="10" className="text-center border border-gray-300 px-5 py-3 text-gray-500">
                                                            No data available
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                            </div>

               
            </div>
        </div>
    );
};

export default ProductionTable;
