import Table from "@/app/components/Table";

export default function () {
    const data = [
        { id: 1, name: 'John Doe', age: 28, city: 'New York' },
        { id: 2, name: 'Jane Smith', age: 34, city: 'London' },
        { id: 3, name: 'Michael Brown', age: 22, city: 'Sydney' },
        { id: 4, name: 'Emily Davis', age: 45, city: 'Tokyo' },
    ];

    return <Table data={data} />
}

