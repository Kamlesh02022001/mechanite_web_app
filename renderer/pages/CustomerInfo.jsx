import React, { useState,useEffect }  from 'react'
import Dashboard from './Dashboard'
import Header from './Header'
import axios from 'axios';
import { useRouter } from 'next/router';


const CustomerInfo = () => {
        // const [customer_short_name,setCustomer_short_name] = useState ('');
        // const [customer_name, setCustomer_name] = useState('');
        // const [address, setAddress] = useState('');
        // const [email, setEmail] = useState('');
        const [msmeNo, setMsmeNo] = useState('');
        const [panNo, setPanNo] = useState('');
        const [tanNo, setTanNo] = useState('');
        const [gst_num, setGst_num] = useState('');
        // const [city, setCity] = useState('');
        // const [states, setStates] = useState('');
        // const [pin, setPin] = useState('');
        const [errors, setErrors] = useState({});
        // State for Quality inputs
            const [contactName, setContactName] = useState('');
            const [designation, setDesignation] = useState('');
            const [contact, setContact] = useState('');
            const [qualityEmail, setQualityEmail] = useState('');
        // State for Logistic inputs
            const [logisticCustomerName, setLogisticCustomerName] = useState('');
            const [logisticDesignation, setLogisticDesignation] = useState('');
            const [logisticContact, setLogisticContact] = useState('');
            const [logisticEmail, setLogisticEmail] = useState('');
           const [successMessage, setSuccessMessage] = useState("");
        // State for Purchase Manager inputs
            const [purchaseManagerCustomerName, setPurchaseManagerCustomerName] = useState('');
            const [purchaseManagerDesignation, setPurchaseManagerDesignation] = useState('');
            const [purchaseManagerContact, setPurchaseManagerContact] = useState('');
            const [purchaseManagerEmail, setPurchaseManagerEmail] = useState('');
         
                const [isLoading, setIsLoading] = useState(true);
                const [error, setError] = useState(null);
                const [productData, setProductData] = useState([]);
                
             
            const router = useRouter();
            const { id } = router.query; // Get the ID from the query parameter
            console.log(id);

        const handleSubmit = async (e) => {
          e.preventDefault(); // Prevents page refresh
          console.log("Form submission started");
          const newErrors = {}; // Temporary object for error messages
          let isValid = true;
        
          // Validate each field individually
         
          if (!contactName.trim()) {
            isValid = false;
            newErrors.contactName = "Customer Name is required.";
          } else if (contactName.trim().length < 3) {
            isValid = false;
            newErrors.contactName = 'Customer name must be at least 3 characters long.';
        }
          
          if (!logisticCustomerName.trim()) {
            isValid = false;
            newErrors.logisticCustomerName = "Customer Name is required.";
          } else if (logisticCustomerName.trim().length < 3) {
            isValid = false;
            newErrors.logisticCustomerName = 'Customer name must be at least 3 characters long.';
        }
          if (!purchaseManagerCustomerName.trim()) {
            isValid = false;
            newErrors.purchaseManagerCustomerName = "Customer Name is required.";
          } else if (purchaseManagerCustomerName.trim().length < 3) {
            isValid = false;
            newErrors.purchaseManagerCustomerName = 'Customer name must be at least 3 characters long.';
        }
          if (!purchaseManagerEmail.trim()) {
            isValid = false;
            newErrors.purchaseManagerEmail = "Email is required.";
          }  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(purchaseManagerEmail)) {
            isValid = false;
            newErrors.purchaseManagerEmail = 'Please enter a valid email address.';
        }
          if (!contact.trim()) {
            isValid = false;
            newErrors.contact = "Contact is required.";
          } else if(!/^[0-9]{10}$/.test(contact)){
            isValid = false;
            newErrors.contact = "Please enter a valid number.";
          } 

          if (!logisticContact.trim()) {
            isValid = false;
            newErrors.logisticContact = "Contact is required.";
          } else if(!/^[0-9]{10}$/.test(logisticContact)){
            isValid = false;
            newErrors.logisticContact = "Please enter a valid number.";
          } 

          if (!purchaseManagerContact.trim()) {
            isValid = false;
            newErrors.purchaseManagerContact = "Contact is required.";
          } else if(!/^[0-9]{10}$/.test(purchaseManagerContact)){
            isValid = false;
            newErrors.purchaseManagerContact = "Please enter a valid number.";
          } 

          if (!msmeNo.trim()) {
            isValid = false;
            newErrors.msmeNo = "MSME Number is required.";
          } else if(!/^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/.test(msmeNo)){
            isValid = false;
            newErrors.msmeNo = "Please enter a valid number.";
          }

          if (!panNo.trim()) {
            isValid = false;
            newErrors.panNo = "PAN Number is required.";
          } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNo)){
            isValid = false;
            newErrors.panNo = "Please enter a valid number.";
          }

          if (!tanNo.trim()) {
            isValid = false;
            newErrors.tanNo = "TAN Number is required.";
          } else if(!/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/.test(tanNo)){
            isValid = false;
            newErrors.tanNo = "Please enter a valid number.";
          }

          if (!designation.trim()) {
            isValid = false;
            newErrors.designation = "Designation is required.";
          } else if (designation.trim().length < 3) {
            isValid = false;
            newErrors.designation = "Please enter a valid name.";
          }
          if (!purchaseManagerDesignation.trim()) {
            isValid = false;
            newErrors.purchaseManagerDesignation = "Designation is required.";
          } else if (purchaseManagerDesignation.trim().length < 3) {
            isValid = false;
            newErrors.purchaseManagerDesignation = "Please enter a valid name.";
          }

          if (!logisticDesignation.trim()) {
            isValid = false;
            newErrors.logisticDesignation = "Designation is required.";
           }  else if (logisticDesignation.trim().length < 3) {
            isValid = false;
            newErrors.logisticDesignation = "Please enter a valid name.";
          }

          if (!logisticEmail.trim()) {
            isValid = false;
            newErrors.logisticEmail = "Email is required.";
          }  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(logisticEmail)) {
            isValid = false;
            newErrors.logisticEmail = 'Please enter a valid email address.';
        }
          if (!qualityEmail.trim()) {
            isValid = false;
            newErrors.qualityEmail = "Email is required.";
          }  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(qualityEmail)) {
            isValid = false;
            newErrors.qualityEmail = 'Please enter a valid email address.';
        }
          if (!gst_num.trim()) {
            isValid = false;
            newErrors.gst_num = "Email is required.";
          } else if(!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[0-9]{1}$/.test(gst_num)){
            isValid = false;
            newErrors.gst_num = 'Please enter a valid number.';
          }
        console.log("complete",msmeNo)
          //Set errors or display success message
          if (isValid) {
            setErrors({});
            setSuccessMessage("Form submitted successfully!");
           
            const formData = {
              // customer_name: customer_name,
              // customer_short_name: customer_short_name,
              customer_id: id,
              // email: email,
              gst_num: gst_num,
              // address: fullAddress,
              msmeNo: msmeNo,
              panNo: panNo,
              tanNo: tanNo,
              quality: {
                contactPersonName : contactName,
                  designation: designation,
                  mobileNo : contact,
                  email: qualityEmail,
              },
              logistics: {
                  contactPersonName: logisticCustomerName,
                  designation: logisticDesignation,
                  mobileNo: logisticContact,
                  email: logisticEmail,
              },
              purchase_manager: {
                  contactPersonName: purchaseManagerCustomerName,
                  designation: purchaseManagerDesignation,
                  mobileNo: purchaseManagerContact,
                  email: purchaseManagerEmail,
              },
          };
          console.log("Sending data to API:", formData);
          try {
            const response = await axios.put(
                `https://machanite-be.onrender.com/customer/update/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                
              }
            );
            console.log("API Response:", response);
            
        } catch (error) {
            console.error("Error during API call:", error);
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error("Server Error:", error.response.data);
            } else if (error.request) {
                // Request was made but no response received
                console.error("No Response:", error.request);
            } else {
                // Something happened in setting up the request
                console.error("Error:", error.message);
            }
            setErrors("An error occurred. Please try again later.");
        }
        
          } else {
            setErrors(newErrors);
            setSuccessMessage("");
          }
        };

        useEffect(() => {
            const fetchData = async () => {
                try {
                 // const response = await axios.get('https://machanite-be.onrender.com/customer/${id}');
                    const response = await axios.get(`https://machanite-be.onrender.com/customer/${id}`);

                    setProductData(response.data);
                    console.log(response.data); // Log the data fetched

                    setMsmeNo(response.data.msmeNo);
                    setGst_num(response.data.gst_num);
                    setPanNo(response.data.panNo);
                    setTanNo(response.data.tanNo);
                    setContactName(response.data.quality?.contactPersonName);
                    setDesignation(response.data.quality?.designation);
                    setContact(response.data.quality?.mobileNo);
                    setQualityEmail(response.data.quality?.email);
                    setLogisticCustomerName(response.data.logistics?.contactPersonName);
                    setLogisticDesignation(response.data.logistics?.designation);
                    setLogisticContact(response.data.logistics?.mobileNo);
                    setLogisticEmail(response.data.logistics?.email)
                    setPurchaseManagerCustomerName(response.data.purchase_manager?.contactPersonName);
                    setPurchaseManagerDesignation(response.data.purchase_manager?.designation);
                    setPurchaseManagerContact(response.data.purchase_manager?.mobileNo);
                    setPurchaseManagerEmail(response.data.purchase_manager?.email);

                  
                } catch (err) {
                    console.error('Error fetching data:', err);
                    setError('Failed to load customer data. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchData();
        }, []);
       
  return (
    <>
    <div className='flex'>
          {/* Dashboard  */}
        <div className=''>
            <Dashboard/>
        </div>

                {/* Right side  */}
        <div className='w-full overflow-hidden '>

                
                {/* Main component  */}
            <div className=' pb-10  border-black bg-[#f7f5f5] w-full h-screen overflow-y-auto'>

            <div className='sticky top-0 '>
                <Header/>
            </div>


                    {/* Form 1 */}
                <form action="" onSubmit={handleSubmit}>

                        {/* Customer data  */}
                    <div className=' mt-5  w-[800px] mx-auto pb-8 pt-2 bg-[#ffffffe2] shadow-2xl rounded-2xl'>
                        
                        <h1 className='flex justify-center text-3xl font-bold pt-8 text-[#7d40ff]'>Customer Data</h1>

                           

                            {/* Third div  */}
                        <div className='flex place-content-around mt-3'> 
                            
                            {/* msme  */}
                            <div className='flex flex-col '>
                                <label for="msmeNo" className='text-gray-700 m-auto font-semibold'>MSME Number</label>
                                <input  className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' 
                                         type="text"
                                         id="msmeNo"
                                         name="msmeNo"
                                         placeholder="Enter MSME Number"
                                         value={msmeNo}
                                         onChange={(e) => setMsmeNo(e.target.value)}
                                        //  onBlur={handleBlur}
                                        
                                />   {errors.msmeNo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.msmeNo}</p>
                                )}                
                            </div>
                            
                             {/* gstin Nmber  */}
                             <div className='flex flex-col'>
                                <label for="gstinNmber" className='mx-auto text-gray-700 font-semibold'>GSTIN Number</label>
                                <input
                                    type="text"
                                    id="gst_num"
                                    name="gst_num"
                                    placeholder="Enter GSTIN Number"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 gst_num `}
                                    value={gst_num}
                                    onChange={(e) => setGst_num(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.gst_num && (
                                    <p className="text-red-500 text-sm mt-1">{errors.gst_num}</p>
                                )}
                            </div>                           
                        </div> 

                            {/* fourth div  */} 
                        <div className='flex place-content-around mt-3'> 
                           
                          {/* pan number  */}
                          <div className='flex flex-col'>
                                <label for="panNo" className='mx-auto text-gray-700 font-semibold'>PAN Number</label>
                                <input 
                                        type="text"
                                        id="panNo"
                                        name="panNo"
                                        placeholder="Enter PAN Number"
                                        className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 panNo `}
                                        value={panNo}
                                        onChange={(e) => setPanNo(e.target.value)}
                                        // onBlur={handleBlur}
                                />   {errors.panNo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.panNo}</p>
                                )}              
                            </div> 

                            <div className='flex flex-col '>
                                <label for="tanNo" className='text-gray-700 m-auto font-semibold'>TAN Number</label>
                                <input 
                                     type="text"
                                     id="tanNo"
                                     name="tanNo"
                                     placeholder="Enter TAN Number"
                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 tanNo `}
                                     value={tanNo}
                                     onChange={(e) => setTanNo(e.target.value)}
                                    //  onBlur={handleBlur}
                                />   {errors.tanNo && (
                                    <p className="text-red-500 text-sm mt-1">{errors.tanNo}</p>
                                )}                 
                            </div> 
                            
                        </div> 

                        <div className='flex ml-14 mt-3'>
                        
                        </div>

                            {/*  QUALITY  */}
                        <h1 className='flex justify-center text-3xl font-bold pt-5 text-[#7d40ff]'>Quality</h1>

                         {/* First div  */}
                        <div className='flex place-content-around mt-4'>  
                            {/* contact person name  */}
                            <div className='flex flex-col'>
                                <label for="contactName" className='mx-auto text-gray-700 font-semibold'>Contact Person Name</label>
                                {/* <input type="text" placeholder='Enter Contact Person Name' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72 ' required/>   */}
                                <input
                                    type="text"
                                    id="contactName"
                                    name="contactName"
                                    placeholder="Type Person Name"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 contactName `}
                                    value={contactName}
                                    onChange={(e) => setContactName(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.contactName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
                                )}                 
                            </div>
                            
                                {/* designation  */}
                            <div className='flex flex-col '>
                                <label for="designation" className='text-gray-700 m-auto font-semibold'>Designation</label>
                                {/* <input type="text"  placeholder='Enter Designation' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>     */}
                                                    <input
                                        type="text"
                                        id="designation"
                                        name="designation"
                                        placeholder="Enter Designation"
                                        className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 designation `}
                                        value={designation}
                                        onChange={(e) => setDesignation(e.target.value)}
                                        // onBlur={handleBlur}
                                    />
                                    {errors.designation && (
                                        <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
                                    )}               
                            </div>
                        </div> 

                        {/* Second div  */}
                        <div className='borde flex place-content-around mt-3 pb-7'>  
                                {/* contact number */}
                            <div className='flex flex-col'>
                                <label for="contactNumber" className='mx-auto text-gray-700 font-semibold'>Contact Number</label>
                                {/* <input type="moblie" placeholder='Enter Contact Number' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72' required/>  */}
                                <input
                                    type="text"
                                    id="contact"
                                    name="contact"
                                    placeholder="Enter Contact Number"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 contact `}
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.contact && (
                                    <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
                                )}                
                            </div>
                             {/* email  */}
                            <div className='flex flex-col '>
                                <label for="email" className='text-gray-700 m-auto font-semibold'>Email</label>
                                <input
                                    type="text"
                                    id="qualityEmail"
                                    name="qualityEmail"
                                    placeholder="Enter Email"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 qualityEmail `}
                                    value={qualityEmail}
                                    onChange={(e) => setQualityEmail(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.qualityEmail && (
                                    <p className="text-red-500 text-sm mt-1">{errors.qualityEmail}</p>
                                )}
                                {/* <input type="text"  placeholder='Enter Email' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
                            </div>
                        </div> 

                            {/* Third form  Logistic*/}
                        <h1 className='flex justify-center text-3xl font-bold pt-5 text-[#7d40ff]'>Logistic</h1>
                                    
                         {/* First div  */}
                         <div className=' flex place-content-around mt-4'> 
                             {/* logistic contact name   */}
                            <div className='flex flex-col'>
                                <label for="contactPersonName" className='mx-auto text-gray-700 font-semibold'>Contact Person Name</label>
                                <input
                                    type="text"
                                    id="logisticCustomerName"
                                    name="logisticCustomerName"
                                    placeholder="Type Customer Name"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticCustomerName `}
                                    value={logisticCustomerName}
                                    onChange={(e) => setLogisticCustomerName(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.logisticCustomerName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.logisticCustomerName}</p>
                                )} 
                                {/* <input type="text" placeholder='Enter Contact Person Name' name="username" className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72 ' required/>                    */}
                            </div>
                             {/* logistic Designation  */}
                            <div className='flex flex-col '>
                                <label for="designation" className='text-gray-700 m-auto font-semibold'>Designation</label>
                                <input
                                    type="text"
                                    id="logisticDesignation"
                                    name="logisticDesignation"
                                    placeholder="Enter Designation"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticDesignation `}
                                    value={logisticDesignation}
                                    onChange={(e) => setLogisticDesignation(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.logisticDesignation && (
                                    <p className="text-red-500 text-sm mt-1">{errors.logisticDesignation}</p>
                                )}
                                {/* <input type="text"  placeholder='Enter Designation' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
                            </div>
                        </div> 

                        {/* Second div  */}
                        <div className=' flex place-content-around mt-3 pb-7'>  
                             {/* logistic contact  */}
                            <div className='flex flex-col'>
                                <label for="contactNumber" className='mx-auto text-gray-700 font-semibold'>Contact Number</label>
                                <input
                                    type="text"
                                    id="logisticContact"
                                    name="logisticContact"
                                    placeholder="Enter Contact Number"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticContact `}
                                    value={logisticContact}
                                    onChange={(e) => setLogisticContact(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.logisticContact && (
                                    <p className="text-red-500 text-sm mt-1">{errors.logisticContact}</p>
                                )}
                                {/* <input type="mobile" placeholder='Enter Contact Number' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
                            </div>
                            {/* logistic email  */}
                            <div className='flex flex-col '>
                                <label for="email" className='text-gray-700 m-auto font-semibold'>Email</label>
                                <input
                                    type="text"
                                    id="logisticEmail"
                                    name="logisticEmail"
                                    placeholder="Enter Email"
                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticEmail `}
                                    value={logisticEmail}
                                    onChange={(e) => setLogisticEmail(e.target.value)}
                                    // onBlur={handleBlur}
                                />
                                {errors.logisticEmail && (
                                    <p className="text-red-500 text-sm mt-1">{errors.logisticEmail}</p>
                                )}
                                {/* <input type="text"  placeholder='Enter Email' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
                            </div>
                        </div> 



                            {/* manager */}
                            <h1 className='flex justify-center text-3xl font-bold pt-5 text-[#7d40ff]'>Purchase Manager</h1>
                           
    
                        {/* First div  */}
                        <div className=' flex place-content-around mt-3'> 
                            {/* manager contact name   */}
                           <div className='flex flex-col'>
                               <label for="purchaseManagerCustomerName" className='mx-auto text-gray-700 font-semibold'>Contact Person Name</label>
                               <input
                                   type="text"
                                   id="purchaseManagerCustomerName"
                                   name="purchaseManagerCustomerName"
                                   placeholder="Enter Person Name"
                                   className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticCustomerName `}
                                   value={purchaseManagerCustomerName}
                                   onChange={(e) => setPurchaseManagerCustomerName(e.target.value)}
                                  //  onBlur={handleBlur}
                               />
                               {errors.purchaseManagerCustomerName && (
                                   <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerCustomerName}</p>
                               )} 
                               {/* <input type="text" placeholder='Enter Contact Person Name' name="username" className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72 ' required/>                    */}
                           </div>
                            {/*  manager Designation  */}
                           <div className='flex flex-col '>
                               <label for="purchaseManagerDesignation" className='text-gray-700 m-auto font-semibold'>Designation</label>
                               <input
                                   type="text"
                                   id="purchaseManagerDesignation"
                                   name="purchaseManagerDesignation"
                                   placeholder="Enter Designation"
                                   className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticDesignation `}
                                   value={purchaseManagerDesignation}
                                   onChange={(e) => setPurchaseManagerDesignation(e.target.value)}
                                  //  onBlur={handleBlur}
                               />
                               {errors.purchaseManagerDesignation && (
                                   <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerDesignation}</p>
                               )}
                               {/* <input type="text"  placeholder='Enter Designation' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
                           </div>
                       </div> 

                       {/* Second div  */}
                       <div className=' flex place-content-around mt-3 pb-7'>  
                            {/* manager contact  */}
                           <div className='flex flex-col'>
                               <label for="purchaseManagerContact" className='mx-auto text-gray-700 font-semibold'>Contact Number</label>
                               <input
                                   type="text"
                                   id="purchaseManagerContact"
                                   name="purchaseManagerContact"
                                   placeholder="Enter Contact Number"
                                   className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72`}
                                   value={purchaseManagerContact}
                                   onChange={(e) => setPurchaseManagerContact(e.target.value)}
                                  //  onBlur={handleBlur}
                               />
                               {errors.purchaseManagerContact && (
                                   <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerContact}</p>
                               )}
                               {/* <input type="mobile" placeholder='Enter Contact Number' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
                           </div>
                           {/* manager email  */}
                           <div className='flex flex-col '>
                               <label for="purchaseManagerEmail" className='text-gray-700 m-auto font-semibold'>Email</label>
                               <input
                                   type="text"
                                   id="purchaseManagerEmail"
                                   name="purchaseManagerEmail"
                                   placeholder="Enter Email"
                                   className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticEmail `}
                                   value={purchaseManagerEmail} 
                                   onChange={(e) => setPurchaseManagerEmail(e.target.value)}
                                  //  onBlur={handleBlur}
                               /> {errors.purchaseManagerEmail && (
                                <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerEmail}</p>
                            )}
                               
                               {/* <input type="text"  placeholder='Enter Email' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
                           </div>
                       </div> 
                        
                        <div className='flex justify-center '>
                             <button type="submit" className='bg-[#7d40ff] rounded-full mb-2 w-52 px-4 py-2 text-white mt-5'>Submit</button>
                        </div>  {successMessage && (
                                <p className="text-green-500 text-lg flex justify-center ">{successMessage}</p>
                            )}
                    </div>
                </form>  
            </div>
        </div>
    </div>
    </>
  )
}

export default CustomerInfo;





// import React, { useState, useEffect }  from 'react'
// import Dashboard from './Dashboard'
// import Header from './Header'

// const CustomerInfo = () => {
//      const [customerName, setCustomerName] = useState('');
//      const [contactName, setContactName] = useState('');
//      const [logisticCustomerName, setLogisticCustomerName] = useState('');
//         const [address, setAddress] = useState('');
//         const [email, setEmail] = useState('');
//         const [logisticEmail, setLogisticEmail] = useState('');
//         const [qualityEmail, setQualityEmail] = useState('');
//         const [contact, setContact] = useState('');  // Added contact state
//         const [logisticContact, setLogisticContact] = useState('');  // Added contact state
//         const [msmeNumber, setMsmeNumber] = useState('');
//         const [panNumber, setPanNumber] = useState('');
//         const [tanNumber, setTanNumber] = useState('');
//         const [designation, setDesignation] = useState('');
//         const [logisticDesignation, setlogisticDesignation] = useState('');
//         const [gstinNumber, setGstinNumber] = useState('');
//         const [purchaseManagerDesignation, setPurchaseManagerDesignation] = useState('');
//         const [purchaseManagerContact, setPurchaseManagerContact] = useState('');
//         const [purchaseManagerEmail, setPurchaseManagerEmail] = useState('');
//         const [purchaseManagerCustomerName, setPurchaseManagerCustomerName] = useState('');        
//         const [errors, setErrors] = useState({});
//         const [successMessage, setSuccessMessage] = useState("");


//         // Fetch data from API
//         useEffect(() => {
//         const fetchData = async () => {
//             try {
//               const response = await fetch('https://machanite-be.onrender.com/customer/all');
//               if (!response.ok) {
//                 throw new Error('Failed to fetch data');
//               }
//               const data = await response.json();
      
//               // Populate the state with the fetched data (adjust keys based on API response structure)
//               const customerData = data[0]; // Assuming the first customer is to be displayed
//               setCustomerName(customerData.customer_name || '');
//               setContactName(customerData.contactName || '');
//               setLogisticCustomerName(customerData.logisticCustomerName || '');
//               setAddress(customerData.address || '');
//               setEmail(customerData.email || '');
//               setLogisticEmail(customerData.logisticEmail || '');
//               setQualityEmail(customerData.qualityEmail || '');
//               setContact(customerData.contact || '');
//               setLogisticContact(customerData.logisticContact || '');
//               setMsmeNumber(customerData.msmeNumber || '');
//               setPanNumber(customerData.panNumber || '');
//               setTanNumber(customerData.tanNumber || '');
//               setDesignation(customerData.designation || '');
//               setLogisticDesignation(customerData.logisticDesignation || '');
//               setGstinNumber(customerData.gstinNumber || '');
//               setPurchaseManagerDesignation(customerData.purchaseManagerDesignation || '');
//               setPurchaseManagerContact(customerData.purchaseManagerContact || '');
//               setPurchaseManagerEmail(customerData.purchaseManagerEmail || '');
//               setPurchaseManagerCustomerName(customerData.purchaseManagerCustomerName || '');
//             } catch (error) {
//               console.error('Error fetching data:', error);
//             }
//           };
      
//           fetchData();
//         }, []);
      
    
//         const handleSubmit = (e) => {
//           e.preventDefault(); // Prevents page refresh
//           const newErrors = {}; // Temporary object for error messages
//           let isValid = true;
        
//           // Validate each field individually
//           if (!customerName.trim()) {
//             isValid = false;
//             newErrors.customerName = "Customer Name is required.";
//           } else if (customerName.trim().length < 3) {
//             isValid = false;
//             newErrors.customerName = 'Customer name must be at least 3 characters long.';
//         }
//           if (!contactName.trim()) {
//             isValid = false;
//             newErrors.contactName = "Customer Name is required.";
//           } else if (contactName.trim().length < 3) {
//             isValid = false;
//             newErrors.contactName = 'Customer Name must be at least 3 characters long.';
//         }
//           if (!logisticCustomerName.trim()) {
//             isValid = false;
//             newErrors.logisticCustomerName = "Customer Name is required.";
//           } else if (logisticCustomerName.trim().length < 3) {
//             isValid = false;
//             newErrors.logisticCustomerName = 'Customer name must be at least 3 characters long.';
//         }

//         if (!purchaseManagerCustomerName.trim()) {
//             isValid = false;
//             newErrors.purchaseManagerCustomerName = "Customer Name is required.";
//           } else if (purchaseManagerCustomerName.trim().length < 3) {
//             isValid = false;
//             newErrors.purchaseManagerCustomerName = 'Customer name must be at least 3 characters long.';
//         }
         
//           if (!address.trim().length) {
//             isValid = false;
//             newErrors.address = "Address is required.";
//           } else if (address.trim().length < 10) {
//             isValid = false;
//             newErrors.address = 'Address must be at least 10 characters long.';
//         }
//           if (!email.trim()) {
//             isValid = false;
//             newErrors.email = "Email is required.";
//           }  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
//             isValid = false;
//             newErrors.email = 'Please enter a valid email address.';
//         }

//         if (!purchaseManagerEmail.trim()) {
//             isValid = false;
//             newErrors.purchaseManagerEmail = "Email is required.";
//           }  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(purchaseManagerEmail)) {
//             isValid = false;
//             newErrors.purchaseManagerEmail = 'Please enter a valid email address.';
//         }

//           if (!contact.trim()) {
//             isValid = false;
//             newErrors.contact = "Contact is required.";
//           } else if(!/^[0-9]{10}$/.test(contact)){
//             isValid = false;
//             newErrors.contact = "Please enter a valid number.";
//           } 

//           if (!logisticContact.trim()) {
//             isValid = false;
//             newErrors.logisticContact = "Contact is required.";
//           } else if(!/^[0-9]{10}$/.test(logisticContact)){
//             isValid = false;
//             newErrors.logisticContact = "Please enter a valid number.";
//           } 

//           if (!purchaseManagerContact.trim()) {
//             isValid = false;
//             newErrors.purchaseManagerContact = "Contact is required.";
//           } else if(!/^[0-9]{10}$/.test(purchaseManagerContact)){
//             isValid = false;
//             newErrors.purchaseManagerContact = "Please enter a valid number.";
//           }

//           if (!msmeNumber.trim()) {
//             isValid = false;
//             newErrors.msmeNumber = "MSME Number is required.";
//           } else if(!/^UDYAM-[A-Z]{2}-\d{2}-\d{7}$/.test(msmeNumber)){
//             isValid = false;
//             newErrors.msmeNumber = "Please enter a valid number.";
//           }

//           if (!panNumber.trim()) {
//             isValid = false;
//             newErrors.panNumber = "PAN Number is required.";
//           } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber)){
//             isValid = false;
//             newErrors.panNumber = "Please enter a valid number.";
//           }

//           if (!tanNumber.trim()) {
//             isValid = false;
//             newErrors.tanNumber = "TAN Number is required.";
//           } else if(!/^[A-Z]{4}[0-9]{5}[A-Z]{1}$/.test(tanNumber)){
//             isValid = false;
//             newErrors.tanNumber = "Please enter a valid number.";
//           }

//           if (!designation.trim()) {
//             isValid = false;
//             newErrors.designation = "Designation is required.";
//           } else if (designation.trim().length < 3) {
//             isValid = false;
//             newErrors.designation = "Please enter a valid name.";
//           }

//           if (!purchaseManagerDesignation.trim()) {
//             isValid = false;
//             newErrors.purchaseManagerDesignation = "Designation is required.";
//           } else if (purchaseManagerDesignation.trim().length < 3) {
//             isValid = false;
//             newErrors.purchaseManagerDesignation = "Please enter a valid name.";
//           }

//           if (!logisticDesignation.trim()) {
//             isValid = false;
//             newErrors.logisticDesignation = "Designation is required.";
//            }  else if (logisticDesignation.trim().length < 3) {
//             isValid = false;
//             newErrors.logisticDesignation = "Please enter a valid name.";
//           }

//           if (!logisticEmail.trim()) {
//             isValid = false;
//             newErrors.logisticEmail = "Email is required.";
//           }  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(logisticEmail)) {
//             isValid = false;
//             newErrors.logisticEmail = 'Please enter a valid email address.';
//         }
//           if (!qualityEmail.trim()) {
//             isValid = false;
//             newErrors.qualityEmail = "Email is required.";
//           }  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(qualityEmail)) {
//             isValid = false;
//             newErrors.qualityEmail = 'Please enter a valid email address.';
//         }
//           if (!gstinNumber.trim()) {
//             isValid = false;
//             newErrors.gstinNumber = "GSTIN Number is required.";
//           } else if(!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[A-Z]{1}[0-9]{1}$/.test(gstinNumber)){
//             isValid = false;
//             newErrors.gstinNumber = 'Please enter a valid number.';
//           }
        
//           // Set errors or display success message
//           if (isValid) {
//             setErrors({});
//             setSuccessMessage("Form submitted successfully!");
//           } else {
//             setErrors(newErrors);
//             setSuccessMessage("");
//           }
//         };
        
//   return (
//     <>
//     <div className='flex'>
//           {/* Dashboard  */}
//         <div className=''>
//             <Dashboard/>
//         </div>

//                 {/* Right side  */}
//         <div className='w-full overflow-hidden '>

                
//                 {/* Main component  */}
//             <div className=' pb-10  border-black bg-[#f7f5f5] w-full h-screen overflow-y-auto'>

//             <div className='sticky top-0 '>
//                 <Header/>
//             </div>


//                     {/* Form 1 */}
//                 <form action="" onSubmit={handleSubmit}>

//                         {/* Customer data  */}
//                     <div className=' mt-5  w-[800px] mx-auto pb-8 pt-2 bg-[#ffffffe2] shadow-2xl rounded-2xl'>
                        
//                         <h1 className='flex justify-center text-3xl font-bold pt-8 text-[#7d40ff]'>Customer Data</h1>

//                             {/* First div  */}
//                         <div className=' flex place-content-around mt-8'> 
//                             {/* name   */}
//                             <div className='flex flex-col'>
//                                 <label for="customerName" className='mx-auto text-gray-700 font-semibold'>Customer Name</label>
//                                 <input   type="text"
//                                             id="customerName"
//                                             name="customerName"
//                                             placeholder="Type Customer Name" 
//                                             className='bg-gray-200  px-auto rounded-full mt-1 py-2 px-4 w-72 '
//                                             value={productData.customerName}
//                                             onChange={(e) => setCustomerName(e.target.value)}
                                            
//                                 />     {errors.customerName && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
//                                 )}   
                                                        
//                             </div>
//                              {/* address  */}
//                             <div className='flex flex-col '>
//                                 <label for="address" className='text-gray-700 m-auto font-semibold'>Address</label>
//                                 <input  type="text"
//                                     id="address"
//                                     name="address"
//                                     placeholder="Enter Address"
//                                     className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72'
//                                     value={productData."aaaaaaaaaa"}
//                                     onChange={(e) => setAddress(e.target.value)}
                                    
//                                     />    {errors.address && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.address}</p>
//                                     )}                
//                             </div>
//                         </div> 

//                             {/* Second div  */} 
//                         <div className='flex place-content-around mt-3'>  
//                             {/* email  */}
//                             <div className='flex flex-col'>
//                                 <label for="email" className='mx-auto text-gray-700 font-semibold'>Email</label>
//                                 <input  type="text"
//                                         id="email"
//                                         name="email"
//                                         placeholder="Enter Email"
//                                         className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72'
//                                         value={productData."kamlesh@gmail.com"}
//                                         onChange={(e) => setEmail(e.target.value)}
                                        
//                                 />    {errors.email && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                                 )}                
//                             </div>
//                             {/* msme  */}
//                             <div className='flex flex-col '>
//                                 <label for="msmeNumber" className='text-gray-700 m-auto font-semibold'>MSME Number</label>
//                                 <input  className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' 
//                                          type="text"
//                                          id="msmeNumber"
//                                          name="msmeNumber"
//                                          placeholder="Enter MSME Number"
//                                          value={productData."UDYAM-MH-18-0000005"}
//                                          onChange={(e) => setMsmeNumber(e.target.value)}
                                         
                                        
//                                 />   {errors.msmeNumber && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.msmeNumber}</p>
//                                 )}                
//                             </div>
//                         </div> 

//                             {/* Third div  */}
//                         <div className='flex place-content-around mt-3'>  
//                             {/* gstin Nmber  */}
//                             <div className='flex flex-col'>
//                                 <label for="gstinNmber" className='mx-auto text-gray-700 font-semibold'>GSTIN Number</label>
//                                 <input
//                                     type="text"
//                                     id="gstinNumber"
//                                     name="gstinNumber"
//                                     placeholder="Enter GSTIN Number"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.gstinNumber ? 'border border-red-500' : ''}`}
//                                     value={productData."22AAAAA0000A1Z5"}
//                                     onChange={(e) => setGstinNumber(e.target.value)}
                                    
