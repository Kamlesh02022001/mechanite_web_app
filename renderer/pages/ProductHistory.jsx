
import Link from 'next/link'; // Use Next.js Link for routing
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';

const ProductHistory = () => {
    const [mfgYear, setMfgYear] = useState('');
    const [production, setProduction] = useState('');
    const [mgfBy, setMgfBy] = useState('');
    const [owner, setSelectInsert] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
        const [errorMessage, setErrorMessage] = useState(""); // State to store error message
    
    const router = useRouter();
    const product_id = router.query?.product_id; // Access the query parameter
    // const { product_id } = router.query;
    console.log("Productttt ID:", product_id); // Debugging line



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!mfgYear.trim()) {
            isValid = false;
            newErrors.mfgYear = 'Enter MFG Year.';
        }

        if (!production.trim()) {
            isValid = false;
            newErrors.production = 'Enter Production Till Now.';
        } 

        if (!mgfBy.trim()) {
            isValid = false;
            newErrors.mgfBy = 'Select Manufacturer.';
        }

        if ( !owner.trim()) {
            isValid = false;
            newErrors.owner = 'Select Owner.';
        }

        if (isValid) {
            setErrors({});
            setSuccessMessage('Form submitted successfully!');
            const formData ={
                product_id : product_id,
                mfg_year: mfgYear,
                mfg_by: mgfBy,
                ownership: owner,
                
                production_history : production,

            };
            try {
                const response = await axios.post('https://machanite-be.onrender.com/productHistory/create',formData); 
                setSuccessMessage('Form submitted successfully!');
                router.push({
                    pathname: '/ViewProduct', // Page to navigate to
                    query: { product_id : product_id }, // Parameters to pass
                  });
             
            } catch (error){
                setErrorMessage("There was an error submitting the form. Please try again.");
                setSuccessMessage("");
                console.log(error);
                if (error.response) {
                    console.error("Response Data:", error.response.data);
                    console.error("Response Status:", error.response.status);
                  }
            }
                        
        } else {
            setErrors(newErrors);
            setSuccessMessage('');
        }
    };

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

                    {/* Material data  */}
                    <div className="w-[600px] mx-auto flex flex-col justify-center items-center py-10 bg-[#ffffffe2] shadow-2xl rounded-2xl">
                        <h1 className="flex justify-center text-3xl font-bold mt-1 text-[#7d40ff]">
                            Product History
                        </h1>

                        <form action="" >
                            <div className="flex flex-col order border-black mt-8">
                                <label htmlFor="mfgYear" className="text-gray-800 ml-1 font-semibold">
                                    MFG Year
                                </label>
                                <input type="text"
                                       id='mfgYear'
                                       onChange={(e) => setMfgYear(e.target.value)}
                                       value={mfgYear}
                                       className='bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72'
                                       placeholder='Enter Year of Manufacturing'
                                />
                                {errors.mfgYear && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mfgYear}</p>
                                )}
                            </div>

                            <div className="flex flex-col order border-black mt-7">
                                <label htmlFor="mgfBy" className="text-gray-800 ml-1 font-semibold">
                                    MFG By
                                </label>
                                <select
                                    name="mgfBy"
                                    id="mgfBy"
                                    onChange={(e) => setMgfBy(e.target.value)}
                                    value={mgfBy}
                                    className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                                >
                                    <option value="" disabled selected>
                                        -- Select Manufacturer --
                                    </option>
                                    <option value="mechanite" >
                                        Mechanite 
                                    </option>
                                    <option value="customer" >
                                        Customer
                                    </option>
                                    <option value="third party" >
                                        Third Party
                                    </option>
                                    
                                    
                                </select>
                                {errors.mgfBy && (
                                    <p className="text-red-500 text-sm mt-1">{errors.mgfBy}</p>
                                )}
                            </div>

                            <div className="flex flex-col order border-black mt-5">
                                    <label htmlFor="owner" className="text-gray-800 ml-1 font-semibold">
                                        Ownership                                    </label>
                                    <select
                                        name="owner"
                                        id="owner"
                                        value={owner}
                                        onChange={(e) => setSelectInsert(e.target.value)}
                                        className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                                    >
                                        <option value="" disabled selected>
                                        -- Select Owner --
                                        </option>
                                        <option value="mechanite" >
                                            Mechanite 
                                        </option>
                                        <option value="customer" >
                                            Customer
                                        </option>
                                        <option value="third party" >
                                            Third Party
                                        </option>
                                    </select>
                                    {errors.owner && (
                                        <p className="text-red-500 text-sm mt-1">{errors.owner}</p>
                                    )}
                                </div>

                            <div className="flex flex-col order border-black mt-7">
                                <label htmlFor="production" className="text-gray-800 ml-1 font-semibold">
                                    Production Till Now
                                </label>
                                <input
                                    type="%"
                                    id="production"
                                    placeholder="Enter Production Till Now"
                                    onChange={(e) => setProduction(e.target.value)}
                                    className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                                />
                                {errors.production && (
                                    <p className="text-red-500 text-sm mt-1">{errors.production}</p>
                                )}
                            </div>

     {/* PRODUCT ID */}
    {/* <p>{product_id ? `Product ID: ${product_id}` : 'No Product ID Found'}</p> */}
                            <div className="flex justify-center mb-2 mt-7">
                                <button onClick={handleSubmit} className="bg-[#7d40ff] rounded-full w-52 px-4 py-2 my-auto text-white mt-5">
                                    Submit
                                </button>
                            </div>
                            <div className="flex justify-center mb-2 mt-">
                                <button onClick={""} className="bg-[#7d40ff] rounded-full w-52 px-4 py-2 my-auto text-white mt-5">
                                    View
                                </button>
                            </div>
                            {successMessage && (
                                <p className="text-green-500 flex justify-center text-lg mt-4">
                                    {successMessage}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductHistory;
