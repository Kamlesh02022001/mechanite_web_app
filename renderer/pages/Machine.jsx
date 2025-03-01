

import Link from 'next/link'; // Use Next.js Link for routing
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';

const Machine = () => {
    const [machine, setMachine] = useState('');
    const [production, setProduction] = useState('');
    const [mgfBy, setMgfBy] = useState('');
    const [owner, setOwner] = useState('');
    const [machineNumber, setMachineNumber] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message
    const router = useRouter();
    const [token, setToken] = useState('');
            
              useEffect(() => {
                const storedToken = sessionStorage.getItem('authToken');
                
                if (storedToken) {
                    setToken(storedToken);
                   
                } else {
                    router.replace('/'); // Redirect to login if no token
                }
            }, []);
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!machine.trim()) {
            isValid = false;
            newErrors.machine = 'Enter Machine Number.';
        }

        if (isValid) {
            setErrors({});
            setSuccessMessage('Form submitted successfully!');
            const formData ={
                // product_id : product_id,
                machine_name : machine,
            };
            try {
                const response = await axios.post('https://machanite-be.onrender.com/machine/create',formData,{
                    headers: { Authorization: `Bearer ${token}` }, // ✅ Include token in headers
                }); 
                setSuccessMessage('Form submitted successfully!');
                console.log(formData,"hist");
                console.log(response.data);
                // router.push({
                //     pathname: '/ViewProduct', // Page to navigate to
                //     query: { product_id : product_id }, // Parameters to pass
                //   });
             
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
                        <h1 className="flex justify-center text-2xl font-bold mt-1 text-[#7d40ff]">
                            Please enter a machine name and its number
                        </h1>

                        <div className="flex flex-col order border-black mt-8">
                                <label htmlFor="machine" className="text-gray-800 ml-1 font-semibold">
                                    Machine Name
                                </label>
                                <input type="text"
                                       id='machine'
                                       onChange={(e) => setMachine(e.target.value)}
                                       value={machine}
                                       className='bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72'
                                       placeholder='Enter Machine Name'
                                />
                                {errors.machine && (
                                    <p className="text-red-500 text-sm mt-1">{errors.machine}</p>
                                )}
                            </div>

                            <div className="flex justify-center mb-2 mt-5">
                                <button onClick={handleSubmit} className="bg-[#7d40ff] rounded-full w-40 px-4 py-2 my-auto text-white mt-5">
                                    Submit
                                </button>
                            </div>
                            {successMessage && (
                                <p className="text-green-500 flex justify-center text-lg mt-4">
                                    {successMessage}
                                </p>
                            )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Machine;
