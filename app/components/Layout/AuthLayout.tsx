'use client';
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../Sidebar";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuthError } from "@/app/types";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { data, status } = useSession({
        required: true,
        onUnauthenticated: () => {
            redirect('/signin');
        }
    });

    if (data?.error === AuthError.AccessTokenExpired) {
        redirect('/signin');
    }

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
            <div className="flex">
                <Sidebar />

                <div className="flex-1 flex flex-col">
                    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-900"></h1>
                            <div className="flex items-center space-x-3">
                                <span className="text-gray-700 font-medium">{data?.user.name}</span>
                                <div className="w-8 h-8 rounded-full overflow-hidden">
                                    <img
                                        src={data?.user.image || '/default-avatar.png'}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            Session expires in {new Date(data?.expiresAt as string).toLocaleString()}
                        </div>
                    </header>
                    {children}
                </div>
            </div>
        </div>
    )
}