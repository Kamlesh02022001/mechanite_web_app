import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
// import { FaPlus } from "react-icons/fa6";
import { FaPlus, FaTrash } from "react-icons/fa";


const PurchaseOrder = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [purchaseOrder, setPurchaseOrder] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [date, setDate] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [billing, setBilling] = useState('');
    const [shipping, setShipping] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    // Products list (each item has productName and quantity)
      const [products, setProducts] = useState([]);
    
      const addProduct = () => {
        if (products.length === 0) {
          // If no products exist, allow adding the first one
          setProducts([{ productName: "", quantity: "" }]);
          return;
        }
      
        const lastProduct = products[products.length - 1];
      
        if (!lastProduct.productName?.trim() || String(lastProduct.quantity).trim() === "") {
          alert("Please fill the last product before adding a new one.");
          return;
        }
      
        if (products.length >= 10) {
          alert("You can add up to 10 products only.");
          return;
        }
      
        setProducts([...products, { productName: "", quantity: "" }]);
      };
      
    
    
    
      // Function to remove a product entry
      const removeProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
      };
    
      // Function to handle input changes for product fields
      const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = field === "quantity" ? Math.max(1, Number(value) || "") : value.trim();
        setProducts(updatedProducts);
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        let isValid = true;

        if (!productName.trim()) {
            isValid = false;
            newErrors.productName = 'Product name is required.';
        }

        if (!quantity.trim()) {
            isValid = false;
            newErrors.quantity = 'Quantity is required.';
        }

        if (!customerName.trim()) {
            isValid = false;
            newErrors.customerName = 'Customer Name is required.';
        }

        if (!shipping.trim()) {
            isValid = false;
            newErrors.shipping = 'Shipping Address is required.';
        }
        if (!date.trim()) {
            isValid = false;
            newErrors.date = 'Date is required.';
        }
        if (!billing.trim()) {
            isValid = false;
            newErrors.billing = 'Billing Address is required.';
        }
        if (!hsnCode.trim()) {
            isValid = false;
            newErrors.hsnCode = 'HSN Code is required.';
        }
        if (!purchaseOrder.trim()) {
            isValid = false;
            newErrors.purchaseOrder = 'Purchase Order Number is required.';
        }
        if (!itemCode.trim()) {
            isValid = false;
            newErrors.itemCode = 'Item Code is required.';
        }

        if (isValid) {
            setErrors({});
            setSuccessMessage('Form submitted successfully!');
        } else {
            setErrors(newErrors);
            setSuccessMessage('');
        }
    };

    return (
        <>
            <div className="flex">
                <Dashboard />

                {/* Right side */}
                <div className="w-full h-screen bg-[#f7f5f5] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0">
                        <Header />
                    </div>

                    
                    <div className="flex items-center flex-col justify-center pb-5 border-black mt-2">
                        
                        {/* Main Content */}
                        <div className="flex flex-col justify-center items-center shadow-2xl bg-[#ffffffe2] py-10 rounded-xl w-[800px]">
                            {/* Heading */}
                            <h1 className="text-3xl font-bold text-[#7d40ff]">Create Purchase Order</h1>

                            <form className="mt-8" onSubmit={handleSubmit}>
                                
                                {/* Customer Name and Required Quantity */}
                                <div className="flex place-content-around  ">
                                    {/* Customer Name */}
                                    <div className="flex flex-col ">
                                        <label
                                            htmlFor="customerName"
                                            className="text-gray-800  ml-1 font-semibold"
                                        >
                                            Customer Name
                                        </label>
                                        <div className="bg-gray-200 mr-24 rounded-full w-72 pr-2">
                                            <select
                                                id="customerName"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                className="bg-gray-200  rounded-full py-2 pl-2 w-full"
                                            >
                                                <option value="" disabled>
                                                    -- Select customer --
                                                </option>
                                                <option value="Customer A">Customer A</option>
                                                <option value="Customer B">Customer B</option>
                                                <option value="Customer C">Customer C</option>
                                            </select>
                                        </div>
                                        {errors.customerName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                                        )}
                                    </div>
                                   
                                    {/* Product Name */}
                                    <div className="flex flex-col w-">
                                        <label
                                            htmlFor="productName"
                                            className="text-gray-800  ml-1 font-semibold"
                                        >
                                            Product Name
                                        </label>
                                        <div className="bg-gray-200 rounded-full mt-1 w-72 pr-2">
                                            <select
                                                id="productName"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                className="bg-gray-200 rounded-full w-full py-2 pl-2"
                                            >
                                                <option value="" disabled>
                                                    -- Select product --
                                                </option>
                                                <option value="Product A">Product A</option>
                                                <option value="Product B">Product B</option>
                                                <option value="Product C">Product C</option>
                                            </select>
                                        </div>
                                        {errors.productName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.productName}</p>
                                        )}
                                    </div>                                    
                                </div>

                                {/* Purchase Order and Required Quantity */}
                                <div className="flex mt-5 place-content-around ">                                    
                                     {/* Purchase Order Number */}
                                     <div className="flex flex-col ">
                                        <label
                                            htmlFor="purchaseOrder"
                                            className="text-gray-800 ml-1 font-semibold"
                                        >
                                            Enter Purchase Order Number
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter Purchase Order Number"
                                            id="purchaseOrder"
                                            name="purchaseOrder"
                                            value={purchaseOrder}
                                            onChange={(e) => setPurchaseOrder(e.target.value)}
                                            className="bg-gray-200 rounded-full mr-24 mt-1 py-2 px-4 w-72"
                                        />
                                        {errors.purchaseOrder && (
                                            <p className="text-red-500 text-sm mt-1">{errors.purchaseOrder}</p>
                                        )}
                                    </div>
                                    
                                    
                                     {/* Required Quantity */}
                                     <div className="flex flex-col ">
                                        <label
                                            htmlFor="quantity"
                                            className="text-gray-800  ml-1 font-semibold"
                                        >
                                            Required Quantity
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="Enter quantity"
                                            id="quantity"
                                            name="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(e.target.value)}
                                            className="bg-gray-200  rounded-full mt-1 py-2 px-4 w-72"
                                        />
                                        {errors.quantity && (
                                            <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                                        )}
                                    </div>
                                   
                                </div>
                                               
                                <div className='flex'>
                                        {/* Left side */}
                                    <div className='w-80   '>
                                        {/* Item Code */}
                                    <div className="flex flex-col mt-5 ">
                                            <label
                                                htmlFor="itemCode"
                                                className="text-gray-800  ml-1 font-semibold"
                                            >
                                                Item Code
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Auto-Generated"
                                                id="itemCode"
                                                name="itemCode"
                                                value={itemCode}
                                                onChange={(e) => setItemCode(e.target.value)}
                                                className="bg-gray-200 mr-24 rounded-full mt-1 py-2 px-4 w-72"
                                            />
                                            {errors.itemCode && (
                                                <p className="text-red-500 text-sm mt-1">{errors.itemCode}</p>
                                            )}
                                    </div>

                                    {/* Billing Address */}
                                    <div className="flex flex-col mt-5 ">
                                            <label
                                                htmlFor="billing"
                                                className="text-gray-800  ml-1 font-semibold"
                                            >
                                                Billing Address
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Billing Address"
                                                id="billing"
                                                name="billing"
                                                value={billing}
                                                onChange={(e) => setBilling(e.target.value)}
                                                className="bg-gray-200 mr-24 rounded-full mt-1 py-2 px-4 w-72"
                                            />
                                            {errors.billing && (
                                                <p className="text-red-500 text-sm mt-1">{errors.billing}</p>
                                            )}
                                        </div>
                                    
                                        {/* Shipping Address */}
                                        <div className="flex  flex-col mt-5 ">
                                            <label
                                                htmlFor="shipping"
                                                className="text-gray-800  ml-1 font-semibold"
                                            >
                                                Shipping Address
                                            </label>
                                            <input
                                                type="number"
                                                placeholder="Enter Shipping Address"
                                                id="shipping"
                                                name="shipping"
                                                value={shipping}
                                                onChange={(e) => setShipping(e.target.value)}
                                                className="bg-gray-200 mr-24 rounded-full mt-1 py-2 px-4 w-72"
                                            />
                                            {errors.shipping && (
                                                <p className="text-red-500 text-sm mt-1">{errors.shipping}</p>
                                            )}
                                        </div>

                                        {/* Date of Delivery */}
                                        <div className="flex flex-col mt-5  ">
                                            <label
                                                htmlFor="date"
                                                className="text-gray-800  ml-1 font-semibold"
                                            >
                                                Date of Delivery
                                            </label>
                                            <input
                                                type="date"
                                                placeholder="Select date"
                                                id="date"
                                                value={date}
                                                name="date"
                                                onChange={(e) => setDate(e.target.value)}
                                                className="bg-gray-200 rounded-full mt-1 py-2 px-4 w-72"
                                            />
                                            {errors.date && (
                                                <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                                            )}
                                        </div>

                                    </div>            

                                        {/* Right Side */}

                                    <div  className='w-80   '>
                                            
                                           {/* Add Product Button */}
                                        <div className="flex justify-center mt-12 ml-[60px]  w-72 items-center ">
                                            <button type="button" onClick={addProduct} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                                                <FaPlus className="text-xl text-[#7d40ff]" />
                                            </button>
                                        </div>   
                                            
                                            {/* Product Name and Required Quantity */}
                                        <div className="flex flex-col mt-3 ml-[60px]">
                                            {/* Product Name */}
                                            {products.map((product, index) => (
                                                <div key={index} className="">
                                                    {/* Product Name */}
                                                    <div className="flex mt-5 flex-col">
                                                        <label className="text-gray-800 font-semibold">Product Name</label>
                                                        <select
                                                            value={product.productName}
                                                            onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                                                            className="bg-gray-200 rounded-full mt-1 py-2 px-4 w-72"
                                                        >
                                                            <option value="">-- Select product --</option>
                                                            <option value="Product A">Product A</option>
                                                            <option value="Product B">Product B</option>
                                                            <option value="Product C">Product C</option>
                                                        </select>
                                                    </div>

                                                    {/* Quantity */}
                                            <div className="flex mt-5 flex-col">
                                                <label className="text-gray-800 font-semibold">Quantity</label>
                                                <input
                                                    type="number"
                                                    
                                                    placeholder="Enter quantity"
                                                    value={product.quantity}
                                                    onChange={(e) => handleProductChange(index, "quantity", Math.max(1, Number(e.target.value) || ""))}
                                                    className="bg-gray-200 rounded-full mt-1 py-2 px-4 w-72"
                                                />
                                            </div>

                                                
                                                    {/* Remove Button */}
                                                    {/* <button type="button" onClick={() => removeProduct(index)} className="p-2 bg-red-500 rounded-full text-white">
                                                        <FaTrash />
                                                    </button> */}
                                                </div>
                                            ))}
                                        </div>

                                     
                                    </div> 
                                </div>
                                {/* Buttons */}
                                <div className="flex flex-col justify-center items-center mt-8">
                                    <button
                                        type="submit"
                                        className="bg-[#7d40ff] rounded-full w-52 px-4 py-2.5 text-white"
                                    >
                                        Create Purchase Order
                                    </button>
                                    <button
                                        className="bg-[#7d40ff] rounded-full w-52 px-4 py-2.5 text-white mt-2"
                                    >
                                        View Purchase Order
                                    </button>
                                </div>
                              


                         </form>

                            {/* Success Message */}
                            {successMessage && (
                                <p className="text-green-500  mt-4">{successMessage}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>                      
        </>
    );
};

export default PurchaseOrder;