//                                 />
//                                 {errors.gstinNumber && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.gstinNumber}</p>
//                                 )}
//                             </div>
//                             {/* pan number  */}
//                             <div className='flex flex-col'>
//                                 <label for="panNumber" className='mx-auto text-gray-700 font-semibold'>PAN Number</label>
//                                 <input 
//                                         type="text"
//                                         id="panNumber"
//                                         name="panNumber"
//                                         placeholder="Enter PAN Number"
//                                         className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.panNumber ? 'border border-red-500' : ''}`}
//                                         value={productData."ABCDE1234F"}
//                                         onChange={(e) => setPanNumber(e.target.value)}
                                        
//                                 />   {errors.panNumber && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.panNumber}</p>
//                                 )}              
//                             </div>                           
//                         </div> 

//                             {/* fourth div  */} 
//                         <div className='borde flex place-content-aroun ml-[56px] mt-3 pb-7'>  
//                             <div className='flex flex-col '>
//                                 <label for="tanNumber" className='text-gray-700 m-auto font-semibold'>TAN Number</label>
//                                 <input 
//                                      type="text"
//                                      id="tanNumber"
//                                      name="tanNumber"
//                                      placeholder="Enter TAN Number"
//                                      className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.tanNumber ? 'border border-red-500' : ''}`}
//                                      value={productData."ABCD12345E"}
//                                      onChange={(e) => setTanNumber(e.target.value)}
                                     
