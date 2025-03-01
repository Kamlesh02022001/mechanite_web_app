import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import axios from 'axios';
import { TiVendorAndroid } from 'react-icons/ti';
import { useRouter } from 'next/router';

const CreateRawMaterial = () => {
    const [materialType, setMaterialType] = useState('');
    const [vendor, setVendor] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [vendors, setVendors] = useState([]); // Store vendors from API
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [quantity, setQuantity] = useState('');

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
       console.log("token", token);
    

    // Fetch vendors from API when component mounts
    useEffect(() => {
        if(!token){return;}
        const fetchVendors = async () => {
            try {
                const response = await axios.get('https://machanite-be.onrender.com/vendor/all', {
                    headers: { Authorization: `Bearer ${token}` }, // ✅ Include token in headers
                });
                setVendors(response.data); // Assuming response.data is an array of vendors
                console.log(vendors)
            } catch (error) {
                console.error('Error fetching vendors:', error);
                setApiError('Failed to load vendors.');
            }
        };

        fetchVendors();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!materialType.trim()) {
            isValid = false;
            newErrors.materialType = 'Enter Material type.';
        }
        if (!quantity.trim()) {
            isValid = false;
            newErrors.quantity = 'Enter Quantity.';
        }
        if (!vendor.trim()) {
            isValid = false;
            newErrors.vendor = 'Select Vendor.';
        }
        if (!materialName.trim()) {
            isValid = false;
            newErrors.materialName = 'Enter Material Name.';
        }

        if (isValid) {
            setErrors({});
            setSuccessMessage('');
            setLoading(true);

            try {
                const response = await axios.post(
                    'https://machanite-be.onrender.com/raw-material/create',
                    {
                        material_type: materialType,
                        material_name: materialName,
                        vendor_id: vendor, 
                        quantity: quantity, 
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                setSuccessMessage('Material created successfully!');
                setMaterialType('');
                setVendor('');
                setMaterialName('');
                setApiError('');
                setQuantity('');

            } catch (error) {
                console.error('Error response:', error.response);
                setApiError(error.response?.data?.message || 'Something went wrong!');
                
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(newErrors);
            setSuccessMessage('');
        }
    };

    return (
        <div className='flex'>
            <Dashboard />
            <div className='w-full h-screen bg-[#f7f5f5]'>
                <div className='sticky top-0'>
                    <Header />
                </div>

                <div className='flex items-center flex-col justify-center pb-5 h-[615px] border-black'>
                    <div className='w-[600px] hl-72 -translate-y-2 flex flex-col justify-center items-center py-10 px- bg-[#ffffffe2] shadow-2xl rounded-2xl'>
                        <h1 className='flex justify-center text-2xl font-bold mt-1 text-[#7d40ff]'>
                            Please enter material type and its quantity
                        </h1>

                        <form onSubmit={handleSubmit}>
                            <div className='flex flex-col mt-8'>
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
                                {errors.materialType && <p className="text-red-500 text-sm mt-1">{errors.materialType}</p>}
                            </div>

                            <div className='flex flex-col order border-black mt-7'>
                                <label htmlFor="materialName" className='text-gray-800 ml-1 font-semibold'>Material Name</label>
                                <input type="text"
                                    value={materialName}
                                    placeholder='Enter Material Name'
                                    onChange={(e) => setMaterialName(e.target.value)}
                                    className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' />
                                {errors.materialName && <p className="text-red-500 text-sm mt-1">{errors.materialName}</p>}
                            </div>

                            {/* Updated Vendor Selection */}
                            <div className='flex flex-col order border-black mt-7'>
                                <label htmlFor="vendor" className='text-gray-800 ml-1 font-semibold'>Vendor</label>
                                <select name="vendor"
                                    id="vendor"
                                    value={vendor}
                                    onChange={(e) => setVendor(e.target.value)}
                                    className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72'>
                                    <option value="" disabled>Select Vendor</option>
                                    {vendors.map((vendor) => (
                                        <option key={vendor.id} value={vendor.id}>{vendor.vendor_name}</option> // Adjust according to API response
                                    ))}
                                </select>
                                {errors.vendor && <p className="text-red-500 text-sm mt-1">{errors.vendor}</p>}
                            </div>

                            <div className='flex flex-col order border-black mt-7'>
                                <label htmlFor="quantity" className='text-gray-800 ml-1 font-semibold'>Quantity</label>
                                <input type="number"
                                    value={quantity}
                                    placeholder='Enter Quantity'
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' />
                                {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>}
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

                            {successMessage && <p className="text-green-500 flex justify-center text-lg mt-4">{successMessage}</p>}
                            {apiError && <p className="text-red-500 flex justify-center text-lg mt-4">{apiError}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateRawMaterial;
