import React from 'react';

// Define the type for a single row of data
interface RowData {
    id: number;
    name: string;
    age: number;
    city: string;
}

interface TableProps {
    data: RowData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full table-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Age</th>
                        <th className="px-4 py-2 text-left">City</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id} className="border-t hover:bg-gray-100">
                            <td className="px-4 py-2">{row.id}</td>
                            <td className="px-4 py-2">{row.name}</td>
                            <td className="px-4 py-2">{row.age}</td>
                            <td className="px-4 py-2">{row.city}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