//                                 />   {errors.tanNumber && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.tanNumber}</p>
//                                 )}                 
//                             </div>
//                         </div> 

//                             {/* Sceond form  Quality*/}
//                         <h1 className='flex justify-center text-3xl font-bold pt-5 text-[#7d40ff]'>Quality</h1>

//                          {/* First div  */}
//                         <div className='flex place-content-around mt-4'>  
//                             {/* contact person name  */}
//                             <div className='flex flex-col'>
//                                 <label for="contactPersonName" className='mx-auto text-gray-700 font-semibold'>Contact Person Name</label>
//                                 {/* <input type="text" placeholder='Enter Contact Person Name' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72 ' required/>   */}
//                                 <input
//                                     type="text"
//                                     id="contactName"
//                                     name="contactName"
//                                     placeholder="Type Person Name"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.contactName ? 'border border-red-500' : ''}`}
//                                     value={productData."Ram"}
//                                     onChange={(e) => setContactName(e.target.value)}
                                    
//                                 />
//                                 {errors.customerName && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>
//                                 )}                 
//                             </div>
                            
//                                 {/* designation  */}
//                             <div className='flex flex-col '>
//                                 <label for="designation" className='text-gray-700 m-auto font-semibold'>Designation</label>
//                                 {/* <input type="text"  placeholder='Enter Designation' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>     */}
//                                                     <input
//                                         type="text"
//                                         id="designation"
//                                         name="designation"
//                                         placeholder="Enter Designation"
//                                         className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.designation ? 'border border-red-500' : ''}`}
//                                         value={productData."aaaaa"}
//                                         onChange={(e) => setDesignation(e.target.value)}
                                        
