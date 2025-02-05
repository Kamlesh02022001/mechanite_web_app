import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";

const ViewXL = () => {
    const router = useRouter();
    const { fileUrl } = router.query;
    const [excelData, setExcelData] = useState([]);

    useEffect(() => {
        if (!fileUrl) return;

        const fetchExcel = async () => {
            try {
                const response = await fetch(fileUrl);
                const arrayBuffer = await response.arrayBuffer();
                const workbook = XLSX.read(arrayBuffer, { type: "array" });

                // Convert first sheet to JSON
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);

                setExcelData(jsonData);
            } catch (error) {
                console.error("Error fetching Excel file:", error);
            }
        };

        fetchExcel();
    }, [fileUrl]);

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-5 text-center text-[#7d40ff]">Excel Data</h1>
            {excelData.length > 0 ? (
                <table className="border-collapse border border-gray-500 w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            {Object.keys(excelData[0]).map((key) => (
                                <th key={key} className="border border-gray-500 px-4 py-2">
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {excelData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                {Object.values(row).map((cell, idx) => (
                                    <td key={idx} className="border border-gray-500 px-4 py-2">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">Loading Excel Data...</p>
            )}
        </div>
    );
};

export default ViewXL;
