import Link from 'next/link';
import { handleLogoutAction } from './actions/logoutAction';

const Sidebar = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-800 text-white w-64 p-5">
            <div className="mb-10">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>

            <nav className="flex-grow">
                <ul>
                    <li className="mb-4">
                        <Link
                            href="/dashboard/employees"
                            className="flex items-center px-4 py-2 hover:bg-gray-700 rounded-lg transition duration-200 ease-in-out"
                        >
                            <span className="mr-3 text-lg">🏠</span>
                            Employee Directory
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="mt-auto">
                <button
                    onClick={handleLogoutAction}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200 ease-in-out"
                >
                    🚪 Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
