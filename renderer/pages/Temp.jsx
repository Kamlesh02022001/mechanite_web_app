import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Header from "./Header";
// import { FaPlus, FaTrash } from "react-icons/fa6";
import { FaPlus, FaTrash } from "react-icons/fa";

const Temp = () => {
  const [purchaseOrder, setPurchaseOrder] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [billing, setBilling] = useState("");
  const [shipping, setShipping] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Products list (each item has productName and quantity)
  const [products, setProducts] = useState([]);

  // Function to add a new product entry
  const addProduct = () => {
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
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    if (!purchaseOrder.trim()) {
      isValid = false;
      newErrors.purchaseOrder = "Purchase Order Number is required.";
    }

    if (!customerName.trim()) {
      isValid = false;
      newErrors.customerName = "Customer Name is required.";
    }

    if (!shipping.trim()) {
      isValid = false;
      newErrors.shipping = "Shipping Address is required.";
    }

    if (!date.trim()) {
      isValid = false;
      newErrors.date = "Date is required.";
    }

    if (!billing.trim()) {
      isValid = false;
      newErrors.billing = "Billing Address is required.";
    }

    products.forEach((product, index) => {
      if (!product.productName.trim()) {
        isValid = false;
        newErrors[`productName_${index}`] = "Product name is required.";
      }
      if (!product.quantity.trim() || product.quantity <= 0) {
        isValid = false;
        newErrors[`quantity_${index}`] = "Quantity is required and must be greater than zero.";
      }
    });

    if (isValid) {
      setErrors({});
      setSuccessMessage("Form submitted successfully!");
    } else {
      setErrors(newErrors);
      setSuccessMessage("");
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
                {/* Purchase Order Number */}
                <div className="flex flex-col">
                  <label htmlFor="purchaseOrder" className="text-gray-800 font-semibold">
                    Enter Purchase Order Number
                  </label>
                  <input
                    type="number"
                    id="purchaseOrder"
                    value={purchaseOrder}
                    onChange={(e) => setPurchaseOrder(e.target.value)}
                    className="bg-gray-200 rounded-full mt-1 py-2 px-4 w-72"
                  />
                  {errors.purchaseOrder && <p className="text-red-500 text-sm mt-1">{errors.purchaseOrder}</p>}
                </div>

                {/* Customer Name */}
                <div className="flex flex-col mt-4">
                  <label htmlFor="customerName" className="text-gray-800 font-semibold">
                    Customer Name
                  </label>
                  <select
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="bg-gray-200 rounded-full mt-1 py-2 px-4 w-72"
                  >
                    <option value="" disabled selected>
                      -- Select customer --
                    </option>
                    <option value="Customer A">Customer A</option>
                    <option value="Customer B">Customer B</option>
                    <option value="Customer C">Customer C</option>
                  </select>
                  {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
                </div>

                {/* Button to add product fields */}
                <div className="flex justify-center items-center mt-4">
                  <button type="button" onClick={addProduct} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                    <FaPlus className="text-xl text-[#7d40ff]" />
                  </button>
                </div>

                {/* Dynamic Product Selection (only appears after clicking +) */}
                {products.length > 0 && products.map((product, index) => (
                  <div key={index} className="flex items-center space-x-4 mt-4">
                    {/* Product Name */}
                    <div className="flex flex-col">
                      <label className="text-gray-800 font-semibold">Product Name</label>
                      <select
                        value={product.productName}
                        onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                        className="bg-gray-200 rounded-full mt-1 py-2 px-4 w-48"
                      >
                        <option value="" disabled selected>
                          -- Select product --
                        </option>
                        <option value="Product A">Product A</option>
                        <option value="Product B">Product B</option>
                        <option value="Product C">Product C</option>
                      </select>
                      {errors[`productName_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`productName_${index}`]}</p>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col">
                      <label className="text-gray-800 font-semibold">Quantity</label>
                      <input
                        type="number"
                        placeholder="Enter quantity"
                        value={product.quantity}
                        onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                        className="bg-gray-200 rounded-full mt-1 py-2 px-4 w-32"
                      />
                      {errors[`quantity_${index}`] && (
                        <p className="text-red-500 text-sm mt-1">{errors[`quantity_${index}`]}</p>
                      )}
                    </div>

                    {/* Remove Button */}
                    {index > 0 && (
                      <button type="button" onClick={() => removeProduct(index)} className="p-2 bg-red-500 rounded-full text-white">
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                  <button type="submit" className="bg-[#7d40ff] rounded-full px-6 py-2 text-white">
                    Create Purchase Order
                  </button>
                </div>
              </form>

              {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Temp;
