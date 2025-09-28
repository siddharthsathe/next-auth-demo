'use client';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
    const handleSignOut = () => {
        if (confirm('Are you sure you want to sign out?')) {
            signOut({ callbackUrl: '/' });
        }
    };

    return (
        <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center px-8 py-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
            Sign Out
        </button>
    );
}