//                                     />
//                                     {errors.designation && (
//                                         <p className="text-red-500 text-sm mt-1">{errors.designation}</p>
//                                     )}               
//                             </div>
//                         </div> 

//                         {/* Second div  */}
//                         <div className='borde flex place-content-around mt-3 pb-7'>  
//                                 {/* contact number */}
//                             <div className='flex flex-col'>
//                                 <label for="contactNumber" className='mx-auto text-gray-700 font-semibold'>Contact Number</label>
//                                 {/* <input type="moblie" placeholder='Enter Contact Number' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72' required/>  */}
//                                 <input
//                                     type="text"
//                                     id="contact"
//                                     name="contact"
//                                     placeholder="Enter Contact Number"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.contact ? 'border border-red-500' : ''}`}
//                                     value={productData."8080808080"}
//                                     onChange={(e) => setContact(e.target.value)}
                                    
//                                 />
//                                 {errors.contact && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.contact}</p>
//                                 )}                
//                             </div>
//                              {/* email  */}
//                             <div className='flex flex-col '>
//                                 <label for="email" className='text-gray-700 m-auto font-semibold'>Email</label>
//                                 <input
//                                     type="text"
//                                     id="qualityEmail"
//                                     name="qualityEmail"
//                                     placeholder="Enter Email"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.qualityEmail ? 'border border-red-500' : ''}`}
//                                     value={productData."ram@gmail.com"}
//                                     onChange={(e) => setQualityEmail(e.target.value)}
                                    
