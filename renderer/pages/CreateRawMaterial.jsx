import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import axios from 'axios';

const CreateRawMaterial = () => {
    const [materialType, setMaterialType] = useState('');
    const [vendor, setVendor] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        // Validation
        if (!materialType.trim()) {
            isValid = false;
            newErrors.materialType = 'Enter Material type.';
        }

        if (!vendor.trim()) {
            isValid = false;
            newErrors.vendor = 'Enter Vendor.';
        }

        if (!materialName.trim()) {
            isValid = false;
            newErrors.materialName = 'Enter Material Name.';
        }

        if (isValid) {
            setErrors({});
            setSuccessMessage('');
            setLoading(true);  // Start loading

            // API request using axios
            try {
                const response = await axios.post(
                    'https://machanite-be.onrender.com/raw-material/create',
                    {
                        material_type: materialType,  // Adjusted field names to match backend
                        material_name: materialName,  // Adjusted field names to match backend
                        vendor_name: vendor ,         // Adjusted field names to match backend
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                console.log("doonnnee")
                // Handle successful response
                setSuccessMessage('Material created successfully!');
                setMaterialType('');
                setVendor('');
                setMaterialName('');
                setApiError('');

            } catch (error) {
                console.error('Error response:', error.response);
                // Handle errors
                if (error.response) {
                    setApiError(error.response.data.message || 'Something went wrong!');
                } else {
                    setApiError('An error occurred while submitting the form.');
                }
            } finally {
                setLoading(false);  // End loading
            }
        } else {
            setErrors(newErrors);
            setSuccessMessage('');
        }
    };

    return (
        <div className='flex'>
            <Dashboard />

            {/* Right side */}
            <div className='w-full h-screen bg-[#f7f5f5]'>
                {/* Header */}
                <div className='sticky top-0'>
                    <Header />
                </div>

                {/* Main Content */}
                <div className='flex items-center flex-col justify-center pb-5 h-[615px] border-black'>
                    <div className='w-[600px] hl-72 -translate-y-2 flex flex-col justify-center items-center py-10 px- bg-[#ffffffe2] shadow-2xl rounded-2xl'>
                        <h1 className='flex justify-center text-2xl font-bold mt-1 text-[#7d40ff]'>Please enter material type and its quantity</h1>

                        <form action="" className='' onSubmit={handleSubmit}>
                            
                            <div className='flex flex-col  mt-8'>
                                <label htmlFor="materialType" className='text-gray-800 ml-1 font-semibold'>Material Type</label>
                                <select name="materialType"
                                    id="materialType" 
                                    value={materialType}
                                    onChange={(e) => setMaterialType(e.target.value)}
                                    className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72'>
                                    <option value="" disabled>Select Material Type</option>
                                    <option value="material">Material</option>
                                    <option value="colour">Colour</option>
                                    <option value="insert">Insert</option>
                                </select>
                                {errors.materialType && (
                                    <p className="text-red-500 text-sm mt-1">{errors.materialType}</p>
                                )}
                            </div>

                            <div className='flex flex-col order border-black mt-7'>
                                <label htmlFor="materialName" className='text-gray-800 ml-1 font-semibold'>Material Name</label>
                                <input type="text"
                                    value={materialName}
                                    placeholder='Enter Material Name'
                                    onChange={(e) => setMaterialName(e.target.value)}
                                    className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' />
                                {errors.materialName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.materialName}</p>
                                )}
                            </div>

                            <div className='flex flex-col order border-black mt-7'>
                                <label htmlFor="vendor" className='text-gray-800 ml-1 font-semibold'>Vendor</label>
                                <input type="text"
                                    placeholder='Enter Vendor'
                                    value={vendor}
                                    onChange={(e) => setVendor(e.target.value)}
                                    className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' />
                                {errors.vendor && (
                                    <p className="text-red-500 text-sm mt-1">{errors.vendor}</p>
                                )}
                            </div>

                            <div className='flex justify-center mb-2 mt-8'>
                                <button
                                    type="submit"
                                    className={`bg-[#7d40ff] rounded-full w-52 px-4 py-2 my-auto text-white mt-5 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={loading}
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>

                            {successMessage && (
                                <p className="text-green-500 flex justify-center text-lg mt-4">{successMessage}</p>
                            )}

                            {apiError && (
                                <p className="text-red-500 flex justify-center text-lg mt-4">{apiError}</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRawMaterial;
