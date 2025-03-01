import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Header from './Header';
import { useRouter } from 'next/router';
import Papa from 'papaparse';


const ViewSalesOrder = () => {
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

    const router = useRouter();
    const { id } = router.query;
    console.log('Received ID: Effect', id);
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
        
   
    // Fetch data from API using Axios
    useEffect(() => {
        if (!token) return; 
        const fetchData = async () => {
            try {

                const response = await axios.get(`https://machanite-be.onrender.com/sales-order/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }, // ✅ Include token in headers
                });
                setProductData(response.data);
                
                
                const data = response.data;
                console.log('API response:',data);        

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
    }, [token]);


  
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
                    
                        <h1 className="flex justify-center text-3xl font-bold  text-[#7d40ff]">Sales Order</h1>
                        <div className='border border-[#7d40ff] w-full mt-4'></div> 

                           

                         {/* Component Description and Status */}
                        <div className='flex  mt-10  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Customer Name :</strong> {productData.customer?.customer_name || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Purchase Order No :</strong> {productData.purchase_order_no || 'N/A'}</p>
                        </div>  

                        <div className='flex  mt-10  '>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Billing Address :</strong> {productData.billing_address || 'N/A'}</p>
                            <p className='w-80 mr-10 ml-10 '><strong className='text-gray-800 font-bold'>Shipping Address :</strong> {productData.shipping_address || 'N/A'}</p>
                        </div> 

                        <div className='flex  mt-10  '>
                            <p className='w-80  ml-10 '><strong className='text-gray-800 font-bold mr-1'>Date of Delivery :</strong>
                            {productData.date_of_delivery? new Date(productData.date_of_delivery).toLocaleDateString('en-US') 
    : 'N/A'}</p>
                             </div>
                        <div className="mt-10 ml-10  w-full">
    <h2 className="text-gray-800 mb-2 font-bold">Product Details :</h2>
    <div className="mb-2">
        <table className="w-[650px]   rounded-xl shadow-lg border border-gray-300 overflow-hidden">
            <thead>
                <tr className="bg-gray-200 border  border-gray-300 rounded-t-3xl">
                    <th className="text-gray-800 py-1.5 font-bold">Product Name</th>
                    <th className="text-gray-800 py-1.5 font-bold">Quantity</th>
                </tr>
            </thead>
            <tbody>                {productData.products && productData.products.length > 0 ? (
                    productData.products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-1">{product.component_description}</td>
                            <td className="border border-gray-300 px-4 py-2">{product.sales_order_products?.quantity || 0}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="2" className="text-center text-gray-500 px-4 py-2">
                            No products available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
</div>


                    </div>
                </div>
            </div>
        </div>  
    );

};

export default ViewSalesOrder;