//                                 />
//                                 {errors.qualityEmail && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.qualityEmail}</p>
//                                 )}
//                                 {/* <input type="text"  placeholder='Enter Email' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
//                             </div>
//                         </div> 

//                             {/* Third form  Logistic*/}
//                         <h1 className='flex justify-center text-3xl font-bold pt-5 text-[#7d40ff]'>Logistic</h1>
                        
//                          {/* First div  */}
//                          <div className=' flex place-content-around mt-4'> 
//                              {/* logistic contact name   */}
//                             <div className='flex flex-col'>
//                                 <label for="contactPersonName" className='mx-auto text-gray-700 font-semibold'>Contact Person Name</label>
//                                 <input
//                                     type="text"
//                                     id="logisticCustomerName"
//                                     name="logisticCustomerName"
//                                     placeholder="Type Customer Name"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.logisticCustomerName ? 'border border-red-500' : ''}`}
//                                     value={productData."Shyam"}
//                                     onChange={(e) => setLogisticCustomerName(e.target.value)}
                                    
//                                 />
//                                 {errors.logisticCustomerName && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.logisticCustomerName}</p>
//                                 )} 
//                                 {/* <input type="text" placeholder='Enter Contact Person Name' name="username" className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72 ' required/>                    */}
//                             </div>
//                              {/* logistic Designation  */}
//                             <div className='flex flex-col '>
//                                 <label for="designation" className='text-gray-700 m-auto font-semibold'>Designation</label>
//                                 <input
//                                     type="text"
//                                     id="logisticDesignation"
//                                     name="logisticDesignation"
//                                     placeholder="Enter Designation"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.logisticDesignation ? 'border border-red-500' : ''}`}
//                                     value={productData."aaaaa"}
//                                     onChange={(e) => setlogisticDesignation(e.target.value)}
                                    
