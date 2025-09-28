import { auth } from "@/auth";
import { UserRole } from "@/app/types";
import { isAdmin } from "@/app/utils/roles";

export default async function AdminEmployeesPage() {
    const session = await auth();
    const userRole = session?.user?.role || UserRole.USER;
    const isUserAdmin = isAdmin(userRole);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Success Icon */}
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>

                    {/* Main Message */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🎉 Authorization Successful!
                    </h1>

                    <p className="text-lg text-gray-600 mb-6">
                        You have successfully accessed the admin dashboard. This page is protected by role-based authorization.
                    </p>

                    {/* Role Information */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-blue-800">
                            <strong>Your Role:</strong>
                            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                {isUserAdmin ? 'Admin' : 'User'}
                            </span>
                        </p>
                        <p className="text-blue-700 text-sm mt-2">
                            {isUserAdmin
                                ? 'You have full access to all admin features and protected routes.'
                                : 'You have standard user access to the application.'
                            }
                        </p>
                    </div>

                    {/* Technical Details */}
                    <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="text-sm font-semibold text-gray-800 mb-2">How this authorization works:</h3>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Middleware checks your role before page loads</li>
                            <li>• Only users with <code className="bg-gray-200 px-1 rounded">ADMIN</code> role can access this route</li>
                            <li>• Your role was determined by your email: <strong>{session?.user?.email}</strong></li>
                            <li>• Role assignment happens in the JWT callback during authentication</li>
                        </ul>
                    </div>

                    {/* Back to Home */}
                    <a
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}

