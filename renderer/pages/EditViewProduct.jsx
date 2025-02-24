import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';
import Papa from 'papaparse';
import { FaRegEdit } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";



const EditViewProduct = () => {
    const [images, setImages] = useState([]);
    const [imageOne, setImageOne] = useState([]);
    const [productData, setProductData] = useState("");
    const [checkPoints, setCheckPoints] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [isCsvVisible, setIsCsvVisible] = useState(false);
    const [componentDescription, setComponentDescription] = useState('');
    const [status, setStatus] = useState('');
    const [hsm, setHsm] = useState('');
    const [mhc, setMhc] = useState('');
    const [item, setItem] = useState('');
    const [mold, setMold] = useState('');
    const [customerWiseMold, setCustomerWiseMold] = useState('');
    const [machineType, setMachineType] = useState('');
    const [Maintance, setMaintance] = useState('');
    const [processPlan, setProcessPlan] = useState('');
    const [controlPlan, setControlPlan] = useState('');
    const [cavities, setCavities] = useState('');
    const [netWeightComponent, setNetWeightComponent] = useState('');
    const [runnerWeight, setRunnerWeight] = useState('');
    const [rawMaterialPiece, setRawMaterialPiece] = useState('');
    const [shotWeight, setShotWeight] = useState('');
    const [cycleTime, setCycleTime] = useState('');
    const [efficiency, setEfficiency] = useState('');
    const [productionPerShift, setProductionPerShift] = useState('');
    const [netWeightRunnerPerPiece, setNetWeightRunnerPerPiece] = useState('');
    const [manufactureBy, setManufactureBy] = useState('');
    const [anufacturedYear, setManufacturedYear] = useState('');
    const [ownership, setOwnership] = useState('');
    const [productionTillNow, setProductionTillNow] = useState('');
    const [bagSize, setBagSize] = useState('');
    const [position, setPosition] = useState('');
    const [rack, setRack] = useState('');
    const [row, setRow] = useState('');
    const [standardPacking, setStandardPacking] = useState('');
    const [weight, setWeight] = useState('');
    const [urlCheckPoints, setUrlCheckPoints] = useState('');
    const [uploadCheckPoints, setUploadCheckPoints] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshData, setRefreshData] = useState(false); // State for re-fetching
    const [isEditing, setIsEditing] = useState(false);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState({});
    const [materialOptions, setMaterialOptions] = useState([]); // State for API data
    const [savedMaterials, setSavedMaterials] = useState(
        rawMaterials.reduce((acc, material, index) => {
            acc[index] = material.material_name;
            return acc;
        }, {})
    );


    const router = useRouter();
    // const product_id = router.query?.product_id; // Access the query parameter a1afa2db-7c45-44c0-b373-ebeec88a3659
    // const  product_id  =  '8bff7ffa-9546-4bb3-b8f2-21c6810a95c6';
    const { product_id } = router.query ;
    const [showList, setShowList] = useState(false);
    // Check if check_points array exists
  const pdfLinks = productData.files_key?.check_points || [];
    
    // Fetch data from API using Axios
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`http://localhost:4000/api/get-product/${product_id}`);
                setProductData(response.data);
                
                
                const data = response.data;
                console.log('API response:',data);

                 // Ensure check_points is always an array
                 let checkPointsData = data.files_key?.check_points;
                 if (typeof checkPointsData === "string") {
                     setUrlCheckPoints([checkPointsData]);  // Convert single string to array
                 } else if (Array.isArray(checkPointsData)) {
                     setUrlCheckPoints(checkPointsData);  // Keep array as is
                 } else {
                     setUrlCheckPoints([]);  // Handle undefined case
                 }

                 setRawMaterials(data.rawMaterial || []);
                setComponentDescription(productData.component_description)
                setStatus(productData.status)
                setHsm(productData.hsm_code)
                setMhc(productData.mhc_no)
                setItem(productData.item_code)
                setMold(productData.mold_no)
                setCustomerWiseMold(productData.customer_wise_mold_no)
                setMachineType(productData.machine_type)
                setMaintance(productData.maintenance)
                setProcessPlan(productData.process_plan_no)
                setControlPlan(productData.control_plan_no)
                setCavities(productData.no_of_cavities)
                setNetWeightComponent(productData.net_weight_component)
                setRunnerWeight(productData.runner_weight_per_shot)
                setRawMaterialPiece(productData.counting_no)
                setShotWeight(productData.counting_weight)
                setCycleTime(productData.cycle_time)
                setEfficiency(productData.efficiency)
                setProductionPerShift(productData.production_per_shift)
                setNetWeightRunnerPerPiece(productData.net_weight_runner_per_piece)
                setManufactureBy(productData.product_histories?.mfg_by)
                setManufacturedYear(productData.product_histories?.mfg_year)
                setOwnership(productData.product_histories?.ownership)
                setProductionTillNow(productData.product_histories?.production_history)
                setBagSize(productData.stockDetail?.bag_size)
                setPosition(productData.stockDetail?.position)
                setRack(productData.stockDetail?.rack_no)
                setRow(productData.stockDetail?.row )
                setStandardPacking(productData.stockDetail?.std_packing )
                setWeight(productData.stockDetail?.weight_kg)

                
                setImages(response.data.files_key.product_drawing_image); // Assuming API returns `data-images` field
                setImageOne(response.data.files_key.product_image)
                // Split `check_points` into an array
                if (data.check_points) {
                    setCheckPoints(data.check_points.split(','));
                } 
                                            

            } catch (error) {
                console.error('Error fetching data:', error);
                // console.error('Error fetching data:', error.response?.data || error.message);

                console.error(
                    'Full error details:',
                    error.response?.data || error.message,
                );
            }
        };

        fetchData();
    }, [product_id, refreshData]);

