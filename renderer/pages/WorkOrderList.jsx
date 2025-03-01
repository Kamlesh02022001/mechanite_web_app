import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Dashboard from "./Dashboard";
import Header from "./Header";
import axios from "axios";

const WorkOrderList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productData, setProductData] = useState([]); // Ensure initial value is an array
    const [token, setToken] = useState("");

    const router = useRouter();

    // Retrieve Token from Session Storage
    useEffect(() => {
        const storedToken = sessionStorage.getItem("authToken");

        if (storedToken) {
            setToken(storedToken);
        } else {
            router.replace("/"); // Redirect to login if no token
        }
    }, []);

    console.log("Token:", token);

    // Fetch Data Function
    const fetchData = async () => {
        if (!token) {
            console.error("Authorization token is missing.");
            setError("Authorization token is required.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get("https://machanite-be.onrender.com/work-order/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("API Response:", response.data); // Debugging output

            // Extract the correct array from the response
            if (Array.isArray(response.data.data)) {
                setProductData(response.data.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setProductData([]); // Fallback to an empty array
            }
        } catch (err) {
            console.error("Error fetching data:", err);

            // Handle authentication errors
            if (err.response?.status === 401) {
                setError("Unauthorized: Please log in again.");
            } else if (err.response?.status === 403) {
                setError("Forbidden: Insufficient privileges.");
            } else {
                setError("Failed to load work orders.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch Data Only When Token is Available
    useEffect(() => {
        if (token) { 
            fetchData();
        }
    }, [token]); // Runs when token is set

    const handleMoreClick = (id) => {
        router.push({
            pathname: "/ViewWorkOrder",
            query: { id },
        });
    };

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <Dashboard />

                {/* Main Content */}
                <div className="w-full h-screen bg-[#f7f5f5] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0">
                        <Header />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex items-center flex-col px-5 pb-10">
                        <h1 className="text-4xl font-bold text-[#7d40ff] mt-5">Work Order List</h1>

                        {/* Loading or Error */}
                        {isLoading ? (
                            <p className="text-center text-xl text-gray-500 mt-10">Loading...</p>
                        ) : error ? (
                            <p className="text-center text-red-500 mt-10">{error}</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-7">
                                {/* Map through customer data */}
                                {Array.isArray(productData) && productData.map((workOrder, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col px-5 pb-8 pt-10 shadow-2xl rounded-2xl bg-[#ffffffe2] w-[400px] h-auto"
                                    >
                                        <div className="flex flex-col gap-3">
                                            <p>
                                                <strong className="text-gray-800 font-bold">Product Name :</strong>{" "}
                                                {workOrder.product?.component_description || "No Description Available"}
                                            </p>
                                            <p>
                                                <strong className="text-gray-800 font-bold">Start Date :</strong>{" "}
                                                {workOrder.createdAt
                                                    ? new Date(workOrder.createdAt).toISOString().split("T")[0]
                                                    : "No Description Available"}
                                            </p>
                                        </div>

                                        <div className="mt-7 flex justify-center">
                                            <button
                                                onClick={() => handleMoreClick(workOrder.id)}
                                                className="font-semibold text-white bg-[#7d40ff] rounded-2xl px-5 py-1"
                                            >
                                                More
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WorkOrderList;
