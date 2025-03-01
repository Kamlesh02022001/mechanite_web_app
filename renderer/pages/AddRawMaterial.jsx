import Link from 'next/link'; // Use Next.js Link for routing
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';
import { FaPlus, FaTrash } from "react-icons/fa";

const AddRawMaterial = () => {
    const [materialName, setMaterialName] = useState('');
    const [loading, setLoading] = useState('');
    const [color, setColor] = useState('');
    const [selectInsert, setSelectInsert] = useState('');
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]); 
    const [showSelectedMaterials, setShowSelectedMaterials] = useState(false);
    const [selectedInserts, setSelectedInserts] = useState([]);
const [showSelectedInserts, setShowSelectedInserts] = useState(false);
const [insertQuantity, setInsertQuantity] = useState('');



    const router = useRouter();
    const product_id = router.query?.product_id ;
    const [token, setToken] = useState('');
    const [materials, setMaterials] = useState([]);
    const [colors, setColors] = useState([]);
    const [inserts, setInserts] = useState([]);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        } else {
            router.replace('/'); // Redirect to login if no token
        }
    }, []);

     

    const handleAddInsert = () => {
        if (!selectInsert || !insertQuantity.trim()) return;
    
        if (selectedInserts.some((item) => item.insertId === selectInsert)) {
            setErrors((prevErrors) => ({ ...prevErrors, selectInsert: "Insert already added." }));
            return;
        }
    
        setSelectedInserts([...selectedInserts, { insertId: selectInsert, quantity: insertQuantity }]);
        setShowSelectedInserts(true);
        setErrors((prevErrors) => ({ ...prevErrors, selectInsert: null })); // Clear error
        setInsertQuantity(''); // Reset quantity field after adding
    };
    
    const handleRemoveInsert = (index) => {
        const updatedInserts = selectedInserts.filter((_, i) => i !== index);
        setSelectedInserts(updatedInserts);
    };
    
    
    

    useEffect(() => {
        if (!token) {
            console.error("Authorization token is missing.");
            return;
        }
    
        const fetchData = async () => {
            try {
                const response = await axios.get('https://machanite-be.onrender.com/raw-material/all', {
                    headers: { Authorization: `Bearer ${token}` }, // ✅ Include token in headers
                });
    
                const data = response.data;
                console.log("Fetched Raw Materials:", data);
                
                setMaterials(data.material || []);
                setColors(data.colour || []);
                setInserts(data.insert || []);
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
    
                const errorMessage = error.response?.status === 401
                    ? "Unauthorized: Please log in again."
                    : error.response?.status === 403
                    ? "Forbidden: Insufficient privileges."
                    : "Failed to fetch raw materials. Please try again.";
    
                alert(errorMessage);
            }
        };
    
        fetchData();
    }, [token]); // ✅ Only runs when `token` is available
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!selectedProducts.length) {
            isValid = false;
            newErrors.materialName = 'Please add at least one material.';
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
            const requestBody = {
                material_id: selectedProducts.length > 0 ? selectedProducts[0].materialName : null,
                color_id: color ,
                insert_ids: selectedInserts.map(insert => ({
                    insert_id: insert.insertId,
                    no_of_inserts: Number(insert.quantity),
                })),
                loading_percentage: loading ? loading.toString() : "0",
                raw_material_ids: selectedProducts.map(product => product.materialName),
            };

            try {
                await axios.post(
                    `https://machanite-be.onrender.com/api/create-product-raw-material/${product_id}`,
                    requestBody,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
        console.log(requestBody,"aaaa")
                setErrors({});
                setSuccessMessage('Form submitted successfully!');
                router.push({
                    pathname: '/StockDetails',
                    query: { product_id: product_id },
                });
                console.log(requestBody)
            } catch (error) {
                console.error("Error submitting data:", error);
                console.error("Submission error:", error.response?.data || error.message);

            }
        } else {
            setErrors(newErrors);
            setSuccessMessage('');
        }
    };

    const handleAddProduct = () => {
        if (materialName && !selectedProducts.some((item) => item.materialName === materialName)) {
            setSelectedProducts([...selectedProducts, { materialName }]);
            setMaterialName('');
            setShowSelectedMaterials(true);
        }

        if (selectedProducts.some((product) => product.materialName === materialName)) {
            setErrors({ materialName: "Material name already added." });
            return;
        }
        setErrors({});
    };

    const handleRemoveProduct = (index) => {
        const updatedProducts = selectedProducts.filter((_, i) => i !== index);
        setSelectedProducts(updatedProducts);
    };

    return (
        <div className="flex">
            <Dashboard />
            <div className="w-full overflow-hidden">
                <div className="pb-10 h-screen overflow-y-auto bg-[#f7f5f5] border-black">
                    <Header />
                    <div className="w-[600px] mx-auto flex flex-col justify-center items-center py-10 bg-[#ffffffe2] shadow-2xl rounded-2xl">
                        <h1 className="text-2xl font-bold text-[#7d40ff]">Select Material, Color & Insert</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mt-8">
                                <label className="text-gray-800 font-semibold">Material Name</label>
                                <select
                                    value={materialName}
                                    onChange={(e) => setMaterialName(e.target.value)}
                                    className="bg-gray-200 rounded-full border border-gray-400 mt-1 py-2 px-4 w-72"
                                >
                                    <option value="" disabled>-- Select Material --</option>
                                    {materials.map((mat) => (
                                        <option key={mat.id} value={mat.id }>
                                            {mat.material_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.materialName && <p className="text-red-500 text-sm">{errors.materialName}</p>}
                            </div>

                            <div className="flex justify-center mt-4">
                                <button type="button" onClick={handleAddProduct} className="bg-[#7d40ff] rounded-full px-4 py-2 text-white flex items-center">
                                    <FaPlus className="mr-2" /> Add Material
                                </button>
                            </div>



                            {showSelectedMaterials && (
                                <div className="border border-black mt-5 w-72 p-3 h-40 overflow-y-auto bg-white rounded-lg">
                                    <h2 className="text-lg font-semibold text-center">Selected Materials</h2>                                    
                                    {selectedProducts.length > 0 ? selectedProducts.map((item, index) => (
                                        <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
                                            
                                            <p>{materials.find((mat) => mat.id === item.materialName)?.material_name || "Unknown Material"}</p>

                                            <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleRemoveProduct(index)} />
                                        </div>
                                    )) : <p className="text-gray-500">No materials added.</p>}
                                        </div>
                                    )}

                            <div className="flex flex-col mt-5">
                                <label className="text-gray-800 font-semibold">Material Color</label>
                                <select
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="bg-gray-200 rounded-full border border-gray-400 mt-1 py-2 px-4 w-72"
                                >
                                    <option value="" disabled>-- Select Color --</option>
                                    {colors.map((col) => (
                                        <option key={col.id} value={col.id}>
                                            {col.material_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
                            </div>

                            <div className="flex flex-col mt-4">
                                <label className="text-gray-800 font-semibold">Master Batch Loading %</label>
                                <input
                                    type="number"
                                    value={loading}
                                    onChange={(e) => setLoading(e.target.value)}
                                    className="bg-gray-200 rounded-full border border-gray-400 mt-1 py-2 px-4 w-72"
                                />
                                {errors.loading && <p className="text-red-500 text-sm">{errors.loading}</p>}
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
    <div className="mt-5">
        <label className="text-gray-800 font-semibold">Select Insert</label> <br />
        <select
            value={selectInsert}
            onChange={(e) => setSelectInsert(e.target.value)}
            className="bg-gray-200 rounded-full border border-gray-400 mb-4 mt-1 py-2 px-4 w-72"
        >
            <option value="" disabled>-- Select Insert --</option> 
            {inserts.map((ins) => (
                <option key={ins.id} value={ins.id}>
                    {ins.material_name}
                </option>
            ))}
        </select> <br />
        {errors.selectInsert && <p className="text-red-500 text-sm">{errors.selectInsert}</p>}

        {/* Quantity Input Field */}
        <label className="text-gray-800  font-semibold mt-4">Insert Quantity</label> <br />
        <input
            type="number"
            value={insertQuantity}
            onChange={(e) => setInsertQuantity(e.target.value)}
            className="bg-gray-200 rounded-full border border-gray-400 mt-1 py-2 px-4 w-72"
            placeholder="Enter quantity"
        />

        <button
            type="button"
            onClick={handleAddInsert}
            className="bg-[#7d40ff] mt-4 mx-auto rounded-full px-4 py-2 text-white flex items-center"
        >
            <FaPlus className="mr-2" /> Add Insert
        </button>
    </div>
)}

{/* Display Selected Inserts with Quantity */}
{showSelectedInserts && (
    <div className="border border-black mt-5 w-72 px-3 py-1 h-40 overflow-y-auto bg-white rounded-lg">
        <h2 className="text-lg font-semibold text-center mb-1">Selected Inserts</h2>

        {/* Headings */}
        <div className="flex justify-between font-semibold text-gray-700 border-b pb-1 mb-2">
            <span>Insert Name</span>
            <span>Quantity</span>
        </div>

        {/* Insert List */}
        {selectedInserts.length > 0 ? (
            selectedInserts.map((item, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-1 rounded-md mb-2">
                    <span className='border border-black w-20'>{inserts.find((ins) => ins.id === item.insertId)?.material_name || "Unknown Insert"}</span>
                    <span>{item.quantity}</span>
                    <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleRemoveInsert(index)} />
                </div>
            ))
        ) : (
            <p className="text-gray-500 text-center">No inserts added.</p>
        )}
    </div>
)}


    
                                                   

                            <div className="flex justify-center mt-8">
                                <button type="submit" className="bg-[#7d40ff] rounded-full w-52 px-4 py-2 text-white">
                                    Submit
                                </button>
                            </div>
                            {successMessage && <p className="text-green-500 text-lg text-center mt-4">{successMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRawMaterial;