//                                 />
//                                 {errors.logisticDesignation && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.logisticDesignation}</p>
//                                 )}
//                                 {/* <input type="text"  placeholder='Enter Designation' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
//                             </div>
//                         </div> 

//                         {/* Second div  */}
//                         <div className=' flex place-content-around mt-3 pb-7'>  
//                              {/* logistic contact  */}
//                             <div className='flex flex-col'>
//                                 <label for="contactNumber" className='mx-auto text-gray-700 font-semibold'>Contact Number</label>
//                                 <input
//                                     type="text"
//                                     id="logisticContact"
//                                     name="logisticContact"
//                                     placeholder="Enter Contact Number"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.logisticContact ? 'border border-red-500' : ''}`}
//                                     value={productData."8080808080"}
//                                     onChange={(e) => setLogisticContact(e.target.value)}
                                    
//                                 />
//                                 {errors.logisticContact && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.logisticContact}</p>
//                                 )}
//                                 {/* <input type="mobile" placeholder='Enter Contact Number' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
//                             </div>
//                             {/* logistic email  */}
//                             <div className='flex flex-col '>
//                                 <label for="email" className='text-gray-700 m-auto font-semibold'>Email</label>
//                                 <input
//                                     type="text"
//                                     id="logisticEmail"
//                                     name="logisticEmail"
//                                     placeholder="Enter Email"
//                                     className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 ${errors.logisticEmail ? 'border border-red-500' : ''}`}
//                                     value={productData."shyam@gmail"}
//                                     onChange={(e) => setLogisticEmail(e.target.value)}
                                    
