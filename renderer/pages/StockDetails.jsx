import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';


const StockDetails = () => {
    const [row, setRow] = useState('');
    const [position, setPosition] = useState('');
    const [rackNumber, setRackNumber] = useState('');
    const [stdPacking, setStdPacking] = useState('');
    const [bagSize, setBagSize] = useState('');
    const [weight, setWeight] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message
     const router = useRouter();
         const [loading, setLoading] = useState(false); // State to track loading status
     
        // const product_id = router.query?.product_id; // Access the query parameter
        const { product_id } = router.query;
        console.log("Product ID:", product_id);

    // Fetch product data when stdPacking or bagSize changes
    useEffect(() => {
        const fetchProductData = async () => {
            if (!stdPacking || !bagSize) {
                console.log('Skipping API call due to missing stdPacking or bagSize');
                setWeight('');
                // return;
            }

            try {
                setLoading(true);
                const response = await axios.get(
                    `https://machanite-be.onrender.com/api/get-product/${product_id}`,
                );
                const productData = response.data;
                console.log('API response:', productData);

                const weight = productData.net_weight_component || 0;
              
                const calculatedWeight =
                    (parseInt(stdPacking) * weight) / 1000;

                setWeight(calculatedWeight.toFixed(2));
            } catch (error) {
                console.error('Error fetching product data:', error);
                console.error(
                    'Full error details:',
                    error.response?.data || error.message,
                );
                alert(`Failed to fetch product data. ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [stdPacking, bagSize, product_id]); // Dependencies


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh
        const newErrors = {}; // Temporary object for error messages
        let isValid = true;

        // Validate each field individually
        if (!row.trim()) {
            isValid = false;
            newErrors.row = "Row is required.";
        }

        if (!position.trim().length) {
            isValid = false;
            newErrors.position = "Position is required.";
        }

        if (!rackNumber.trim()) {
            isValid = false;
            newErrors.rackNumber = "Rack Number is required.";
        }

        if (!stdPacking.trim()) {
            isValid = false;
            newErrors.stdPacking = "Std. Packing is required.";
        }

        if (!bagSize.trim()) {
            isValid = false;
            newErrors.bagSize = "Bag Size is required.";
        }

        if (!weight.trim()) {
            isValid = false;
            newErrors.weight = "Weight is required.";
        } else if (parseFloat(weight) <= 0) {
            newErrors.weight = "Weight must be a positive number.";
        }

        // Set errors or display success message
        if (isValid) {
            setErrors({});
            
            setErrorMessage(""); // Clear error message if validation passed

            // Prepare the data to send in the API request
            const formData = {
                // id: "521d5da3-991c-4d5c-b8b5-34eb400fbd35",
                product_id: product_id,
                row,
                position,
                rack_no : rackNumber,
                std_packing : stdPacking,
                bag_size: bagSize,
                weight_kg : weight,
            };
            router.push({
                pathname: '/ProductHistory', // Page to navigate to
                query: { product_id : product_id }, // Parameters to pass
              });

            try {
                // Send the POST request
                const response = await axios.post('https://machanite-be.onrender.com/stockDetail/create', formData);

                
                
                    setSuccessMessage("Data submitted successfully!");
                    setRow('');
                    setPosition('');
                    setRackNumber('');
                    setStdPacking('');
                    setBagSize('');
                    setWeight('');
                
                
            } catch (error) {
                // If there's an error with the API request
                setErrorMessage("There was an error submitting the form. Please try again.");
                setSuccessMessage("");
                console.log(error);
                if (error.response) {
                    console.error("Response Data:", error.response.data);
                    console.error("Response Status:", error.response.status);
                  }
            }
            // setSuccessMessage("Form submitted successfully!");
        } else {
            setErrors(newErrors);
            setSuccessMessage("");
            setErrorMessage(""); // Clear error message if validation failed
        }
    };

    return (
        <>
            <div className="flex">
                {/* Dashboard */}
                <div className="">
                    <Dashboard />
                </div>

                {/* Right side */}
                <div className="w-full overflow-hidden ">

                    {/* Main component */}
                    <div className="pb-10 border-black bg-[#f7f5f5] w-full h-screen overflow-y-auto">
                        <div className="sticky top-0 ">
                            <Header />
                        </div>

                        {/* Form 1 */}
                        <form action="" onSubmit={handleSubmit}>
                            {/* Customer data */}
                            <div className="mt-1 w-[800px] mx-auto pb-8 pt-2 bg-[#ffffffe2] shadow-2xl rounded-2xl">
                                <h1 className="flex justify-center text-3xl font-bold pt-5 text-[#7d40ff]">
                                    Stock Details
                                </h1>

                                {/* Row and position */}
                                <div className="flex place-content-around mt-4">
                                    {/* rackNumber */}
                                    <div className="flex flex-col">
                                        <label htmlFor="rackNumber" className="ml-1 text-gray-700 font-semibold">
                                            Rack Number:
                                        </label>
                                        <input
                                            type="number"
                                            id="rackNumber"
                                            name="rackNumber"
                                            placeholder="Enter Rack Number"
                                            className="bg-gray-200 focus:outline-none  border border-gray-400 px-auto rounded-full mt-1 py-2 px-4 w-72"
                                            value={rackNumber}
                                            onChange={(e) => setRackNumber(e.target.value)}
                                        />
                                        {errors.rackNumber && (
                                            <p className="text-red-500 text-sm mt-1">{errors.rackNumber}</p>
                                        )}
                                    </div>
                                    {/* Row */}
                                    <div className="flex flex-col w-72">
                                        <label htmlFor="row" className="ml-1 text-gray-700 font-semibold">
                                            Row:
                                        </label>
                                        <input
                                            type="text"
                                            id="row"
                                            name="row"
                                            placeholder="Enter Row"
                                            className="bg-gray-200 focus:outline-none  border border-gray-400 px-auto rounded-full mt-1 py-2 px-4 w-72"
                                            value={row}
                                            onChange={(e) => setRow(e.target.value)}
                                        />
                                        {errors.row && <p className="text-red-500 text-sm mt-1">{errors.row}</p>}
                                    </div>
                                </div>

                                {/* rackNumber and Std packing */}
                                <div className="flex place-content-around mt-5">
                                    {/* position */}
                                    <div className="flex flex-col">
                                        <label htmlFor="position" className="text-gray-700 ml-1 font-semibold">
                                            Position:
                                        </label>
                                        <input
                                            type="text"
                                            id="position"
                                            name="position"
                                            placeholder="Enter Position"
                                            className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                                            value={position}
                                            onChange={(e) => setPosition(e.target.value)}
                                        />
                                        {errors.position && (
                                            <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                                        )}
                                    </div>
                                    {/* Std packing */}
                                    <div className="flex flex-col">
                                        <label htmlFor="stdPacking" className="text-gray-700 ml-1 font-semibold">
                                            Std. Packing:
                                        </label>
                                        <input
                                            className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                                            type="number"
                                            id="stdPacking"
                                            name="stdPacking"
                                            placeholder="Enter Std. Packing"
                                            value={stdPacking}
                                            onChange={(e) => setStdPacking(e.target.value)}
                                        />
                                        {errors.stdPacking && (
                                            <p className="text-red-500 text-sm mt-1">{errors.stdPacking}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Third div */}
                                <div className="flex place-content-around mt-5">
                                    {/* Bag Size */}
                                    <div className="flex flex-col">
                                        <label htmlFor="bagSize" className="ml-1 text-gray-700 font-semibold">
                                            Bag Size:
                                        </label>
                                        <div className="bg-gray-200 rounded-full focus:outline-none  border border-gray-400 pr-2">
                                            <select
                                                name="bagSize"
                                                className="bg-gray-200 rounded-full focus:outline-none  mt-1 pb-2 pt-1.5  px-4 w-72"
                                                id="bagSize"
                                                onChange={(e) => setBagSize(e.target.value)}
                                            >
                                                <option value="" disabled selected>
                                                    -- Select Size --
                                                </option>
                                                <option value="12 X 14">12 x 14</option>
                                                <option value="16 X 18">16 x 18</option>
                                                <option value="9 X 13">9 x 13</option>
                                                <option value="8 X 10">8 x 10</option>
                                                <option value="6 X 8">6 x 8</option>
                                                <option value="WOVEN SACK">WOVEN SACK</option>
                                                <option value="PLASTIC BIN">PLASTIC BIN</option>
                                                <option value="FOAM POUCH">FOAM POUCH</option>
                                            </select>
                                        </div>
                                        {errors.bagSize && (
                                            <p className="text-red-500 text-sm mt-1">{errors.bagSize}</p>
                                        )}
                                    </div>
                                    {/* weight */}
                                    <div className="flex flex-col">
                                        <label htmlFor="gstinNmber" className="ml-1 text-gray-700 font-semibold">
                                            Weight (kg):
                                        </label>
                                        <input
                                            type="number"
                                            id="weight"
                                            name="weight"
                                            placeholder="Enter Weight"
                                            className="bg-gray-200 rounded-full focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72 "
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            readOnly
                                        />
                                        {errors.weight && (
                                            <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-center ">
                                    <button type="submit" className="bg-blue-90 bg-[#7d40ff] rounded-full w-52 px-4 py-2 my-auto text-white mt-10">
                                        Submit
                                    </button>
                                </div>
                                <div className="flex justify-center mb-2">
                                    <button type="submit" className="bg-blue-90 bg-[#7d40ff] rounded-full w-52 px-4 py-2 my-auto text-white mt-5">
                                        View
                                    </button>
                                </div>
                                {successMessage && (
                                    <p className="text-green-500 flex justify-center text-lg mt-4">{successMessage}</p>
                                )}
                                {errorMessage && (
                                    <p className="text-red-500 flex justify-center text-lg mt-4">{errorMessage}</p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StockDetails;
