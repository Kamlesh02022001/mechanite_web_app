import React, { useState, useEffect } from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import { FiUpload } from "react-icons/fi"; // React Icons for an upload icon

import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/router';

import axios from "axios";


const AddProduct = () => {
  const [customers, setCustomers] = useState([]); // State to store customers
  const [loading, setLoading] = useState(false); // State for loading indicator
const [selectedCustomerId, setSelectedCustomerId] = useState('')
const [customerId, setCustomerId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [status, setStatus] = useState("");
  const [mhcNumber, setMhcNumber] = useState("");
  const [hsmNumber, setHsmNumber] = useState("");
  const [productName, setProductName] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [customerMoldNo, setCustomerMoldNo] = useState("");
  const [moldNo, setMoldNo] = useState("");
  const [cavities, setCavities] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [cycleTime, setCycleTime] = useState("");
  const [productPerShift, setProductPerShift] = useState("");
  const [maintenace, setMaintenace] = useState("");
  const [checkPoint, setCheckPoint] = useState("");
  const [processPlan, setProcessPlan] = useState("");
  const [controlPlan, setControlPlan] = useState("");
  const [counting, setCounting] = useState("");
  const [countingWeight, setCountingWeight] = useState("");
  const [runnerWeight, setRunnerWeight] = useState("");
  const [netComponent, setNetComponent] = useState("");
  const [netRunner, setNetRunner] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [machineType, setMachineType] = useState("");
  const [shortName, setShortName] = useState("");
  const [fetchingShortName, setFetchingShortName] = useState(false);
  const [fetchingMoldNumbers, setFetchingMoldNumbers] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadProductName, setUploadProductName] = useState(null);
  const [productNamePreview, setProductNamePreview] = useState(null);
  const [uploadCheckPoint, setUploadCheckPoint] = useState(null);
  const [uploadProcessPlan, setUploadProcessPlan] = useState(null);
  const [uploadControlPlan, setUploadControlPlan] = useState(null);
  const router = useRouter();
  const [checkPoints, setCheckPoints] = useState([]); // Array to hold all points
  const [inputValue, setInputValue] = useState(""); // Current input value
  const [errorMessage, setErrorMessage] = useState(""); // Validation error message
  const [rawMaterialPerShift , setRawMaterialPerShift] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const newErrors = {}; 
    const formData = new FormData(e.target); 

    let isValid = true;
    const finalProductionPerShift = calculateProductionPerShift(
      cycleTime,
      efficiency,
      cavities
    );
    // const finalNetWtComponent = calculateNetWeightComponent(
    //   countingWeight,
    //   counting
    // );
    const finalNetWtRunnerPerPiece = calculateNetWeightRunnerPerPiece(
      runnerWeight,
      cavities
    );

    // Vali each field individually
    if (!productName.trim()) {
      isValid = false;
      console.log("pname");
      newErrors.productName = "Product name is required.";
    }
    if (!customerName.trim()) {
      isValid = false;
      console.log("cname");
      newErrors.customerName = "Customer name is required.";
    }
    if (!status.trim()) {
      isValid = false;
      console.log("status");
      newErrors.status = "Status is required.";
    }

    if (!mhcNumber.trim()) {
      isValid = false;
      console.log("mhc");
      newErrors.mhcNumber = "MHC Number is required.";
    }

    if (!hsmNumber.trim()) {
      isValid = false;
      console.log("hsm");
      newErrors.hsmNumber = "HSM Number is required.";
    }

    if (!itemCode.trim()) {
      isValid = false;
      console.log("itemm");
      newErrors.itemCode = "Item Code is required.";
    }

    if (!customerMoldNo.trim()) {
      isValid = false;
      console.log("m");
      newErrors.customerMoldNo = "Customer Wise Mold Number is required.";
    }
    if (!moldNo.trim()) {
      isValid = false;
      console.log("am");
      newErrors.moldNo = "Mold Number is required.";
    }
    if (!cavities.trim()) {
      isValid = false;
      console.log("m");
      newErrors.cavities = "Name of Cavities is required.";
    }
    if (!efficiency.trim()) {
      isValid = false;
      console.log("ae");
      newErrors.efficiency = "Efficiency% is required.";
    }
    if (!machineType.trim()) {
      isValid = false;
      console.log("ae");
      newErrors.machineType = "Machine Type is required.";
    }
    if (!shortName.trim()) {
      isValid = false;
      console.log("ae");
      newErrors.shortName = "Short Name is required.";
    }
    if (!cycleTime.trim()) {
      isValid = false;
      console.log("ac");
      newErrors.cycleTime = "Cycle Time is required.";
    }
    if (!productPerShift.trim()) {
      isValid = false;
      console.log("pps");
      newErrors.productPerShift = "Product Per Shift is required.";
    }
    if (!maintenace.trim()) {
      isValid = false;
      console.log("m");
      newErrors.maintenace = "Maintenace is required.";
    }
    if (checkPoints.length === 0) {
      isValid = false;
      console.log("cp");
      newErrors.checkPoint = "Check Point is required.";
    }

    if (!processPlan.trim()) {
      isValid = false;
      console.log("pp");
      newErrors.processPlan = "Process Plan Number is required.";
    }
    if (!controlPlan.trim()) {
      isValid = false;
      console.log("control plan");
      newErrors.controlPlan = "Control Plan Number is required.";
    }
    if (!counting.trim()) {
      isValid = false;
      console.log("c");
      newErrors.counting = "Counting Number is required.";
    }
    if (!countingWeight.trim()) {
      isValid = false;
      console.log("cw");
      newErrors.countingWeight = "Counting Weight is required.";
    }
    if (!runnerWeight.trim()) {
      isValid = false;
      console.log("rw");
      newErrors.runnerWeight = "Runner Weight Per Shot is required.";
    }
    if (!netComponent.trim()) {
      isValid = false;
      // console.log("a");
      newErrors.netComponent = "Net Wt.of Component is required.";
    }
    if (!netRunner.trim()) {
      isValid = false;
      // console.log("a");
      newErrors.netRunner = "Net Wt.of Runner Per Piece is required.";
    }
    if (!rawMaterialPerShift.trim()) {
      isValid = false;
      // console.log("a");
      newErrors.rawMaterialPerShift = "Raw Material Per Shift is required.";
    }
    // console.log("successfully");
   

    if (isValid) {
      setErrors({});
      try {
        const formData = new FormData();
      //   if (selectedImage) {
      //     // console.log("Selected Image:", selectedImage);
      //     formData.append('product_image',{
      //       uri: selectedImage.uri,
      //       type : selectedImage.type || 'image/jpeg',
      //       name : selectedImage.fileName || 'product_image.jpg'
      //     }); 
      // }
      // if(uploadProductName){
      // formData.append('product_drawing_image', {
      //   uri: uploadProductName.uri,
      //   type : uploadProductName.type || 'image/jpeg',
      //   name : uploadProductName.fileName || 'product_image.jpg'
      // });}

      formData.append("product_image", selectedImage);
      formData.append("product_drawing_image",uploadProductName);

      formData.append('control_plan', uploadControlPlan);
      formData.append('process_plan', uploadProcessPlan);
      formData.append('check_points', uploadCheckPoint);
      // for (let [key, value] of formData.entries()) {
      //     console.log(`${key}:`, value);
      // }
        

        // Append other form fields
        const productData = {
          raw_material_per_shift : parseInt(rawMaterialPerShift),
          status,
          customer_id: selectedCustomerId,
          mhc_no: mhcNumber,
          hsm_code: hsmNumber,
          component_description: productName,
          item_code: itemCode,
          customer_wise_mold_no: customerMoldNo,
          mold_no: moldNo,
          no_of_cavities: Number(cavities),
          efficiency: parseFloat(efficiency),
          cycle_time: parseFloat(cycleTime),
          production_per_shift: parseInt(finalProductionPerShift),
          maintenance: maintenace,
          check_points: checkPoints,
          machine_type: machineType,
          process_plan_no: processPlan,
          control_plan_no: controlPlan,
          counting_no: counting,
          counting_weight: parseFloat(countingWeight),
          runner_weight_per_shot: parseFloat(runnerWeight),
          net_weight_component: parseFloat(netComponent),
          net_weight_runner_per_piece: parseFloat(finalNetWtRunnerPerPiece),
        };

        Object.keys(productData).forEach((key) => {
          formData.append(key, productData[key]);
        });

        
        const response = await axios.post(
          "https://machanite-be.onrender.com/api/create-product",
          
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
    
    console.log("Donnnneeee");
      setSuccessMessage('Login successful!');
      console.log("iiddd "+response.data.id);

     
      router.push({
        pathname: '/AddRawMaterial', // Page to navigate to
        query: { product_id: response.data.id }, // Parameters to pass
      });
      } catch (error) {
        console.error("Error submitting form:", error);
        if (error.response) {
          console.error("Response Data:", error.response.data);
          console.error("Response Status:", error.response.status);
        } else {
          console.error("Error Message:", error.message);
        }
        setErrors({
          apiError:
            error.response?.data?.message ||
            "An error occurred. Please try again.",
        });
        setSuccessMessage("");
      } finally {
        setLoading(false);
      }
      setSuccessMessage("Form submitted successfully!");
    } else {
      setErrors(newErrors);
      setSuccessMessage("");
    }
  };

  //IMAGE
  const handleImagePick = async (event) => {
    try {
      const file = event.target.files[0]; // Get the first selected file
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Create a URL for the image
        
        setSelectedImage(file); // Save the selected file
        setImagePreview(imageUrl); // Preview the image
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Failed to pick image. Please try again.");
    }
  };

  // Fetch all customers from the API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://machanite-be.onrender.com/customer/all"
      );
      console.log("API Response:", response.data); // Debug: log the API response
      const customersData = response.data;
      setCustomers(response.data); // Assume response is an array of customers
       // Set default customer ID if available
    if (customersData.length > 0) {
      const defaultCustomerId = customersData[0].id; // Assuming customers have an `id` field
      setSelectedCustomerId(defaultCustomerId);
      console.log("Default Customer ID Settt:", defaultCustomerId);
    }
    } 
    
    catch (error) {
      console.error("Error fetching customers:", error);
      alert("Failed to fetch customers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch customers on component mount  {SELECT CUSTOMER}
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchShortName = async (customerId) => {
    // Validate UUID before making the request
    if (!customerId || typeof customerId !== 'string' ) {
      console.error('Invalid UUID format:', customerId);
      setErrors(prev => ({...prev, customerName: 'Invalid customer ID format'}));
      return;
    }

    try {
      setFetchingShortName(true);
      const response = await axios.get(
        `https://machanite-be.onrender.com/customer/${customerId}`
      );    
      
      if (response.data && response.data.customer_short_name) {
        setShortName(response.data.customer_short_name);
        
        setErrors(prev => ({...prev, customerName: undefined}));
      } else {
        setShortName('');
        console.warn('No short name found in response:', response.data);
      }
    } catch (error) {
      console.error("Error fetching short name:", error.response || error);
      setErrors(prev => ({
        ...prev, 
        customerName: 'Failed to fetch customer details'
      }));
    } finally {
      setFetchingShortName(false);
    }
  };

  const handleCustomerChange = (e) => {
    const selectedCustomerId = e.target.value;
    setCustomerName(selectedCustomerId);
    setSelectedCustomerId(selectedCustomerId); // Set the selected customer ID
  console.log("Selected Customer ID:", selectedCustomerId);

    if (selectedCustomerId) {
      fetchShortName(selectedCustomerId);
      // Assuming fetchNextMoldNumbers is defined elsewhere
      fetchNextMoldNumbers(selectedCustomerId);
    } else {
      setShortName('');
      setMoldNo('');
      setCustomerMoldNo('');
      setErrors(prev => ({...prev, customerName: 'Please select a customer'}));
    }
  };

  // Fetch next mold numbers for the selected customer
  const fetchNextMoldNumbers = async (customerId) => {
    try {
      setFetchingMoldNumbers(true);
      const response = await axios.get(
        `https://machanite-be.onrender.com/api/next-mold-number/${customerId}`
      );

      console.log("API Response:", response.data);

      const { moldNumber, moldCount } = response.data || {};
      setMoldNo(moldNumber || "");
      setCustomerMoldNo(moldCount ? `0${moldCount}` : "");
      console.log("Fetched Mold No:", moldNumber);
      console.log("Fetched Customer Wise Mold No:", moldCount);
    } catch (error) {
      console.error("Error fetching mold numbers:", error);
      alert("Failed to fetch mold numbers. Please try again.");
    } finally {
      setFetchingMoldNumbers(false);
    }
  };

  // Calculate shift
  const calculateProductionPerShift = (cycleTime, efficiency, cavities) => {
    if (!cycleTime || !efficiency || !cavities) return "";

    const secondsPerShift = 28800; 
    const efficiencyDecimal = parseFloat(efficiency) / 100;
    const shotsPerShift =
      (secondsPerShift / parseFloat(cycleTime)) * efficiencyDecimal;

    return Math.floor(shotsPerShift * parseFloat(cavities)).toString();
  };

  // Update shift whenever relevant inputs change
  useEffect(() => {
    const production = calculateProductionPerShift(
      cycleTime,
      efficiency,
      cavities
    );
    setProductPerShift(production);
  }, [cycleTime, efficiency, cavities]);

  //Calculate Runner
  const calculateNetWeightRunnerPerPiece = (runnerWeight, numberOfCavities) => {
    if (!runnerWeight || !numberOfCavities) return "";
    return (parseFloat(runnerWeight) / parseFloat(numberOfCavities)).toFixed(2);
  };

  // Add useEffect for net weight runner per piece calculation
  useEffect(() => {
    const calculatedRunnerWeight = calculateNetWeightRunnerPerPiece(
      runnerWeight,
      cavities
    );
    setNetRunner(calculatedRunnerWeight);
  }, [runnerWeight, cavities]);

  const handleImagePickk = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };  

  // Delete a point
  const handleDeletePoint = (index) => {
    const updatedPoints = checkPoints.filter((_, i) => i !== index);
    setCheckPoints(updatedPoints);
  };

  // Handle input value change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage(""); // Clear error message on input change
  };

  // Add a new point when pressing Enter
  const handleAddPoint = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default behavior
      addPoint();
    }
  };

  // Add a new point function
  const addPoint = () => {
    if (!inputValue.trim()) {
      setErrorMessage("Point cannot be empty.");
      return;
    }
    if (checkPoints.includes(inputValue.trim())) {
      setErrorMessage("Duplicate point not allowed.");
      return;
    }
    setCheckPoints([...checkPoints, inputValue.trim()]); // Add point
    setInputValue(""); // Clear input
  };

   // Calculate shot weight
  const calculateShotWeight = () => {
    if (!runnerWeight || !cavities || !netComponent) return '';

    const runner = parseFloat(runnerWeight);
    const cavitie = parseFloat(cavities);
    const netWeight = parseFloat(netComponent);

    if (isNaN(runner) || isNaN(cavitie) || isNaN(netWeight)) return '';
    if (cavitie === 0) return '';

    // Runner weight + (number of cavities × net weight of component)
    const total = runner + (cavitie * netWeight);
    return total.toFixed(2);
  };

  //raw material per piece
  const calculateRawMaterialPerPiece = () => {
    if (!runnerWeight || !cavities || !netComponent) return '';

    const runner = parseFloat(runnerWeight);
    const cavitie = parseFloat(cavities);
    const netWeight = parseFloat(netComponent);

    if (isNaN(runner) || isNaN(cavitie) || isNaN(netWeight)) return '';
    if (cavitie === 0) return '';

    // Runner weight per cavity + net weight of component
    const runnerWeightPerCavity = parseFloat(runner / cavitie);
    const total = parseFloat(runnerWeightPerCavity + netWeight);
    return total.toFixed(2);
  };

  useEffect(() => {
    setCounting(calculateRawMaterialPerPiece());
    setCountingWeight(calculateShotWeight());
  }, [runnerWeight, cavities, netComponent]);

  const calculateRawMaterialPerShift =()=>{
    if(!productPerShift || !counting) return '';
    const shift = parseFloat(productPerShift) ;
    const count = parseFloat(counting);

    if(isNaN(shift) || isNaN(count)) return '';

    const materialShift = shift * count ;
    return materialShift.toFixed(2)
  }

