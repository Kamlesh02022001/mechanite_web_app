import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from './Dashboard';
import Header from './Header';
import axios from 'axios';

const RawMaterialList = () => {
    const [rawMaterials, setRawMaterials] = useState({
        colour: [],
        insert: [],
        material: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState('');

    const router = useRouter();

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        } else {
            router.replace('/'); // Redirect to login if no token
        }
    }, []);

    useEffect(() => {
        if (!token) return;

        const fetchData = async () => {
            try {
                const response = await axios.get('https://machanite-be.onrender.com/raw-material/all', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRawMaterials({
                    colour: response.data.colour || [],
                    insert: response.data.insert || [],
                    material: response.data.material || [],
                });
                console.log(response.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to load raw material data. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return (
        <div className="flex">
            {/* Sidebar */}
            <Dashboard />

            {/* Main Content */}
            <div className="w-full h-screen bg-[#f7f5f5] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10">
                    <Header />
                </div>

                {/* Main Content Area */}
                <div className="flex flex-col items-center px-5 pb-10">
                    <h1 className="text-4xl font-bold text-[#7d40ff] mt-5">Raw Material List</h1>

                    {/* Loading or Error Handling */}
                    {isLoading ? (
                        <p className="text-center text-xl text-gray-500 mt-10">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 mt-10">{error}</p>
                    ) : (
                        <div className="w-full max-w-6xl mt-10 space-y-10">
                            {/* Boxed Sections for Each Category */}
                            {Object.entries(rawMaterials).map(([key, items]) => (
                                <div key={key} className="bg-white shadow-lg rounded-xl p-6">
                                    {/* Section Header */}
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 capitalize">
                                        {key}
                                    </h2>

                                    {/* Grid Layout for Items */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {items.length > 0 ? (
                                            items.map((item) => (
                                                <div 
                                                    key={item.id} 
                                                    className="flex flex-col items-center p-5 bg-[#f3f2ff] shadow-md rounded-lg transition-transform transform hover:scale-105"
                                                >
                                                    <h3 className="text-lg font-bold text-gray-900">
                                                        {item.material_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Type: {item.material_type}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600 text-lg col-span-full text-center">
                                                No {key} available.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RawMaterialList;
