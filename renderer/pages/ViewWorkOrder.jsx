import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import Header from "./Header";
import { useRouter } from "next/router";

const ViewWorkOrder = () => {
    const [productData, setProductData] = useState({});
    const [cycleTime, setCycleTime] = useState(0);
    const [efficiency, setEfficiency] = useState(0);
    const [cavities, setCavities] = useState(0);
    const [operators, setOperators] = useState([]);
    const [machines, setMachines] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [isEditing, setIsEditing] = useState(false);
    const [token, setToken] = useState("");

    const [formData, setFormData] = useState({
        usedMachineNumber: "",
        finishedDate: "",
        shift: "",
        date: "",
        operatorId: "",
        standardQty: "",
        workingHrs: "",
        okQty: "",
        rejectedQty: "",
        rejectionReason: "",
        runnerKg: "",
        lumpsKg: "",
        efficiency: "",
        remark: "",
    });

    const router = useRouter();
    const { id } = router.query;
    const createdAt = productData.data?.createdAt;
    let maxDate = "";
    
    if (createdAt) {
      const createdAtDate = new Date(createdAt);
      createdAtDate.setDate(createdAtDate.getDate() + 15); // Add 15 days
      maxDate = createdAtDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
    }

    // Retrieve token from session storage
    useEffect(() => {
        const storedToken = sessionStorage.getItem("authToken");
        if (storedToken) {
            setToken(storedToken);
        } else {
            router.replace("/"); // Redirect to login if no token
        }
    }, []);

    // console.log("Token:", token);

    // Fetch Work Order Data
    useEffect(() => {
        const fetchData = async () => {
            if (!token || !id) return;

            try {
                const response = await axios.get(`https://machanite-be.onrender.com/work-order/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setProductData(response.data);
                setCycleTime(productData.data?.product?.cycle_time || 10);
                setEfficiency(productData.data?.product?.efficiency || 10);
                setCavities(productData.data?.product?.no_of_cavities || 10);
                
                console.log("setCycleTime:", cycleTime);
                console.log("setEfficiency", efficiency);
                console.log("setCavities", cavities);
                // console.log("Work Order Data:", response.data);
                console.log("Work Order Data:", response.data);
            } catch (error) {
                console.error("Error fetching work order data:", error);
            }
        };

        fetchData();
    }, [id, token]);

    // Fetch Operators
    useEffect(() => {
        const fetchUsers = async () => {
            if (!token) return;

            try {
                const response = await axios.get("https://machanite-be.onrender.com/users/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setOperators(response.data.operator || []);
            } catch (error) {
                console.error("Error fetching operators:", error);
            }
        };

        fetchUsers();
    }, [token]);

    // Fetch Machines
    useEffect(() => {
        const fetchMachines = async () => {
            if (!token) return;

            try {
                const response = await axios.get("https://machanite-be.onrender.com/machine/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setMachines(response.data || []);
                console.log("Machines Data:", response.data);
            } catch (error) {
                console.error("Error fetching machines:", error);
            }
        };

        fetchMachines();
    }, [token]);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Data...", formData);

        try {
            const payload = {
                used_machine_no: formData.usedMachineNumber,
                finish_date: formData.finishedDate,
                date: formData.date,
                shift: formData.shift,
                operator_id: formData.operatorId,
                standard_qty: Number(formData.standardQty),
                working_hours: Number(formData.workingHrs),
                ok_qty: Number(formData.okQty),
                rejected_qty: Number(formData.rejectedQty),
                reason_of_rejection: formData.rejectionReason,
                runners_kg: Number(formData.runnerKg),
                lumps_kg: Number(formData.lumpsKg),
                efficiency: Number(formData.efficiency),
                remarks: formData.remark,
            };

            console.log("Payload being sent:", payload);

            const response = await axios.put(
                `https://machanite-be.onrender.com/work-order/edit-wo-operators/${id}`,
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("Response from server:", response);
            alert("Work order saved successfully!");
        } catch (error) {
            console.error("Error saving data:", error.response ? error.response.data : error.message);
        }
    };

    // Handle Reset Form
    const handleAddMore = () => {
        setFormData({
            usedMachineNumber: "",
            finishedDate: "",
            shift: "",
            date: "",
            operatorId: "",
            standardQty: "",
            workingHrs: "",
            okQty: "",
            rejectedQty: "",
            rejectionReason: "",
            runnerKg: "",
            lumpsKg: "",
            efficiency: "",
            remark: "",
        });
    };

    // Handle Report Navigation
    const handleReport = () => {
        router.push({
            pathname: "/ProductionTable",
            query: { id: id },
        });
    };

    // Calculate Efficiency Whenever Related Fields Change
    useEffect(() => {
        const workingSeconds = Number(formData.workingHrs) * 60 * 60;
        console.log("Working Seconds:", workingSeconds);

        if (workingSeconds > 0 && efficiency > 0 && cavities > 0) {
            const calculatedEfficiency =
                (Number(formData.okQty) * Number(cycleTime) * 100 * 100) /
                (efficiency * cavities * workingSeconds);

            console.log("Calculated Efficiency:", calculatedEfficiency);

            setFormData((prevData) => ({
                ...prevData,
                efficiency: isNaN(calculatedEfficiency) || !isFinite(calculatedEfficiency)
                    ? ""
                    : calculatedEfficiency.toFixed(2),
            }));
        }
    }, [formData.okQty, formData.workingHrs, cycleTime, efficiency, cavities]);
   
    
   
    
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
                    <div className="w-[800px] mx-auto flex flex-col  py-10 mt-8 px-8  bg-[#ffffffe2] shadow-2xl rounded-2xl">
                    
                        <h1 className="flex justify-center text-2xl font-bold  text-[#7d40ff]">{productData.data?.work_order_no}</h1>
                        {/* <h1 className="flex justify-center text-gray-800 font-bold mt-1"> Date: {new Date().toLocaleDateString('en-GB')}</h1> */}
                        <h1 className="flex justify-center text-gray-800 font-bold mt-1">
                            Date: {new Date(selectedDate).toLocaleDateString('en-GB')}
                        </h1>

                        <div className='border border-[#7d40ff] w-full mt-4'></div> 


                         {/* Component Description and Status */}
                        <div className='flex  mt-8'>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Customer Name:</strong> {productData.data?.product?.customer?.customer_name || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Item No:</strong> {productData.data?.product?.item_code || 'N/A'}</p>
                        </div>  

                        <div className='flex  mt-4  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Part Name:</strong> {productData.data?.product?.component_description || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Scheduled Machine :</strong> {productData.data?.product?.product_histories?.scheduledMachine?.machine_name || 'N/A'}</p>
                            {/* <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Raw Material Type:</strong> {productData.data?.workOrderRawMaterials?.material_type || 'N/A'}</p> */}
                        </div>
                         
                        <div className='flex  mt-4  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Expected Quantity:</strong> {productData.data?.sales_order_quantity || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Mold Number:</strong> {productData.data?.product?.mold_no || 'N/A'}</p>
                        </div> 

                       {/* Table for Product */}
                        <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-300 mt-8 mx-10">
                            <table className="min-w-full border border-gray-300 shadow-lg bg-white">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Product Name</th>
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Stock Quantity</th>
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Required Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-100">
                                        {/* ✅ Product Name */}
                                        <td className="border border-gray-300 px-4 py-1.5 text-center">
                                            {productData.data?.product?.component_description || 'N/A'}
                                        </td>                        
                                        {/* ✅ Stock Quantity from stockDetail */}
                                        <td className="border border-gray-300 px-4 py-1.5 text-center">
                                            {productData.data?.product?.stockDetail?.quantity || 'N/A'}
                                        </td>
                                        {/* ✅ Required Quantity */}
                                        <td className="border border-gray-300 px-4 py-1.5 text-center">
                                            {productData.data?.expected_quantity || 'N/A'}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        {/* Table for Raw Material Details */}
                        <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-300 mt-10 mx-10">
                            <table className="min-w-full border border-gray-300 hadow-lg bg-white">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Raw Material Type</th>
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Name</th>
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Stock Quantity</th>
                                        <th className="border border-gray-300 px-4 py-1.5 text-gray-700">Required Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {productData.data?.workOrderRawMaterials?.map((material, index) => {
                                     // Determine the unit based on material type
                                    let unit = "";
                                    if (material.material_type === "insert") {
                                        unit = "No";
                                    } else if (material.material_type === "material") {
                                        unit = "kg";
                                    } else if (material.material_type === "colour") {
                                        unit = "kg";
                                    }

                                    return (
                                        <tr key={index} className="hover:bg-gray-100">
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">{material.material_type || 'N/A'}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">{material.rawMaterial?.material_name || 'N/A'}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">{material.rawMaterial?.quantity || 'N/A'}</td>
                                            <td className="border border-gray-300 px-4 py-1.5 text-center">
                                                {material.required_quantity ? `${Number(material.required_quantity).toFixed(2)} ${unit}` : 'N/A'}
                                            </td>
                                        </tr>
                                    );
                                })}

                                </tbody>
                            </table>
                        </div>
                        
                                           
                        <div className='flex mt-10'>
                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                <div className="flex flex-col order border-black m">
                                    <label htmlFor="usedMachineNumber" className="text-gray-800 ml-1 font-semibold">
                                        Used Machine Name:
                                    </label>
                                    <select
                                        name="usedMachineNumber"
                                        id="usedMachineNumber"
                                        value={formData.usedMachineNumber}
                                        onChange={handleChange}
                                        className="bg-gray-200 focus:outline-none border border-gray-400 rounded-full mt-1 py-2 px-4 w-72"
                                    >
                                        <option value="" disabled>
                                            -- Select Machine Number --
                                        </option>
                                        {machines.length > 0 ? (
                                            machines.map((machine) => (
                                                <option key={machine.id} value={machine.id}>
                                                    {machine.machine_name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No Machines Available</option>
                                        )}
                                    </select>
   
                        </div>
                                
                                </div>

                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="finishedDate" className='text-gray-800 ml-1 font-bold'>Finished Date</label>
                                    <input type="date" name="finishedDate"
                                        id="finishedDate"
                                        min={new Date().toISOString().split("T")[0]} 
                                        onKeyDown={(e) => e.preventDefault()} // Prevents manual typing 
                                        //   max={ productData.data?.createdAt?.split("T")[0]}
                                          max={ maxDate}
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.finishedDate} onChange={handleChange} />
                                </div>
                            </div>

                        <h1 className="flex justify-center text-2xl mt-10 font-bold  text-[#7d40ff]">Production Report</h1>
                        <div className='border border-[#7d40ff] w-full mt-4'></div> 

                            <div className='flex mt-6'>
                            <div className='w-80 mr-10 ml-9 flex flex-col'>
                                        <label htmlFor="operatorId" className='text-gray-800 ml-1 font-bold'>Operator Name:</label>
                                        <select name="operatorId" 
                                            id="operatorId"
                                            className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                            value={formData.operatorId} onChange={handleChange}>
                                            <option value="">-- Select Operator --</option>
                                            {operators.map((operator) => (
                                                <option key={operator.id} value={operator.id}>{operator.name}</option>
                                            ))}
                                        </select>
                                </div>

                                
                                 <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="date" className='text-gray-800 ml-1 font-bold'> Date:</label>
                                    <input type="date" name="date"  id="date"
                                         onKeyDown={(e) => e.preventDefault()}
                                         min={new Date().toISOString().split('T')[0]} // Disables past dates
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.date} onChange={handleChange} />
                                </div>
                            </div>

                            <div className='flex mt-6'>
                                 
                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="shift" className='text-gray-800 ml-1 font-bold'>Shift:</label>
                                   
                                    <select name="shift"
                                        id="shift"
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.shift} onChange={handleChange}
                                    >
                                        <option value="" disabled>-- Select Shift --</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>    
                                </div>

                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="standardQty" className='text-gray-800 ml-1 font-bold'>Production Qty Per Shift:</label>
                                    <input type="text" 
                                           name="standardQty" 
                                           id="standardQty"
                                           readOnly
                                           placeholder='Enter Production Qty'
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={productData.data?.product?.production_per_shift} /> 
                                        </div>
                                
                            </div>

                            <div className='flex mt-4'>
                            <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="workingHrs" className='text-gray-800 ml-1 font-bold'>Working Hrs:</label>
                                    <input type="text" 
                                           id="workingHrs"
                                           name="workingHrs" 
                                           placeholder='Enter Working Hrs'
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.workingHrs} onChange={handleChange} />
                                </div>

                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="okQty" className='text-gray-800 ml-1 font-bold'>OK Qty No's:</label>
                                    <input type="text" 
                                           name="okQty" 
                                           id="okQty"
                                           placeholder='Enter OK Qty No'
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.okQty} onChange={handleChange} />
                                </div>
                               
                            </div>
{/*  */}
                        <div className='flex  mt-4  '>
                        <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="rejectedQty" className='text-gray-800 ml-1 font-bold'>Rejected Qty No's:</label>
                                    <input type="text" 
                                           name="rejectedQty" 
                                           id="rejectedQty"
                                           placeholder='Enter Rejected Qty No'
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.rejectedQty} onChange={handleChange} />
                                </div>

                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="rejectionReason" className='text-gray-800 ml-1 font-bold' >Reason of Rejection:</label>
                                <input type="text" 
                                       placeholder='Enter Reason of Rejection'
                                       value={formData.rejectionReason} onChange={handleChange} 
                                       className='bg-gray-200 rounded-full   border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72' 
                                       name="rejectionReason" id="rejectionReason" />                                   
                            </div>
                           
                        </div>
                        
                        <div className='flex  mt-4  '>
                        <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="runnerKg" className='text-gray-800 ml-1 font-bold' >Runner Kg's:</label>
                                <input type="text" 
                                       placeholder='Enter Runner kg' 
                                       value={formData.runnerKg} onChange={handleChange}
                                        name="runnerKg" id="runnerKg"
                                       className='bg-gray-200 rounded-full   border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'/>
                            </div>
                            
                            <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="lumpsKg" className='text-gray-800 ml-1 font-bold' >Lumps Kg's:</label>
                                <input type="text" 
                                       placeholder='Enter Lumps kg' 
                                       value={formData.lumpsKg} onChange={handleChange}
                                       className='bg-gray-200 rounded-full   border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72' 
                                       name="lumpsKg" id="lumpsKg" />
                            </div>
                           
                        </div>
                        
                        
                        <div className='flex mt-4'>
                        <div className='w-80 mr-10 ml-9 order border-black flex flex-col'>
                                <label htmlFor="efficiency" className='text-gray-800 ml-1 font-bold' >Opeartor Efficiency (%):</label>
                                 <input type="text" 
                                       placeholder='Auto Generated' 
                                       name="efficiency" id="efficiency"
                                    //    value={formData.efficiency} onChange={handleChange}
                                       value={formData.efficiency}
                                 readOnly
                                       className='bg-gray-200 rounded-full   border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'/>
                            </div>

                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="remark" className='text-gray-800 ml-1 font-bold'>Remark:</label>
                                    <select name="remark" 
                                            id="remark" 
                                            className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                            value={formData.remark} onChange={handleChange}>
                                        <option value="">-- Select Remark --</option>
                                        <option value="Machine Breakdown">Machine Breakdown</option>
                                        <option value="Mold Breakdown">Mold Breakdown</option>
                                        <option value="No Man Power">No Man Power</option>
                                        <option value="Power off">Power off</option>
                                        <option value="RM Shortage">RM Shortage</option>
                                        <option value="No Plan">No Plan</option>
                                    </select>
                                </div>
                            </div>

                        <div className='flex mt-'>
                            <button
                                type="submit"
                                onClick={handleAddMore}
                                className=" bg-[#7d40ff] mx-auto  rounded-full w-52 px-4 py-2.5 my-auto text-white mt-10"
                            >
                                Add More
                            </button>

                            <button
                                type="submit"
                                onClick={handleReport}
                                className=" bg-[#7d40ff] mx-auto  rounded-full w-52 px-4 py-2.5 my-auto text-white mt-10"
                            >
                                Report
                            </button>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className=" bg-[#7d40ff] mx-auto  rounded-full w-52 px-4 py-2.5 my-auto text-white mt-10"
                        >
                            Save
                        </button>


                    </div>
                </div>
            </div>
        </div>  
    );

};

export default ViewWorkOrder;