useEffect( () =>{
  setRawMaterialPerShift(calculateRawMaterialPerShift());
},[productPerShift, counting]);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }
};

const handleProductFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setUploadProductName(file);
    setProductNamePreview(URL.createObjectURL(file)); // Only for images, PDFs won't preview
  }
};
  return (
    <>
      <div className="flex">
        {/* Dashboard  */}
        <div className="">
          <Dashboard />
        </div>

        {/* Right side  */}
        <div className="w-full overflow-hidden ">

          {/* Main component  */}
          <div className=" pb-10  border-black bg-[#f7f5f5] w-full h-screen overflow-y-auto">
            <div className="sticky top-0 ">
              <Header />
            </div>

            {/* Customer data  */}
            <div className=" mt-5  w-[800px] mx-auto pb-5 pt-2 bg-[#ffffffe2] shadow-2xl rounded-2xl">
              <h1 className="flex justify-center text-3xl font-bold mt-8 text-[#7d40ff] ">
                Add Product
              </h1>
              <h1 className="flex justify-center text-lg  font-bold mt-5 text-[#926be6]">
                Please enter the following information
              </h1>
              {/* IMAGE  */}
              <div className="mx-auto flex justify-center mt-8 order flex-col border-black">
              {/* <div className="text-gray-800 mx-auto mb-2 brder border-black font-semibold">Uplaod Image</div> */}

                <div className="image-section mx-auto text-sm   order">
                  {/* <button
                    onClick={handleImagePick}
                    className="ml-8 pick-image-button bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Upload Product Imag
                  </button> */}
                  {imagePreview ? (
                    
                    <div className="image-preview-container">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="image-preview w-96 rounded-lg shadow-2xl mb-4 h-80"
                      />  
                      <button
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedImage(null);
                        }}
                        className="remove-image-button mx-auto w-full "
                      >
                        <p className="bg-[#926be6] p-1.5 px-3 w-36 mx-auto  text-white rounded-lg">Remove Image</p>
                      </button>
                    </div>
                  ) : (
                    <div className="upload-container">
                      <label className="file-input-label">
                        <input
                          type="file"
                          accept="image/*"
                          id="image"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        {/* Custom Button */}
        <label
                htmlFor="image"
                className="cursor-pointer w- mx-auto mt-2 text-sm flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-00"
              >
                <FiUpload className="text-sm " />
                Upload Image
              </label>
                        
                      </label>
                    </div>
                  )}
                </div>
              </div>

              
              {/* Form 1 */}
              <form action="" onSubmit={handleSubmit}>

                {/* Select Customer and Status */}
                <div className="flex place-content-around mt-8">
                  {/* Product Name  */}
                  <div className="flex flex-col ">
                    <label
                      for="productName"
                      className="text-gray-800 m-auto font-semibold"
                    >
                      Component Description-Product Name
                    </label>
                    <input
                      type="text"
                      id="productName"
                      name="productName"
                      placeholder="Enter Component Description"
                      className="bg-gray-200 rounded-full outline-non focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    <input
          type="file"
          id="uploadProductName"
          name="uploadProductName"x
          className="hidden"
          onChange={handleProductFileChange}
        />
        {/* Custom Button */}
        <label
                htmlFor="uploadProductName"
                className="cursor-pointer w- mx-auto mt-2 text-sm flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition duration-00"
              >
                <FiUpload className="text-sm " />
                Upload Image / PDF
              </label>
                    {errors.productName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.productName}
                      </p>
                    )}
                  </div>
                  {/* Select Customer */}
                  <div className="p-1 flex flex-col">
                  <label
                    htmlFor="customerName"
                    className="text-gray-800 mx-auto font-semibold"
                  >
                  Select Customer
                </label>
                <div className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full w-72 pr-2">
                  <select
                    id="customerName"
                    name="customerName"
                    value={customerName}
                    onChange={handleCustomerChange}
                    className="bg-gray-200  rounded-full outline-non border focus:outline-none   py-2 pl-2 w-full"
                    disabled={fetchingShortName}
                  >
                    <option value="">-- Select customer --</option>
                    {customers?.map((customer) => (
                      <option
                        key={customer.id}
                        value={customer.id}
                      >
                        {customer.customer_name || "Unnamed Customer"}
                      </option>
                    ))}
                  </select>
                </div>
                    {errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customerName}
                      </p>
                    )}
                    {fetchingShortName && (
                      <p className="text-gray-500 text-sm mt-1">
                        Loading customer details...
                      </p>
                    )}
              </div>
                  
                </div>
                
                {/* Machine Type and Status */}
                <div className="flex place-content-around mt-4">
                  {/* Short Name */}
                  <div className="flex flex-col ">
                    <label
                      htmlFor="shortName"
                      className="text-gray-800 m-auto font-semibold" 
                    >
                      Short Name{" "}
                    </label>
                    <input
                      type="text"
                      id="shortName"
                      name="shortName"
                      placeholder="Enter Short Name"
                      className="bg-gray-200 rounded-full focus:outline-none  border border-gray-400 mt-1 py-2 px-4 w-72"
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      // onBlur={handleBlur}
                      readOnly // Make it read-only as it's fetched from the API
                      aria-label="Customer short name"
                    />
                    {errors.shortName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.shortName}
                      </p>
                    )}
                    {fetchingShortName && (
                      <p className="text-blue-500 text-sm mt-2 text-center">
                        Fetching short name...
                      </p>
                    )}
                  </div>
                  {/* Status */}
                  <div className="order p-1 border-black flex flex-col">
                    <label
                      htmlFor="status"
                      className="text-gray-800 m-auto font-semibold"
                    >
                      Status
                    </label>
                    <div className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full w-72 pr-2">
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-gray-200 focus:outline-none rounded-full py-2 pl-2 w-full"
                      >
                        <option value="" disabled> -- Select Status --
                        </option>
                        <option value="moving"> Moving </option>
                        <option value="non moving"> Non Moving </option>
                        <option value="semi moving"> Semi Moving </option>
                        <option value="discontinued"> Discontinued </option>
                        <option value="cancelled"> Cancelled </option>
                      </select>
                    </div>
                    {errors.status && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.status}
                      </p>
                    )}
                  </div>
                  
                  
                </div>

                {/* MHC Number and Product Name  */}
                <div className=" flex place-content-around mt-7">
                  {/* MHC Number */}
                  <div className="flex flex-col ">
                    <label
                      for="mhcNumber"
                      className="text-gray-800 m-auto font-semibold"
                    >
                      MHC Number{" "}
                    </label>
                    <input
                      type="text"
                      id="mhcNumber"
                      name="mhcNumber"
                      placeholder="Enter MHC Number"
                      className="bg-gray-200  focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                      value={mhcNumber}
                      onChange={(e) => setMhcNumber(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.mhcNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mhcNumber}
                      </p>
                    )}
                  </div>

                  {/* HSC Number */}
                  <div className="flex flex-col ">
                    <label
                      for="hsmNumber"
                      className="text-gray-800 m-auto font-semibold"
                    >
                      HSM Number{" "}
                    </label>
                    <input
                      type="text"
                      id="hsmNumber"
                      name="hsmNumber"
                      placeholder="Enter HSM Number"
                      className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                      value={hsmNumber}
                      onChange={(e) => setHsmNumber(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.hsmNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.hsmNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* item code and Customer Wise Mold Number*/}
                <div className=" flex place-content-around mt-7">
                  
                  {/* item code */}
                  <div className="flex flex-col">
                    <label
                      for="itemCode"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Item Code
                    </label>
                    <input
                      type="text"
                      id="itemCode"
                      name="itemCode"
                      placeholder="Enter Item Code"
                      className="bg-gray-200 focus:outline-none  border border-gray-400  px-auto rounded-full mt-1 py-2 px-4 w-72 "
                      value={itemCode}
                      onChange={(e) => setItemCode(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.itemCode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.itemCode}
                      </p>
                    )}
                  </div>
                  {/* Customer Wise Mold Number */}
                  <div className="flex flex-col">
                    <label
                      for="customerMoldNo"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Customer Wise Mold Number
                    </label>
                    <input
                      type="text"
                      id="customerMoldNo"
                      name="customerMoldNo"
                      placeholder="Enter Customer Wise Mold Number"
                      className="bg-gray-200 focus:outline-none  border border-gray-400 px-auto rounded-full mt-1 py-2 px-4 w-72"
                      value={customerMoldNo}
                      readOnly
                      aria-label="Customer mold number"
                      onChange={(e) => setCustomerMoldNo(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.customerMoldNo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customerMoldNo}
                      </p>
                    )}
                    {fetchingMoldNumbers && (
                      <p className="text-blue-500 text-sm mt-2 text-center">
                        Fetching mold numbers...
                      </p>
                    )}
                  </div>
                </div>

                {/*  Customer Wise Mold Number*/}
                <div className=" flex place-content-around mt-7">
                  
                  {/* Mold Number  */}
                  <div className="flex flex-col ">
                    <label
                      for="moldNo"
                      className="text-gray-700 m-auto font-semibold"
                    >
                      Mold Number
                    </label>
                    <input
                      className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                      type="text"
                      id="moldNo"
                      name="moldNo"
                      placeholder="Enter Mold Number"
                      value={moldNo}
                      readOnly
                      aria-label="Mold number"
                      onChange={(e) => setMoldNo(e.target.value)}
                      //  onBlur={handleBlur}
                    />
                    {errors.moldNo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.moldNo}
                      </p>
                    )}
                  </div>
                  {/* Machine Type */}
                  <div className="order p-1 border-black flex flex-col ">
                    <label
                      htmlFor="machineType"
                      className="text-gray-800 m-auto font-semibold"
                    >
                      Machine Type
                    </label>
                    <div className="bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 w-72 pr-2">
                      <select
                        id="machineType" 
                        name="machineType"
                        value={machineType}
                        onChange={(e) => setMachineType(e.target.value)}
                        className="bg-gray-200 focus:outline-none   rounded-full py-2 pl-2 w-full"
                      >
                        <option value="" disabled>
                          -- Machine Type --
                        </option>
                        <option value="Pl-Inj-Vert.-Indv.">
                          
                          Pl-Inj-Vert.-Indv.
                        </option>
                        <option value="Pl-Inj-Hoz.-Indv.">
                          
                          Pl-Inj-Hoz.-Indv
                        </option>
                        <option value="Pl-Inj-Vert.-Fam.">
                          
                          Pl-Inj-Hoz.-Fam
                        </option>
                        <option value="Pl-Inj-Vert.-Fam.">
                          
                          Pl-Inj-Vert.-Fam
                        </option>

                        {/* {customers.map((customer) => (
                                                <option key={customer.id} label={customer.customer_name || 'Unnamed Customer'} value={customer.id.toString()}>
                                                    {customer.name}
                                                </option>
                                                ))} */}
                      </select>
                    </div>
                    {errors.machineType && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.machineType}
                      </p>
                    )}
                  </div>
                </div>

                {/* PointA and PointB */}
                <div className="flex place-content-around mt-7">
                  {/* maintenace */}
                  <div className="flex flex-col">
                    <label
                      for="maintenace"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Preventive Maintenace
                    </label>
                    <input
                      type="text"
                      id="maintenace"
                      name="maintenace"
                      value={maintenace}
                      placeholder="Enter Maintenace"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      onChange={(e) => setMaintenace(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.maintenace && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.maintenace}
                      </p>
                    )}
                  </div>
                  {/* PointA  */}
                  <div className="flex flex-col focus:outline-none">
                    <label
                      for="checkPoint"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Check Point
                    </label>
                   
                    <div  className="bg-gray-200 focus:outline-non rounded-full outline-non border border-gray-400 py-2 mt-1 px-4 w-72 overflow-auto max-h-24 flex items-center flex-wrap gap-2">
          {/* Render existing points */}
          {checkPoints.map((point, index) => (
            <span
              key={index}
              className="bg-blue-500 text-white text-sm px-3 py-1 focus:outline-none  rounded-full flex items-center gap-2"
            >
              {point}
              <button
                type="button"
                onClick={() => {
                  const updatedPoints = checkPoints.filter((_, i) => i !== index);
                  setCheckPoints(updatedPoints);
                }}
                className="text-red-400 hover:text-red-500"
                title="Delete"
              >
                ✕
              </button>
            </span>
          ))}

          {/* The input field */}
          <input
            type="text"
            id="inlineCheckPoints"
            value={inputValue}
            placeholder="Type and press Enter"
            className="bg-transparent outline-none focus:outline-none  flex-1 min-w-[50px]"
            onChange={handleInputChange}
            onKeyDown={handleAddPoint}
          /> 
        </div>
        
                    <input
          type="file"
          id="uploadCheckPoint"
          name="uploadCheckPoint"
          className="hidden"
          onChange={(e) => setUploadCheckPoint(e.target.files[0])}
        />
        {/* Custom Button */}
        <label
                htmlFor="uploadCheckPoint"
                className="cursor-pointer w- mx-auto mt-2 text-sm flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition duration-00"
              >
                <FiUpload className="text-sm " />
                Attach Checkpoints File 
              </label>
                    {errors.checkPoint && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.checkPoint}
                      </p>
                    )}
                  </div>
                </div>

                {/* Control Plan No and Counting No's*/}
                <div className="flex place-content-around mt-7">
                  {/*  Process Plan No */}
                  <div className="flex flex-col">
                    <label
                      for="processPlan"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Process Plan Number
                    </label>
                    <input
                      type="text"
                      id="processPlan"
                      name="processPlan"
                      value={processPlan}
                      placeholder="Enter Process Plan Number"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      onChange={(e) => setProcessPlan(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    <input
          type="file"
          id="uploadProcessPlan"
          name="uploadProcessPlan"
          accept=".xls, .xlsx"
          className="hidden "
          onChange={(e) => setUploadProcessPlan(e.target.files[0])}
        />
        {/* Custom Button */}
        <label
                htmlFor="uploadProcessPlan"
                className="cursor-pointer  mx-auto mt-2 text-sm flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition duration-00"
              >
                <FiUpload className="text-sm " />
                Upload XLS / XLSX
              </label>
                    {errors.processPlan && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.processPlan}
                      </p>
                    )}
                  </div>
                  {/* Control Plan No  */}
                  <div className="flex flex-col">
                    <label
                      for="controlPlan"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Control Plan Number
                    </label>
                    <input
                      type="text"
                      id="controlPlan"
                      name="controlPlan"
                      value={controlPlan}
                      placeholder="Enter Control Plan Number"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      onChange={(e) => setControlPlan(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    <input
          type="file"
          id="uploadControlPlan"
          name="uploadControlPlan"
          accept=".xls, .xlsx"          
          className="hidden "
          onChange={(e) => setUploadControlPlan(e.target.files[0])}
        />
        {/* Custom Button */}
              <label
                htmlFor="uploadControlPlan"
                className="cursor-pointer mx-auto mt-2 text-sm flex items-center gap-2 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition duration-00"
              >
                <FiUpload className="text-sm" />
                Upload XLS / XLSX
              </label>
                    {errors.controlPlan && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.controlPlan}
                      </p>
                    )}
                  </div>
                </div>

                {/* Mold Number and Number of Cavities*/}
                <div className="flex place-content-around mt-7">
                  {/* Number of Cavities */}
                  <div className="flex flex-col">
                    <label
                      for="cavities"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Number of Cavities
                    </label>
                    <input
                      type="text"
                      id="cavities"
                      name="cavities"
                      placeholder="Number of Cavities"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      value={cavities}
                      onChange={(e) => setCavities(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.cavities && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cavities}
                      </p>
                    )}
                  </div>

                  {/*  Net Wt.of Component */}
                  <div className="flex flex-col">
                    <label
                      for="netComponent"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Net Wt.of Component (gms)
                    </label>
                    <input
                      type="text"
                      id="netComponent"
                      name="netComponent"
                      placeholder="Enter Net Wt.of Component"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      value={netComponent}
                      onChange={(e) => setNetComponent(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.netComponent && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.netComponent}
                      </p>
                    )}
                  </div>
                  
                  
                </div>

                {/* efficiency and Cycle Time */}
                <div className="flex place-content-around mt-7">
                  {/*  Runner Weight Per Shot  */}
                  <div className="flex flex-col">
                    <label
                      for="runnerWeight"
                      className="mx-auto mt-5 text-gray-700 font-semibold"
                    >
                      Runner Weight Per Shot (gms)
                    </label>
                    <input
                      type="text"
                      id="runnerWeight"
                      name="runnerWeight"
                      value={runnerWeight}
                      placeholder="Enter Runner Weight Per Shot "
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      onChange={(e) => setRunnerWeight(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.runnerWeight && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.runnerWeight}
                      </p>
                    )}
                  </div>
                  {/*  Counting No's */}
                  <div className="flex flex-col">
                    <label
                      for="counting"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Raw Material Required Per Piece <br /> (Counting No)
                    </label>
                    <input
                      type="text"
                      id="counting"
                      name="counting"
                      value={counting}
                      placeholder="Enter Counting Number's"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      onChange={(e) => setCounting(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.counting && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.counting}
                      </p>
                    )}
                  </div>
                  
                  
                </div>

                

                

                {/* Control Plan No and Counting No's*/}
                <div className="flex place-content-around mt-7">
                  
                  {/* Counting Weight  */}
                  <div className="flex flex-col">
                    <label
                      for="countingWeight"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Shot Weight (Counting Weight)(kg)
                    </label>
                    <input
                      type="text"
                      id="countingWeight"
                      value={countingWeight}
                      name="countingWeight"
                      placeholder="Enter Counting Weight"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      onChange={(e) => setCountingWeight(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.countingWeight && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.countingWeight}
                      </p>
                    )}
                  </div>
                  {/*  Net Wt.of Runner Per Piece */}
                  <div className="flex flex-col w-72">
                    <label
                      for="netRunner"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Net Wt.of Runner Per Piece (gms)
                    </label>
                    <input
                      type="text"
                      id="netRunner"
                      name="netRunner"
                      placeholder="Enter Net Wt.of Runner Per Piece"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      value={netRunner}
                      onChange={(e) => setNetRunner(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.netRunner && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.netRunner}
                      </p>
                    )}
                  </div>
                </div>

                {/* Net Wt.of Component and Net Wt.of Runner Per Piece */}
                <div className="flex place-content-around mt-7">
                  {/* Cycle Time */}
                  <div className="flex flex-col">
                    <label
                      for="caycleTime"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Cycle Time (seconds)
                    </label>
                    <input
                      type="text"
                      id="cycleTime"
                      name="cycleTime"
                      value={cycleTime}
                      placeholder="Enter Cycle Time"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72`}
                      onChange={(e) => setCycleTime(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.cycleTime && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cycleTime}
                      </p>
                    )}
                  </div>
                  {/* efficiency  */}
                  <div className="flex flex-col">
                    <label
                      for="efficiency"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Efficiency (%)
                    </label>
                    <input
                      type="text"
                      id="efficiency"
                      name="efficiency"
                      placeholder="Enter Efficiency (%)"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72 `}
                      value={efficiency}
                      onChange={(e) => setEfficiency(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.efficiency && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.efficiency}
                      </p>
                    )}
                  </div>
                  
                </div>

                {/* Net Wt.of Component and Net Wt.of Runner Per Piece */}
                <div className="flex place-content-around mt-7 ">
                  {/* Product Per Shift */}
                  <div className="flex flex-col w-72">
                    <label
                      for="productPerShift"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Product Per Shift (8Hrs)
                    </label>
                    <input
                      type="text"
                      id="productPerShift"
                      name="productPerShift"
                      placeholder="Enter Product Per Shift"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72 `}
                      value={productPerShift}
                      onChange={(e) => setProductPerShift(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.productPerShift && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.productPerShift}
                      </p>
                    )}
                  </div>

                  {/* Product Per Shift */}
                  <div className="flex flex-col w-72">
                    <label
                      for="rawMaterialPerShift"
                      className="mx-auto text-gray-700 font-semibold"
                    >
                      Raw Material Per Shift
                    </label>
                    <input
                      type="text"
                      id="rawMaterialPerShift"
                      name="rawMaterialPerShift"
                      placeholder="Auto Display"
                      className={`bg-gray-200 focus:outline-none  border border-gray-400 rounded-full mt-1 py-2 px-4 w-72 `}
                      value={rawMaterialPerShift}
                      // onChange={(e) => setRawMaterialPerShift(e.target.value)}
                      // onBlur={handleBlur}
                    />
                    {errors.rawMaterialPerShift && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.rawMaterialPerShift}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center m-7 ">
                  <button
                    type="submit"
                    className=" bg-[#7d40ff] rounded-full w-52 px-4 py-3 my-auto text-white mt-5"
                  >
                    Add Product
                  </button>
                </div>
                {successMessage && (
                  <p className="text-green-500 text-lg flex justify-center ">
                    {successMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