// Handles dropdown selection change
// const handleSelectChange = (index, value) => {
//     setSelectedMaterial((prev) => ({ ...prev, [index]: value }));
// };

  const handleFileChange = (e) => {
    const newFile = e.target.files[0]; // Get the first file from input

    if (newFile) {
      setUploadCheckPoints((prevFiles) => [...prevFiles, newFile]); // Append new file
    }

    // Reset the input field to allow re-selecting the same file
    e.target.value = "";
  };

  const handleDelete = (fileToDelete) => {
    // Filter out the file to delete
    setUploadCheckPoints((prevFiles) =>
      prevFiles.filter((file) => file !== fileToDelete)
    );
  };

const handleUpload = async () => {
    if (!product_id) {
        alert("Product ID is missing. Please try again.");
        return;
    }

    const formData = new FormData();
    uploadCheckPoints.forEach((file) => {
        formData.append("check_points", file);
    });

    formData.append("product_id", product_id);

    try {
        const response = await axios.post(
            "http://localhost:4000/api/upload_files",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        alert("Files uploaded successfully!");
        console.log("Upload Response:", response.data);
        setRefreshData(prev => !prev); // Trigger re-fetching of data
        setUploadCheckPoints([]);

    } catch (error) {
        console.error("Error uploading files:", error.response?.data || error.message);
        alert(`File upload failed: ${error.response?.data?.error || error.message}`);
    }
};

// filename
const getFileName = (url) => {
    return url.split("/").pop(); // Gets the last part of the URL
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
};

const handleSave = async () => {
  try {
      // Make a PUT request to update the product data on the API server
      const response = await axios.put(
          `http://localhost:4000/api/edit-product/${product_id}`, 
          productData
      );

      // Assuming the API returns the updated data or a success message
      if (response.status === 200) {
          alert('Product updated successfully!');
      }

      // Disable editing mode after save
      setIsEditing(false);
  } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product details. Please try again.");
  }
};

// Function to fetch material data from API
const fetchMaterials = async () => {
    try {
        const response = await fetch("http://localhost:4000/raw-material/all");
        const data = await response.json();

        console.log("Full API Response:", data); // Debugging API response

        if (data && typeof data === "object" && Array.isArray(data.material)) {
            setMaterialOptions(data.material); // Only store "material" type
            console.log("Filtered Material Options:", data.material);
        } else {
            console.error("Unexpected API response format:", data);
        }
    } catch (error) {
        console.error("Error fetching materials:", error);
    }
};


// Handle edit button click
const handleEditClick = (index) => {
    if (editIndex === index) {
        // Cancel edit mode
        setEditIndex(null);
        setSelectedMaterial({});
    } else {
        setEditIndex(index);
    }
    fetchMaterials(); // Fetch API data when edit is clicked
};

