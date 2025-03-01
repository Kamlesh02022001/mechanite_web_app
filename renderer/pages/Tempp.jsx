import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';
import Papa from 'papaparse';


const ViewProduct = () => {
    const [images, setImages] = useState([]);
    const [imageOne, setImageOne] = useState([]);
    const [productData, setProductData] = useState("");
    const [checkPoints, setCheckPoints] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const [isCsvVisible, setIsCsvVisible] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [uploadCheckPoints, setUploadCheckPoints] = useState([]);

    const router = useRouter();
    // const product_id = router.query?.product_id; // Access the query parameter a1afa2db-7c45-44c0-b373-ebeec88a3659
    const { product_id } = router.query;
     
    
    // Fetch data from API using Axios
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`https://machanite-be.onrender.com/api/get-product/${product_id}`);
                setProductData(response.data);
                
                
                const data = response.data;
                console.log('API response:',data);
                
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
    }, []);


// Fetch and parse CSV file
const fetchAndDisplayCsv = async (url) => {
    try {
      const response = await fetch(url);
      const csvText = await response.text();

      Papa.parse(csvText, {
        header: true,
        complete: (result) => {
          setCsvData(result.data);
          setIsCsvVisible(true);
        },
      });
    } catch (error) {
      console.error('Error fetching or parsing CSV:', error);
    }
  };

  // Display PDF in iframe
  const viewPdf = (url) => {
    setPdfUrl(url);
  };

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

  const handleUpload =async  () => {
    // Simulate uploading files (you can replace this with actual upload logic)
    // alert("Files uploaded!");
    const formData = new FormData();

    uploadCheckPoints.forEach((file) => {
        formData.append("files", file); // Ensure your API supports array format
    });

    try {
        const response = await axios.put(
            `https://machanite-be.onrender.com/api/upload-files/${product_id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        alert("Files uploaded successfully!");
        console.log("Upload Response:", response.data);

        // Clear uploaded files list after successful upload
        setUploadCheckPoints([]);
    } catch (error) {
        console.error("Error uploading files:", error);
        alert("File upload failed. Please try again.");
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
                    <div className="w-[800px] mx-auto flex flex-col justify-center items-center py-10  px-5 bg-[#ffffffe2] shadow-2xl rounded-2xl">
                    
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
                        <div>
                            <button className='bg-[#926be6] p-1.5 px-2 w-24 mx-auto mt-8 text-white rounded-lg'>Edit </button>  
                        </div>    

                         {/* Component Description and Status */}
                        <div className='flex  mt-10  ml-16'>
                            <p className='w-80 mr-10 '>
                                <strong className='text-gray-800 mr-1 font-bold'>Component Description :</strong> 
                                {productData.component_description || 'No Description Available'} <br />
                                {productData.process_plan_url ? (
                                
                                <div className='mt-1'>
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
                            </p>
                                
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Status :</strong> {productData.status || 'N/A'}</p>
                        </div>  

                         {/* HSM and MHC */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>HSM Code :</strong> {productData.hsm_code || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>MHC Number :</strong> {productData.mhc_no || 'N/A'}</p> 
                        </div>    
                    
                         {/* Item Code and Mold */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Item Code :</strong> {productData.item_code || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Mold Number :</strong> {productData.mold_no || 'N/A'}</p>
                        </div>    
                    
                         {/* Customer Wise Mold and Machine Type */}
                        <div className='flex mt-8 ml-16 '>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Customer Wise Mold Number :</strong> {productData.customer_wise_mold_no || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Machine Type :</strong> {productData.machine_type || 'N/A'}</p>
                        </div>    
                    
                         {/* Maintance and Process Plan Number */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Maintance :</strong> {productData.maintenance || 'No Description Available'}</p>
                            <p className='w-80 ml-5'
                                ><strong className='text-gray-800 font-bold mr-1 '>Process Plan Number :</strong> 
                                {productData.process_plan_no || 'N/A'}  <br />
                                
                            <div className='mt-1'>
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
                                        View XL
                                    </Link>
                                ) : (
                                    'N/A'
                                )}    
                            </div>    
                          
                            </p>
                        </div>    
                    
                         {/* Control Plan Number and Number Of Cavities */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '>
                                <strong className='mr-1  text-gray-800 font-bold'>Control Plan Number :</strong>  
                                {productData.control_plan_no || 'No Description Available'} <br />
                                
                            <div className='mt-1'>
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
                                    View XL
                                </Link>
                            ) : (
                                'N/A'
                            )}
                            </div>
                            </p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Number Of Cavities :</strong> {productData.no_of_cavities || 'N/A'}</p>
                        </div>    
                    
                         {/* Net Weight and Runner Weight */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Net Weight (Component) :</strong> {productData.net_weight_component || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Runner Weight Per Shot :</strong> {productData.runner_weight_per_shot || 'N/A'}</p>
                        </div>    
                    
                         {/* Raw Material and Shot Weight */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Raw Material Required Per Piece <br />(Counting No) :</strong> {productData.counting_no || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Shot Weight (Counting Weight) :</strong> {productData.counting_weight || 'N/A'}</p>
                        </div>    
                    
                         {/* Cycle Time and Efficiency */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Cycle Time (Seconds) :</strong> {productData.cycle_time || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Efficiency (%) :</strong> {productData.efficiency || 'N/A'}</p>
                        </div>    
                    
                         {/* Shift and Net Weight */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Production Per Shift :</strong> {productData.production_per_shift || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Net Weight (Runner Per Piece) :</strong> {productData.net_weight_runner_per_piece || 'N/A'}</p>
                        </div>    
                    
                         {/* */}
                        <div className='flex  mt-8  w-full ml-[125px] '>
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
                                {productData.check_points_url ? (
                                <div className='mt-2'>
                                    <a
                                    href={productData.check_points_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white rounded-md mt-10 bg-[#926be6] px-2 py-0.5"
                                >
                                    View PDF
                                </a>
                                </div>
                            ) : (
                                'N/A'
                            )}
                                 </div>

                                    {/* upload PDF  */}
                                <div className='ml-5'>

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
                                   
                                    {/* <div className="relative  w-[88px]">
                                        <input
                                        type="file"
                                        name="uploadCheckPoint"
                                        id="uploadCheckPoint"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        />
                                        <button
                                        htmlFor="uploadCheckPoint"
                                        className="bg-[#926be6] text-white px-3 py-0.5 cursor-pointer rounded-md  "
                                        >
                                        Add PDF 0
                                        </button>
                                    </div> */}

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
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Manufacture By :</strong> {productData.product_histories?.mfg_by || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Manufactured Year :</strong> {productData.product_histories?.mfg_year || 'N/A'}</p>
                        </div>                                                                                                
                         {/* */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Ownership :</strong> {productData.product_histories?.ownership || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Production Till Now :</strong> {productData.product_histories?.production_history || 'N/A'}</p>
                        </div> 
                        

                
                         <h1 className="flex justify-center text-3xl font-bold mt-10 text-[#7d40ff]">Stock Details</h1>
                        <div className='border border-[#7d40ff] w-full  m-4'></div>
   
                         {/* Bag and Position */}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Bag Size :</strong> {productData.stockDetail?.bag_size || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Position :</strong> {productData.stockDetail?.position  || 'N/A'}</p>
                        </div>   
                         {/* Rack and Row*/}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Rack Number :</strong> {productData.stockDetail?.rack_no || 'No Description Available'}</p>
                            <p className='w-80 ml-5'><strong className='text-gray-800 font-bold'>Row :</strong> {productData.stockDetail?.row   || 'N/A'}</p>
                        </div>    
                         {/* Standard Packing and  Weight*/}
                        <div className='flex  mt-8 ml-16'>
                            <p className='w-80 mr-10 '><strong className='text-gray-800 font-bold'>Standard Packing :</strong> {productData.stockDetail?.std_packing || 'No Description Available'}</p>
                            <p className='w-80 ml-5 '><strong className='text-gray-800 font-bold'>Weight (KG) :</strong> { productData.stockDetail?.weight_kg || 'N/A'}</p>
                        </div>    

<input type="file" name="" id="" />
                         
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