//                                 />
//                                 {errors.logisticEmail && (
//                                     <p className="text-red-500 text-sm mt-1">{errors.logisticEmail}</p>
//                                 )}
//                                 {/* <input type="text"  placeholder='Enter Email' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
//                             </div>
//                         </div> 

                        
//                             {/* Buyers */}
//                             <h1 className='flex justify-center text-3xl font-bold pt-5 text-[#7d40ff]'>Purchase Manager</h1>
                        
                        
//                         {/* First div  */}
//                         <div className=' flex place-content-around mt-4'> 
//                             {/* Buyers contact name   */}
//                            <div className='flex flex-col'>
//                                <label for="purchaseManagerCustomerName" className='mx-auto text-gray-700 font-semibold'>Contact Person Name</label>
//                                <input
//                                    type="text"
//                                    id="purchaseManagerCustomerName"
//                                    name="purchaseManagerCustomerName"
//                                    placeholder="Enter Person Name"
//                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticCustomerName `}
//                                    value={productData."sam"}
//                                    onChange={(e) => setPurchaseManagerCustomerName(e.target.value)}
//                                 //    
//                                />
//                                {errors.purchaseManagerCustomerName && (
//                                    <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerCustomerName}</p>
//                                )} 
//                                {/* <input type="text" placeholder='Enter Contact Person Name' name="username" className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72 ' required/>                    */}
//                            </div>
//                             {/*  Buyers Designation  */}
//                            <div className='flex flex-col '>
//                                <label for="purchaseManagerDesignation" className='text-gray-700 m-auto font-semibold'>Designation</label>
//                                <input
//                                    type="text"
//                                    id="purchaseManagerDesignation"
//                                    name="purchaseManagerDesignation"
//                                    placeholder="Enter Designation"
//                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticDesignation `}
//                                    value={productData."engineer"}
//                                    onChange={(e) => setPurchaseManagerDesignation(e.target.value)}
//                                 //    
//                                />
//                                {errors.purchaseManagerDesignation && (
//                                    <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerDesignation}</p>
//                                )}
//                                {/* <input type="text"  placeholder='Enter Designation' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
//                            </div>
//                        </div> 