// Handle dropdown change
const handleSelectChange = (index, value) => {
    setSelectedMaterial((prev) => ({ ...prev, [index]: value }));
};

 // Handle save functionality
 const handleSaveMaterial = async () => {
    if (editIndex === null) return;

    // Get old and new material IDs
    const oldRawMaterialId = rawMaterials[editIndex]?.id; // Existing material ID
    const newRawMaterialName = selectedMaterial[editIndex]; // Selected new material name

    if (!oldRawMaterialId || !newRawMaterialName) {
        console.error("❌ Error: Missing required fields!", { oldRawMaterialId, newRawMaterialName });
        alert("Please select a valid material before saving.");
        return;
    }

    // Find the new material ID from the materialOptions list
    const newRawMaterial = materialOptions.find(
        (material) => material.material_name === newRawMaterialName
    );

    if (!newRawMaterial) {
        console.error("❌ Error: Selected material not found in options!", { newRawMaterialName });
        alert("Selected material is invalid. Please try again.");
        return;
    }

    const newRawMaterialId = newRawMaterial.id; // Get new material ID

    // Construct the payload
    const updatedMaterial = {
        product_id: product_id,  // Ensure this is not undefined
        oldRawMaterialId: oldRawMaterialId,
        newRawMaterialId: newRawMaterialId,
    };

    console.log("🚀 Sending API request with payload:", updatedMaterial);
            
    try {
        const response = await axios.put(
            "http://localhost:4000/api/replace-raw-material",
            updatedMaterial,
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        if (response.status === 200) {
            console.log("✅ Material updated successfully:", response.data);
            alert("Material updated successfully!");

            // Refresh raw materials list after update
            setRefreshData((prev) => !prev);

            // Reset edit state
            setEditIndex(null);
            setSelectedMaterial({});
        } else {
            console.error("❌ Unexpected API response:", response);
            alert("Failed to update material. Please try again.");
        }
    } catch (error) {
        console.error("❌ API Error:", error.response?.data || error.message);
        alert("Error updating material. Please check the console for details.");
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

                    {/* Main data  */}
                    <div className="w-[800px] mx-auto flex flex-col justify-center items-center py-10  px-8 bg-[#ffffffe2] shadow-2xl rounded-2xl">
                    
                        <h1 className="flex justify-center text-3xl font-bold mt-1 text-[#7d40ff]">Product Details</h1>
                        <div className='border border-[#7d40ff] w-full m-4'></div> 

                            {/* Top Image */}
                        <div className="w-96 mt-5 h-80">
                            <img
                                src={imageOne}
                                alt="Product Image 1"
                                className="object-cover w-full h-full rounded-lg shadow-lg"
                            />
                        </div>

                            {/* Edit buttom  */}
                        {/* <div>
                            <button className='bg-[#926be6] p-1.5 px-2 w-24 mx-auto mt-8 text-white rounded-lg'>Edit </button>  
                        </div>     */}

                         {/* Component Description and Status */}
                        <div className='flex  mt-10  ml-10'>
                        <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">Component Description :</label>
            <input 
                type="text" 
                name="hsm_code" 
                value={productData.component_description  || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
             {productData.process_plan_url ? (
                                
                                <div className='mt-2'>
                                    <a
                                        href={images}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white rounded-md mt-10 bg-[#926be6] px-4 py-0.5"
                                    >
                                        View Image / PDF
                                    </a>
                                </div>
                             ) : (
                                'N/A'
                            )}
        </div>
                            <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">Status :</label>
            <input 
                type="text" 
                name="hsm_code" 
                value={productData.hsm_code  || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
        </div>
                                
                            {/* <p className='w-80 mr-10'><strong className='text-gray-800 font-bold'>Status :</strong> {productData.status || 'N/A'}</p> */}
                        </div>  

                         {/* HSM and MHC */}  
                        <div className="flex mt-8 ml-10">
        <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">HSM Code :</label>
            <input 
                type="text" 
                name="hsm_code" 
                value={productData.hsm_code  || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
        </div>
        <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">HHC Number:</label>
            <input 
                type="text" 
                name="mhc_no" 
                value={productData.mhc_no  || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
        </div>
    </div>     
                    
                         {/* Item Code and Mold */}
                        <div className="flex mt-8 ml-10">
        <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">Item Code :</label>
            <input 
                type="text" 
                name="hsm_code" 
                value={productData.item_code  || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
        </div>
        <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">Mold Number :</label>
            <input 
                type="text" 
                name="mhc_no" 
                value={productData.mold_no  || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
        </div>
    </div>    
                    
                         {/* Customer Wise Mold and Machine Type */}
                        <div className="flex mt-8 ml-10">
        <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">Customer Wise Mold Number :</label>
            <input 
                type="text" 
                name="hsm_code" 
                value={productData.customer_wise_mold_no   || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
        </div>
        <div className="w-80 mr-10">
            <label className="text-gray-800 font-bold">Machine Type :</label>
            <input 
                type="text" 
                name="mhc_no" 
                value={productData.machine_type || ""} 
                onChange={handleInputChange} 
                className="border p-2 border-gray-400 mt-2 w-full" 
                disabled={!isEditing} 
            />
        </div>
    </div>  
                    
                         {/* Maintance and Process Plan Number */}
                        <div className='flex  mt-8 ml-16'>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Maintance :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.maintenance   || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Process Plan Number :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.process_plan_no   || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                                 <div className='mt-2'>
                                 {/* Inside your return JSX */}
                                 {productData.process_plan_url ? (
                                    <Link
                                        href={{
                                            pathname: "/ViewXL",
                                            query: { fileUrl: productData.process_plan_url },
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white rounded-md mt-10 bg-[#926be6] px-4 py-0.5"
                                    >
                                        View XLS
                                    </Link>
                                ) : (
                                    'N/A'
                                )}    
                            </div>   
                            </div>
                        </div>    
                    
                         {/* Control Plan Number and Number Of Cavities */}
                        <div className='flex  mt-8 ml-16'>
                             <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Control Plan Number :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.control_plan_no   || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                                <div className='mt-2'>
                                {/* Inside your return JSX */}
                                {productData.control_plan_url ? (
                                    <Link
                                        href={{
                                            pathname: "/ViewXL",
                                            query: { fileUrl: productData.control_plan_url },
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white rounded-md mt-10 bg-[#926be6] px-4 py-0.5"
                                    >
                                        View XLS
                                    </Link>
                                ) : (
                                    'N/A'
                                )}
                                </div>
                            </div>
                            
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Number Of Cavities  :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.no_of_cavities  || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            </div>    
                    
                         {/* Net Weight and Runner Weight */}
                        <div className="flex mt-8 ml-16">
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Net Weight (Component) :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.net_weight_component  || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Runner Weight Per Shot :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.runner_weight_per_shot || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                        </div>  
                    
                         {/* Raw Material and Shot Weight */}   
                        <div className="flex mt-8 ml-16">
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Raw Material Required Per Piece <br />(Counting No)  :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.counting_no  || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10 flex flex-col justify-end">
                                <label className="text-gray-800 font-bold">Shot Weight (Counting Weight) :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.counting_weight || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                        </div>
                    
                         {/* Cycle Time and Efficiency */}                           
                        <div className="flex mt-8 ml-16">
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Cycle Time (Seconds)  :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.cycle_time  || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Efficiency (%) :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.efficiency || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                        </div>
                        
                    
                         {/* Shift and Net Weight */}   
                        <div className="flex mt-8 ml-16">
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Production Per Shift  :</label>
                                <input 
                                    type="text" 
                                    name="hsm_code" 
                                    value={productData.production_per_shift  || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Net Weight (Runner Per Piece) :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.net_weight_runner_per_piece || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                        </div>

                         {/* Raw Material */}   
                         <h2 className="text-gray-800 font-bold mt-8">Raw Materials :</h2>
            <div className="overflow-x-auto mt-1 border rounded-lg shadow-lg">
                <table className="min-w-[500px] border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Material Name</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rawMaterials.map((material, index) => (
                            <tr key={material.id} className="hover:bg-gray-100">
                                <td className="border px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-4 py-2 text-center">
                                    {editIndex === index ? (
                                       <select
                                       className="border border-gray-300 rounded p-1"
                                       value={selectedMaterial[index] ?? material.material_name}
                                       onChange={(e) => handleSelectChange(index, e.target.value)}
                                   >
                                       <option value="" disabled>Select Material</option>
                                       {materialOptions.length > 0 ? (
                                           materialOptions.map((option) => (
                                               <option key={option.id} value={option.material_name}>
                                                   {option.material_name}
                                               </option>
                                           ))
                                       ) : (
                                           <option disabled>Loading...</option>
                                       )}
                                   </select>
                                   
                                    ) : (
                                        material.material_name
                                    )}
                                </td>
                                <td className="border text-center">
                                    <button
                                        onClick={() => handleEditClick(index)}
                                        className={`w-20 py-1 text-white rounded-lg text-sm block mx-auto my-2 ${
                                            editIndex === index ? "bg-red-500" : "bg-slate-500"
                                        }`}
                                        aria-label={editIndex === index ? "Cancel Edit" : "Edit Material"}
                                    >
                                        {editIndex === index ? "Cancel" : "Edit"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Save Button - Appears Only When Editing */}
            {editIndex !== null && (
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={handleSaveMaterial}
                        className="bg-green-500 text-white px-6 py-1 rounded-lg shadow-md hover:bg-green-600 transition"
                    >
                        Save
                    </button>
                </div>
            )}

                         {/* Check Points*/}
                        <div className='flex  mt-8  w-full ml-[85px] '>
                            <p className=' flex'>
                                <strong className='mr-1'>Check Points :</strong> 
                                {/* {productData.check_points || 'No Description Available'} */}
                                <div className='ml-1' >
                                    {checkPoints.length > 0 ? (
                                    checkPoints.map((point, index) => (
                                        <div key={index} className="flex items-center space-x-2 mb-0.5 font-normal text-[16px]">
                                            <input type="checkbox" id={`checkbox-${index}`} className="form-checkbox  accent-[#7d40ff]" />
                                            <label htmlFor={`checkbox-${index}`} className="text-gray-800">
                                                {point}
                                            </label>
                                        </div>
                                    ))
                                    ) : (
                                        <p>No Check Points Available</p>
                                    )} 

                                    <div className="mt-2">
                                        {/* Button to open the modal */}
                                        <button
                                            onClick={() => setShowModal(true)}
                                            className="text-white rounded-md bg-[#926be6] px-3 py-1"
                                        >
                                            View PDFs
                                        </button>

                                        {/* Modal for showing PDFs */}
                                        {showModal && (
                                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                                    <h2 className="text-lg font-semibold mb-4 flex justify-center">Available PDFs</h2>
                                                    <ul className="space-y-2">
                                                        {urlCheckPoints.length > 0 ? (
                                                            urlCheckPoints.map((pdf, index) => (
                                                                <li key={index}>
                                                                   {1 + index}.
                                                                    <a
                                                                        href={pdf}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-500 ml-1 underline"
                                                                    >
                                                                        {getFileName(pdf)}
                                                                    </a>
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <p className="text-center">No PDFs available</p>
                                                        )}
                                                    </ul>
                                                    {/* Close button */}
                                                    <button
                                                        onClick={() => setShowModal(false)}
                                                        className="mt-4 flex justify-center mx-auto bg-red-500 text-white px-3 py-1 rounded-md"
                                                    >
                                                        Close
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>                               
                                </div>
                                

                                    {/* upload PDF  */}
                                <div className='mr-10'>

                                    {/* Custom file input button */}
                                    <div className=" border w-[100px]">
                                        <input
                                            type="file"
                                            name="uploadCheckPoint"
                                            id="uploadCheckPoint"
                                            onChange={handleFileChange}
                                            accept='application/pdf'
                                            multiple
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="uploadCheckPoint"
                                            className="bg-[#926be6] text-white py-0.5 px-2 cursor-pointer rounded-md"
                                        >
                                            Choose File
                                        </label>
                                    </div>
                                   
                                    

                                    <ul className="mt-1">
                                        {uploadCheckPoints.length > 0 ? (
                                        uploadCheckPoints.map((file, index) => (
                                            <li key={index} className="flex items-center justify-between text-gray-700">
                                            <span>{file.name}</span>
                                            <button
                                                onClick={() => handleDelete(file)}
                                                className="ml-4 text-red-500 hover:text-red-700"
                                                aria-label={`Delete ${file.name}`}
                                            >
                                                × {/* Cross symbol */}
                                            </button>
                                            </li>
                                        ))
                                        ) : (
                                        <li className="text-gray-500">No files selected</li>
                                        )}
                                    </ul>

                                    {/* Show Upload button after files are selected */}
                                    {uploadCheckPoints.length > 0 && (
                                        <button
                                        onClick={handleUpload}
                                        className="mt-2 bg-[#926be6] text-white py-0.5 px-4 rounded-md hover:bg-blue-600"
                                        >
                                        Upload
                                        </button>
                                    )}     
                                </div>
                            </p>
                            
                        </div>    


                        
                        <h1 className="flex justify-center text-3xl font-bold mt-10 text-[#7d40ff]">Product Histories</h1>
                        <div className='border border-[#7d40ff] w-full  m-4'></div>
                         {/* */}
                        <div className='flex  mt-8 ml-16'>
                            {/* <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Manufacture By :</strong> {productData.product_histories?.mfg_by || 'No Description Available'}</p> */}
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Manufacture By :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.product_histories?.mfg_by || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Manufactured Year :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.product_histories?.mfg_year || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            {/* <p className='w-80 mr-10'><strong className='text-gray-800 font-bold'>Manufactured Year :</strong> {productData.product_histories?.mfg_year || 'N/A'}</p> */}
                        </div>                                                                                                
                         {/* */}
                        <div className='flex  mt-8 ml-16'>
                            {/* <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Ownership :</strong> {productData.product_histories?.ownership || 'No Description Available'}</p> */}
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Ownership :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.product_histories?.ownership || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Production Till Now :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.product_histories?.production_history || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            {/* <p className='w-80 mr-10'><strong className='text-gray-800 font-bold'>Production Till Now :</strong> {productData.product_histories?.production_history || 'N/A'}</p> */}
                        </div> 
                        

                
                         <h1 className="flex justify-center text-3xl font-bold mt-10 text-[#7d40ff]">Stock Details</h1>
                        <div className='border border-[#7d40ff] w-full  m-4'></div>
   
                         {/* Bag and Position */}
                        <div className='flex  mt-8 ml-16'>
                            {/* <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Bag Size :</strong> {productData.stockDetail?.bag_size || 'No Description Available'}</p> */}
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Bag Size :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.stockDetail?.bag_size || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Position :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.stockDetail?.position || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            {/* <p className='w-80 mr-10'><strong className='text-gray-800 font-bold'>Position :</strong> {productData.stockDetail?.position  || 'N/A'}</p> */}
                        </div>   
                         {/* Rack and Row*/}
                        <div className='flex  mt-8 ml-16'>
                            {/* <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Rack Number :</strong> {productData.stockDetail?.rack_no || 'No Description Available'}</p> */}
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Rack Number :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.stockDetail?.rack_no || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Row :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.stockDetail?.row || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            {/* <p className='w-80 mr-10'><strong className='text-gray-800 font-bold'>Row :</strong> {productData.stockDetail?.row   || 'N/A'}</p> */}
                        </div>    
                         {/* Standard Packing and  Weight*/}
                        <div className='flex  mt-8 ml-16'>
                            {/* <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Standard Packing :</strong> {productData.stockDetail?.std_packing || 'No Description Available'}</p> */}
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Standard Packing :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={productData.stockDetail?.std_packing || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            <div className="w-80 mr-10">
                                <label className="text-gray-800 font-bold">Weight (KG) :</label>
                                <input 
                                    type="text" 
                                    name="mhc_no" 
                                    value={ productData.stockDetail?.weight_kg || ""} 
                                    onChange={handleInputChange} 
                                    className="border p-2 border-gray-400 mt-2 w-full" 
                                    disabled={!isEditing} 
                                />
                            </div>
                            {/* <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Weight (KG) :</strong> { productData.stockDetail?.weight_kg || 'N/A'}</p> */}
                        </div>   


                        {/* Edit & Save Button - Conditional Rendering */}
                        <div className="mt-10">
                            {!isEditing ? (
                                <button 
                                    className="bg-[#926be6] p-1.5 px-2 w-24 text-white rounded-lg"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </button>
                            ) : (
                                <button 
                                    className="bg-green-500 p-1.5 px-2 w-24 text-white rounded-lg"
                                    // onClick={() => setIsEditing(false)}
                                    onClick={handleSave} 
                                >
                                    Save
                                </button>
                            )}
                        </div>
                         
                        
                    </div>
                </div>
            </div>
        </div>
    );

};

export default EditViewProduct;
