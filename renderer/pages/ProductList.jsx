import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import Header from './Header';
import axios from 'axios';
import { IoSearchOutline } from "react-icons/io5";


const ProductList = () => {
    const [productData, setProductData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://machanite-be.onrender.com/api/get-all-products');
                setProductData(response.data);
                setFilteredData(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load product data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = productData.filter(product => 
            product.component_description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.mhc_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.item_code?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchTerm, productData]);

    const handleMoreClick = (product_id) => {
        router.push({
            pathname: '/ViewProduct',
            query: { product_id },
        });
    };

    return (
        <div className="flex">
            <Dashboard />
            <div className="w-full h-screen bg-[#f7f5f5] overflow-y-auto">
                <div className="sticky top-0">
                    <Header />
                </div>
                <div className="flex flex-col items-center px-10 pb-10">
                    <h1 className="text-4xl font-bold text-[#7d40ff] mt-3">Product List</h1>

                    <div htmlFor="searchTerm" className='w-2/5  flex mt-5 border  bg-[#ffffffe2] border-gray-300 rounded-xl'>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        id="searchTerm"
                        name="searchTerm"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=" px-4 py-2 focus:outline-none  rounded-xl w-full"
                    /> <IoSearchOutline   className=' translate-y-[11px] mr-3 text-gray-500 size-[20px]  '/>
                    </div>

                    {isLoading ? (
                        <p className="text-center text-xl text-gray-500 mt-10">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 mt-10">{error}</p>
                    ) : (
                        <div className="overflow-x-auto w-full rounded-xl mt-7">
                            <table className="min-w-full border-collapse border border-gray-300 rounded-3xl  bg-[#ffffffe2] ">
                                <thead>
                                    <tr className="bg-[#7d40ff] text-white">
                                        <th className="border border-gray-300 border-r-[#7d40ff] px-4 py-2 w-1/4">Product Name</th>
                                        <th className="border border-gray-300 px-4 border-r-[#7d40ff] py-2 w-1/4">MHC Number</th>
                                        <th className="border border-gray-300 px-4 border-r-[#7d40ff] py-2 w-1/4">Item Code</th>
                                        <th className="border border-gray-300 px-4  py-2 w-1/4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((product, index) => (
                                        <tr key={index} className="text-center border-b border-gray-300">
                                            <td className="border border-gray-300 border-r-white px-4 py-2 w-1/4">
                                                {product.component_description || 'No Description Available'}
                                            </td>
                                            <td className="border border-gray-300 border-r-white px-4 py-2 w-1/4">
                                                {product.mhc_no || 'No Data'}
                                            </td>
                                            <td className="border border-gray-300 border-r-white px-4 py-2 w-1/4">
                                                {product.item_code || 'No Data'}
                                            </td>
                                            <td className="border border-gray-300 border--white px-4 py-2 w-1/4">
                                                <button
                                                    onClick={() => handleMoreClick(product.id)}
                                                    className="font-semibold text-white  bg-[#7d40ff] rounded-lg px-4 py-1 hover:bg-[#5a2dcc]"
                                                >
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
