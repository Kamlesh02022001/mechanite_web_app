import React, {useState, useEffect} from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import axios from 'axios';

import {FaPlus, FaTrash} from 'react-icons/fa';

const SalesOrder = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchaseOrder, setPurchaseOrder] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [date, setDate] = useState('');
  const [checkBox, setCheckBox] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [billing, setBilling] = useState('');
  const [shipping, setShipping] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    // Validation checks
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
    if (!purchaseOrder.trim()) {
      isValid = false;
      newErrors.purchaseOrder = 'Purchase Order Number is required.';
    }
    if (!selectedProducts.length) {
      isValid = false;
      newErrors.products = 'At least one product is required.';
    }

    if (!isValid) {
      setErrors(newErrors);
      setSuccessMessage('');
      return;
    }

    setErrors({}); 

    // Ensure correct product format
    const formattedProducts = selectedProducts.map(product => ({
        product_id: product.product_id, // Correcting the key name
        quantity: product.quantity,
      }));
      

    const payload = {
      customer_id: customerId,
      purchase_order_no: purchaseOrder,
      date_of_delivery: date,
      billing_address: billing,
      shipping_address: shipping,
      products: formattedProducts,
    };

    console.log('Payload being sent:', payload);

    try {
      const response = await axios.post(
        'http://localhost:4000/sales-order/create',
        payload,
      );
      console.log('Order created successfully:', response.data);

      setSuccessMessage('Order created successfully!');
      setSelectedProducts([]);
      setCustomerName('');
      setPurchaseOrder('');
      setDate('');
      setBilling('');
      setShipping('');
      setHsnCode('');
    } catch (error) {
      console.error(
        'Error creating order:',
        error.response?.data || error.message,
      );
      alert(JSON.stringify(error.response?.data, null, 2)); 
      setSuccessMessage('Failed to create order. Please try again.');
    }
  };

 
  const handleAddProduct = () => {
    const newErrors = {};

    if (!productId) {
      newErrors.productId = 'Please select a product.';
    }
    if (!quantity || quantity <= 0) {
      newErrors.quantity = 'Please enter a valid quantity.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedProduct = products.find(prod => prod.id == productId); // Ensure correct ID check

    if (selectedProduct) {
      const newProduct = {
        product_id: selectedProduct.id, 
        productName: selectedProduct.component_description,
        quantity,
      };

      setSelectedProducts([...selectedProducts, newProduct]);
      setProductId(''); 
      setQuantity('');
      setErrors({});
    }
  };

  const handleRemoveProduct = index => {
    const updatedProducts = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedProducts);
  };

  const handleCheckboxChange = () => {
    setCheckBox(!checkBox);
    if (!checkBox) {
      setShipping(billing); 
    //   setShipping(''); 
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customerResponse, productResponse] = await Promise.all([
          axios.get('http://localhost:4000/customer/all'), 
          axios.get('http://localhost:4000/api/get-all-products'),
        ]);
        console.log('Customer API Response:', productResponse.data);

        if (Array.isArray(customerResponse.data)) {
          setCustomers(customerResponse.data);
        } else {
          console.error(
            'Invalid customer API response:',
            customerResponse.data,
          );
        }

        if (Array.isArray(productResponse.data)) {
          setProducts(productResponse.data);
        } else {
          console.error(
            'Invalid productName API response:',
            productResponse.data,
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle customer selection
  const handleCustomerChange = e => {
    const selectedCustomer = customers.find(
      c => c.customer_name === e.target.value,
    );
    setCustomerName(selectedCustomer?.customer_name || '');
    setBilling(selectedCustomer?.address || '');
    setCustomerId(selectedCustomer?.id || '');
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
              <h1 className="text-3xl font-bold text-[#7d40ff]">
                Create Sales Order
              </h1>

              <form className="mt-8">
                {/* Customer Name and Required Quantity */}
                <div className="flex place-content-around  ">
                  {/* Customer Name */}
                  <div className="flex flex-col ">
                    <label
                      htmlFor="customerName"
                      className="text-gray-800  ml-1 font-semibold">
                      Customer Name
                    </label>
                    <div className="bg-gray-200 mr-24 rounded-full w-72 pr-2">
                      <select
                        id="customerName"
                        value={customerName}
                        onChange={handleCustomerChange}
                        className="bg-gray-200 rounded-full py-2 pl-2 w-full">
                        <option value="" disabled>
                          -- Select customer --
                        </option>
                        {customers.length > 0 ? (
                          customers.map(customer => (
                            <option
                              key={customer.id}
                              value={customer.customer_name}>
                              {customer.customer_name}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                    </div>
                    {errors.customerName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  {/* Product Name */}
                  <div className="flex flex-col w-">
                    <label
                      htmlFor="productName"
                      className="text-gray-800  ml-1 font-semibold">
                      Product Name
                    </label>
                    <div className="bg-gray-200 rounded-full mt-1 w-72 pr-2">
                      <select
                        id="productName"
                        value={productId}
                        onChange={e => setProductId(e.target.value)}
                        className="bg-gray-200 rounded-full py-2 pl-2 w-full">
                        <option value="" disabled>
                          -- Select productName --
                        </option>
                        {products.length > 0 ? (
                          products.map(prod => (
                            <option key={prod.id} value={prod.id}>
                              {prod.component_description}
                            </option>
                          ))
                        ) : (
                          <option disabled>Loading...</option>
                        )}
                      </select>
                    </div>
                    {errors.productName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.productName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Purchase Order and Required Quantity */}
                <div className="flex mt-5 place-content-around ">
                  {/* Purchase Order Number */}
                  <div className="flex flex-col ">
                    <label
                      htmlFor="purchaseOrder"
                      className="text-gray-800 ml-1 font-semibold">
                      Enter Purchase Order Number
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Purchase Order Number"
                      id="purchaseOrder"
                      name="purchaseOrder"
                      value={purchaseOrder}
                      onChange={e => setPurchaseOrder(e.target.value)}
                      className="bg-gray-200 rounded-full mr-24 mt-1 py-2 px-4 w-72"
                    />
                    {errors.purchaseOrder && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.purchaseOrder}
                      </p>
                    )}
                  </div>

                  {/* Required Quantity */}
                  <div className="flex flex-col ">
                    <label
                      htmlFor="quantity"
                      className="text-gray-800  ml-1 font-semibold">
                      Required Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
                      className="bg-gray-200  rounded-full mt-1 py-2 px-4 w-72"
                    />
                    {errors.quantity && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex">
                  {/* Left side */}
                  <div className="w-80   ">
                    {/* Billing Address */}
                    <div className="flex flex-col mt-5 ">
                      <label
                        htmlFor="billing"
                        className="text-gray-800  ml-1 font-semibold">
                        Billing Address
                      </label>
                      
                      <input
                        type="text"
                        id="billing"
                        value={billing}
                        readOnly
                        className=" cursor-not-allowe bg-gray-200 rounded-full mr-24 mt-1 py-2 px-4 w-72"
                      />
                      {errors.billing && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.billing}
                        </p>
                      )}
                    </div>

                    {/* check box */}
                    <div className="flex  mt-5 ">
                      <input
                        type="checkbox"
                        id="checkBox"
                        checked={checkBox}
                        onChange={handleCheckboxChange}
                        className="mr-2 cursor-pointer"
                      />
                      <label
                        htmlFor="checkBox"
                        className="text-gray-800   font-semibold">
                        Same as Billing Address
                      </label>
                    </div>

                    {/* Shipping Address */}
                    <div className="flex  flex-col mt-4">
                      <label
                        htmlFor="shipping"
                        className="text-gray-800  ml-1 font-semibold">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Shipping Address"
                        id="shipping"
                        name="shipping"
                        value={shipping}
                        onChange={e => setShipping(e.target.value)}
                        disabled={checkBox} // Disable manual input when checkbox is checked
                        className={`bg-gray-200 rounded-full mr-24 mt-1 py-2 px-4 w-72${
                          checkBox
                            ? 'cursor-not-allowed bg-gray-200 rounded-full mr-24 mt-1 py-2 px-4 w-72'
                            : ''
                        }`}
                      />
                      {errors.shipping && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.shipping}
                        </p>
                      )}
                    </div>

                    {/* Date of Delivery */}
                    <div className="flex flex-col mt-5  ">
                      <label
                        htmlFor="date"
                        className="text-gray-800  ml-1 font-semibold">
                        Date of Delivery
                      </label>
                      <input
                        type="date"
                        placeholder="Select date"
                        id="date"
                        value={date}
                        name="date"
                        onChange={e => setDate(e.target.value)}
                        className="bg-gray-200 rounded-full mr-24 mt-1 py-2 px-4 w-72"
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Side */}

                  <div className="w-full ">
                    {/* Add Button */}
                    <div className="flex justify-center mt-5 ml-[65px]">
                      <b
                        onClick={handleAddProduct}
                        className="bg-[#7d40ff]  rounded-full px-4 py-2 text-white flex items-center">
                        <FaPlus className="mr-2" /> Add Product
                      </b>
                    </div>
                    <div className="border border-black mt-5 w-72 px-3 py-1 h-60 overflow-y-auto bg-white rounded-lg ml-16">
                      <h2 className="text-lg font-semibold mb-1 flex items-center justify-center">
                        Selected Products
                      </h2>
                      {selectedProducts.length > 0 ? (
                        <>
                          {/* Table Headers */}
                          <div className="flex justify-between font-semibold border-b pb-1 mb-2">
                            <span className="w-[110px] order border-black">
                              Product Name
                            </span>
                            <span className="mr-12">Quantity</span>
                            {/* <span>Action</span> */}
                          </div>

                          {/* Product List */}
                          {selectedProducts.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2">
                              <p className="w-[110px] order border-black">
                                {item.productName}
                              </p>
                              <p>{item.quantity}</p>
                              <FaTrash
                                className="text-red-500 text-xs cursor-pointer"
                                onClick={() => handleRemoveProduct(index)}
                              />
                            </div>
                          ))}
                        </>
                      ) : (
                        <p className="text-gray-500">No products added.</p>
                      )}
                    </div>
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex flex-col justify-center items-center mt-8">
                  <button
                    onClick={handleSubmit}
                    // type="submit"
                    className="bg-[#7d40ff] rounded-full w-52 px-4 py-2.5 text-white">
                    Create Sales Order
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

export default SalesOrder;