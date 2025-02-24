import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';

const ViewWorkOrder = () => {
    const [productData, setProductData] = useState("");
    const [cycleTime, setCycleTime] = useState("");
    const [efficiency, setEfficiency] = useState("");
    const [cavities, setCavities] = useState("");
    const [operators, setOperators] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [isEditing, setIsEditing] = useState(false);
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
        remark: ""
    });

    const router = useRouter();
    const { id } = router.query;
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/work-order/${id}`);
                setProductData(response.data);
                setCycleTime(productData.data?.product?.cycle_time || 0);
                setEfficiency(productData.data?.product?.efficiency || 0);
                setCavities(productData.data?.product?.no_of_cavities || 0);
                console.log("efficiency", efficiency)
                console.log("cycleTime", cycleTime)
                console.log("cavities", cavities)
                console.log("Work", response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (id) fetchData();
    }, [id]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/users/all`);
                setOperators(response.data.operator || []);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log("Submitting Data...");
        console.log("Work Order ID:", id);
        console.log("Form Data:", formData); // Log entire formData
    
        try {
            const payload = {
                used_machine_no: formData.usedMachineNumber,
                finish_date: formData.finishedDate,
                date: formData.date,
                shift: formData.shift,
                operator_id: formData.operatorId,
                standard_qty: Number(formData.standardQty),  // Ensure numbers
                working_hours: Number(formData.workingHrs),
                ok_qty: Number(formData.okQty),
                rejected_qty: Number(formData.rejectedQty),
                reason_of_rejection: formData.rejectionReason,
                runners_kg: Number(formData.runnerKg),
                lumps_kg: Number(formData.lumpsKg),
                efficiency: Number(formData.efficiency),
                remarks: formData.remark,
            };
    
            console.log("Payload being sent:", payload); // Log payload before sending
    
            const response = await axios.put(`http://localhost:4000/work-order/edit-wo-opeerators/${id}`, payload);
            // /work-order/edit-wo-opeerators
            console.log("Response from server:", response);
            alert("Work order saved successfully!");
        } catch (error) {
            console.error("Error saving data:", error.response ? error.response.data: error.message);
        }
    };
    
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
            remark: ""
        });
    };

    const handleReport = () => {
        console.log(id,"Iiiiiddd");
        router.push({
            pathname: '/ProductionTable', // Page to navigate to
            query: { id: id }, // Parameters to pass
          });
    };

     // Calculate efficiency whenever related fields change
    useEffect(() => {
        const workingSeconds = Number(formData.workingHrs) * 60 * 60; // Convert working hours to seconds 28800
        console.log("Working Seconds:", workingSeconds);

        if (workingSeconds > 0) {
            const calculatedEfficiency =
                ((Number(formData.okQty) * Number(cycleTime)) / workingSeconds) *
                Number(efficiency) *
                Number(cavities) *
                100;

            console.log("Calculated Efficiency:", calculatedEfficiency);

            setFormData((prevData) => ({
                ...prevData,
                efficiency: isNaN(calculatedEfficiency) ? "": calculatedEfficiency.toFixed(2), // Limit decimals
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
                    <div className="w-[800px] mx-auto flex flex-col  py-10 mt-8 px-8 bg-[#ffffffe2] shadow-2xl rounded-2xl">
                    
                        <h1 className="flex justify-center text-2xl font-bold  text-[#7d40ff]">MES/WO/02/2025/001</h1>
                        {/* <h1 className="flex justify-center text-gray-800 font-bold mt-1"> Date: {new Date().toLocaleDateString('en-GB')}</h1> */}
                        <h1 className="flex justify-center text-gray-800 font-bold mt-1">
                            Date: {new Date(selectedDate).toLocaleDateString('en-GB')}
                        </h1>

                        {/* Toggle between displaying date and input field */}
                        {isEditing ? (
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border border-gray-400 px-2 py-1 w-[200px] mx-auto rounded-md"
                            />
                        ): null}

                        {/* Button to edit date */}
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-[#7d40ff] text-white px- w-[150px] text-sm mx-auto py-1.5 rounded-full mt-2"
                        >
                            {isEditing ? "Save Date": "Change Date"}
                        </button>
                        <div className='border border-[#7d40ff] w-full mt-4'></div> 

                           

                         {/* Component Description and Status */}
                        <div className='flex  mt-6'>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Customer Name:</strong> {productData.data?.product?.customer?.customer_name || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Item No:</strong> {productData.data?.product?.item_code || 'N/A'}</p>
                        </div>  

                        <div className='flex  mt-4  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Part Name:</strong> {productData.data?.product?.component_description || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Scheduled Machine Number:</strong> {productData.data?.product?.product_histories?.scheduled_machine_number || 'N/A'}</p>
                            {/* <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Raw Material Type:</strong> {productData.data?.workOrderRawMaterials?.material_type || 'N/A'}</p> */}
                        </div>
                         
                        <div className='flex  mt-4  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Expected Quantity:</strong> {productData.data?.sales_order_quantity || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Mold Number:</strong> {productData.data?.product?.mold_no || 'N/A'}</p>
                        </div> 

                       {/* Table for Product */}
                        <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-300 mt-6 mx-10">
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
                        <div className="overflow-x-auto overflow-y-auto rounded-lg shadow-lg border border-gray-300 mt-6 mx-10">
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
                                                {material.required_quantity ? `${material.required_quantity} ${unit}`: 'N/A'}
                                            </td>
                                        </tr>
                                    );
                                })}

                                </tbody>
                            </table>
                        </div>
                        
                                           
                        <div className='flex mt-6'>
                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="usedMachineNumber" className='text-gray-800 ml-1 font-bold'>Used Machine Number:</label>
                                    <input type="text" 
                                           id="usedMachineNumber"
                                           name="usedMachineNumber" 
                                           placeholder='Enter Used Machine Number'
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.usedMachineNumber} onChange={handleChange} />
                                </div>

                                <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="finishedDate" className='text-gray-800 ml-1 font-bold'>Finished Date:</label>
                                    <input type="date" name="finishedDate"
                                        id="finishedDate"
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
                            </div>

                            <div className='flex mt-6'>
                                  <div className='w-80 mr-10 ml-9 flex flex-col'>
                                    <label htmlFor="date" className='text-gray-800 ml-1 font-bold'> Date:</label>
                                    <input type="date" name="date"
                                        id="date"
                                        className='bg-gray-200 rounded-full border border-gray-400 outline-non focus:outline-none mt-1 py-2 px-4 w-72'
                                        value={formData.date} onChange={handleChange} />
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
