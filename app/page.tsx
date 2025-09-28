import Link from "next/link";
import { auth } from "@/auth";
import { UserRole } from "./types";
import { isAdmin } from "./utils/roles";
import SignOutButton from "./components/SignOutButton";

export default async function HomePage() {
    const session = await auth();
    const userRole = session?.user?.role || UserRole.USER;
    const isUserAdmin = isAdmin(userRole);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center">
                {/* Main Heading */}
                <h1 className="text-6xl font-bold text-gray-900 mb-6">
                    NextAuth.js
                </h1>

                {/* Subtitle */}
                <h2 className="text-2xl text-gray-700 mb-8">
                    Authentication & Authorization Demo using NextAuth.js
                </h2>

                {/* Description */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        This application demonstrates the power of NextAuth.js v5 with Google OAuth
                        and role-based authorization. Experience seamless authentication and
                        secure route protection in action.
                    </p>

                    {/* Features List */}
                    <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Authentication</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Google OAuth Integration
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    JWT-based Sessions
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Automatic Token Refresh
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Authorization</h3>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Role-based Access Control
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Server-side Route Protection
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Real-time Token Expiration
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Current User Status */}
                    {session ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <p className="text-green-800 font-medium">
                                Welcome, {session.user?.name}!
                                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                    {isUserAdmin ? 'Admin' : 'User'}
                                </span>
                            </p>
                        </div>
                    ) : (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-blue-800 font-medium">
                                Not signed in. Click below to experience the authentication flow.
                            </p>
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Click to see in action
                    </h3>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {session ? (
                            <>
                                <Link
                                    href="/admin/employees"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {isUserAdmin ? 'Access Admin Dashboard' : 'Try Admin Access (Will be blocked)'}
                                </Link>
                                <SignOutButton />
                            </>
                        ) : (
                            <Link
                                href="/signin"
                                className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                Sign In to Demo
                            </Link>
                        )}
                    </div>
                </div>

                {/* Role Information */}
                <div className="mt-8 text-base text-gray-500">
                    <p>
                        <strong>Test with: admin@nextauth.com / password@365 to access admin dashboard or any other email and password to test as a user.</strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
