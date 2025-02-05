
import Link from 'next/link'; // Use Next.js Link for routing
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';

const AddRawMaterial = () => {
    const [materialName, setMaterialName] = useState('');
    const [loading, setLoading] = useState('');
    const [color, setColor] = useState('');
    const [selectInsert, setSelectInsert] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // const [materials, setMaterials] = useState([]); // For Material Names
    
    const router = useRouter();
    const product_id = router.query?.product_id; // Access the query parameter a19be957-579b-4ba2-8775-71993b7db8a7

    const [materials, setMaterials] = useState([]); 
        const [colors, setColors] = useState([]); 
        const [inserts, setInserts] = useState([]); 
    
    // const { product_id } = router.query;
    console.log("Productttt ID:", product_id); // Debugging line


    // Fetch data from API using Axios
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://machanite-be.onrender.com/raw-material/all'); // API endpoint
                const data = response.data;
                console.log(data);

                setMaterials(data.material || []);
                setColors(data.colour || []);
                setInserts(data.insert || []);               

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!materialName.trim()) {
            isValid = false;
            newErrors.materialName = 'Enter Material Name.';
        }

        if (!loading.trim()) {
            isValid = false;
            newErrors.loading = 'Enter %.';
        } else if (Number(loading) < 0 || Number(loading) > 100) {
            isValid = false;
            newErrors.loading = 'Efficiency must be a number between 0 and 100.';
        }

        if (!color.trim()) {
            isValid = false;
            newErrors.color = 'Enter Color.';
        }

        if (isCheckboxChecked && !selectInsert.trim()) {
            isValid = false;
            newErrors.selectInsert = 'Select Insert.';
        }

        if (isValid) {

            // const formdata ={
            //     product_id: product_id,
            //     colour : color,
            //     insert : selectInsert,
            //     material : materialName,
            // } ;

            const product_id = router.query?.product_id;
            const requestBody = {
                material_name: materialName,
                color: color,
                loading_percentage: Number(loading), // Ensure it's a number
                insert: isCheckboxChecked ? selectInsert : null, // Only include if checked
            };
    
            // const response = await axios.put(
            //     `https://machanite-be.onrender.com/create-product-raw-material/${product_id}`,
            //     requestBody
            // );
            const response = await axios.put(
                `https://machanite-be.onrender.com/api/create-product-raw-material/${product_id}`,
                requestBody
            );
    
            

            setErrors({});
            setSuccessMessage('Form submitted successfully!');
            console.log(product_id);
            router.push({
                pathname: '/StockDetails', // Page to navigate to
                query: { product_id : product_id }, // Parameters to pass
              });
            
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
                            Please select a name, color and insert
                        </h1>

                        <form action="" onSubmit={handleSubmit}>
                            <div className="flex flex-col order border-black mt-8">
                                <label htmlFor="materialName" className="text-gray-800 ml-1 font-semibold">
                                    Material Name
                                </label>
                                <select
                                    name="materialName"
                                    id="materialName"
                                    onChange={(e) => setMaterialName(e.target.value)}
                                    className="bg-gray-200 rounded-full focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72"
                                >
                                    <option value="" disabled selected>
                                        -- Select Material --
                                    </option>
                                    {materials.map((mat) => (
                                        <option key={mat.material_name} value={mat.material_name}>
                                        {mat.material_name}
                                    </option>
                                    ))}
                                </select>
                                {errors.materialName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.materialName}</p>
                                )}
                            </div>

                            <div className="flex flex-col order border-black mt-7">
                                <label htmlFor="color" className="text-gray-800 ml-1 font-semibold">
                                    Material Color
                                </label>
                                <select
                                    name="color"
                                    id="color"
                                    onChange={(e) => setColor(e.target.value)}
                                    className="bg-gray-200 rounded-full focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72"
                                >
                                    <option value="" disabled selected>
                                        -- Select Color --
                                    </option>
                                    {colors.map((col) => (
                                        <option key={col.material_name} value={col.material_name}>
                                             {col.material_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.color && (
                                    <p className="text-red-500 text-sm mt-1">{errors.color}</p>
                                )}
                            </div>

                            <div className="flex flex-col order border-black mt-7">
                                <label htmlFor="loading" className="text-gray-800 ml-1 font-semibold">
                                    Master Batch Loading %
                                </label>
                                <input
                                    type="%"
                                    id="loading"
                                    placeholder="Enter Percentage of loading"
                                    onChange={(e) => setLoading(e.target.value)}
                                    className="bg-gray-200 rounded-full focus:outline-none  border border-gray-400 mt-1  py-2 px-4 w-72"
                                />
                                {errors.loading && (
                                    <p className="text-red-500 text-sm mt-1">{errors.loading}</p>
                                )}
                            </div>

                            <div className="mt-7">
                                <input
                                className='focus:outline-none  border border-gray-400'
                                    type="checkbox"
                                    name="addInsert"
                                    id="addInsert"
                                    onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                                />
                                <label htmlFor="addInsert" className="ml-2  text-gray-800 font-semibold">
                                    Add Insert
                                </label>
                            </div>

                            {isCheckboxChecked && (
                                <div className="flex flex-col order border-black mt-5">
                                    <label htmlFor="selectInsert" className="text-gray-800 ml-1 font-semibold">
                                        Select Insert
                                    </label>
                                    <select
                                        name="selectInsert"
                                        id="selectInsert"
                                        onChange={(e) => setSelectInsert(e.target.value)}
                                        className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                                    >
                                        <option value="" disabled selected>
                                            -- Select Insert --
                                        </option>
                                        {inserts.map((ins) => (
                                            <option key={ins.material_name} value={ins.material_name}>
                                            {ins.material_name}
                                        </option>
                                    ))}
                                    </select>
                                    {errors.selectInsert && (
                                        <p className="text-red-500 text-sm mt-1">{errors.selectInsert}</p>
                                    )}
                                </div>
                            )}
     {/* PRODUCT ID */}
    {/* <p>{product_id ? `Product ID: ${product_id}` : 'No Product ID Found'}</p> */}
                            <div className="flex justify-center mb-2 mt-8">
                                <button className="bg-[#7d40ff] rounded-full w-52 px-4 py-2 my-auto text-white mt-5">
                                    Submit
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

export default AddRawMaterial;