//                        {/* Second div  */}
//                        <div className=' flex place-content-around mt-3 pb-7'>  
//                             {/* buyers contact  */}
//                            <div className='flex flex-col'>
//                                <label for="purchaseManagerContact" className='mx-auto text-gray-700 font-semibold'>Contact Number</label>
//                                <input
//                                    type="text"
//                                    id="purchaseManagerContact"
//                                    name="purchaseManagerContact"
//                                    placeholder="Enter Contact Number"
//                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72`}
//                                    value={productData."5555555555"}
//                                    onChange={(e) => setPurchaseManagerContact(e.target.value)}
//                                 //    
//                                />
//                                {errors.purchaseManagerContact && (
//                                    <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerContact}</p>
//                                )}
//                                {/* <input type="mobile" placeholder='Enter Contact Number' className='bg-gray-200 px-auto rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
//                            </div>
//                            {/* buyers email  */}
//                            <div className='flex flex-col '>
//                                <label for="purchaseManageremail" className='text-gray-700 m-auto font-semibold'>Email</label>
//                                <input
//                                    type="text"
//                                    id="purchaseManagerEmail"
//                                    name="purchaseManagerEmail"
//                                    placeholder="Enter Email"
//                                    className={`bg-gray-200 rounded-full mt-1 py-2 px-4 w-72 logisticEmail `}
//                                    value={productData."sam@gmail.com"} 
//                                    onChange={(e) => setPurchaseManagerEmail(e.target.value)}
//                                 //    
//                                />
//                                {errors.purchaseManagerEmail && (
//                                    <p className="text-red-500 text-sm mt-1">{errors.purchaseManagerEmail}</p>
//                                )}
//                                {/* <input type="text"  placeholder='Enter Email' className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72' required/>                    */}
//                            </div>
//                        </div> 
                        
//                         <div className='flex justify-center '>
//                              <button type="submit" className=' bg-[#7d40ff] rounded-full w-52 px-4 py-2 my-auto text-white mb-4 mt-5 '>Submit</button>
//                         </div> {successMessage && (
//                                 <p className="text-green-500 text-lg flex justify-center ">{successMessage}</p>
//                             )}
//                     </div>
//                 </form>  
//             </div>
//         </div>
//     </div>
//     </>
//   )
// }

// export default CustomerInfo;