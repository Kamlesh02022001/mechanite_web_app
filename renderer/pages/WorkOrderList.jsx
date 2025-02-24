import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import Header from './Header';
import axios from 'axios';

const WorkOrderList = () => {
    // const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState([]); // Ensure initial value is an array


    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/work-order/all');
    
                console.log("API Response:", response.data); // Debugging output
    
                // Extract the correct array from the response
                if (Array.isArray(response.data.data)) {
                    setProductData(response.data.data);
                } else {
                    console.error("Expected an array but got:", response.data);
                    setProductData([]); // Fallback to an empty array
                }
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load work orders.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);
    
    

    const handleMoreClick = (id) => {
        router.push({
            pathname: '/ViewWorkOrder',
            query: {  id },
        });
         
       
    };

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <Dashboard />

                {/* Main Content */}
                <div className="w-full h-screen bg-[#f7f5f5] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0">
                        <Header />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex items-center flex-col px-5 pb-10">
                        <h1 className="text-4xl font-bold text-[#7d40ff] mt-5">Work Order List</h1>

                        {/* Loading or Error */}
                        {isLoading ? (
                            <p className="text-center text-xl text-gray-500 mt-10">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-red-500 mt-10">{error}</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-7">
                                {/* Map through customer data */}
                                {Array.isArray(productData) && productData.map((workOrder, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col px-5 pb-8 pt-10 shadow-2xl rounded-2xl bg-[#ffffffe2] w-[400px] h-auto"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <p>
                                                <strong className="text-gray-800 font-bold">Product Name :</strong>{' '}
                                                {workOrder.product?.component_description || 'No Description Available'}
                                            </p>
                                            <p>
                                                <strong className="text-gray-800 font-bold">Start Date :</strong>{' '}
                                                {new Date(workOrder.createdAt).toISOString().split("T")[0] || 'No Description Available'}
                                            </p>
                                            
                                        </div>

                                        <div className="mt-7 flex justify-center">
                                            <button
                                                onClick={() => handleMoreClick(workOrder.id)}
                                                className="font-semibold text-white bg-[#7d40ff] rounded-2xl px-5 py-1"
                                            >
                                                More
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkOrderList;
