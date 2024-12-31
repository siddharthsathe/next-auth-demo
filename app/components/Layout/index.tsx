'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AuthError } from "../../types";

const Layout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    const { data: userSessionData } = useSession();

    useEffect(() => {
        if (userSessionData && userSessionData.error === AuthError.AccessTokenExpired) {
            'use server';
            (async () => {
                await signOut();
            })();
        }
    }, [userSessionData])

    return (
        <main className="flex-1 p-10 bg-gray-100">
            {
                userSessionData?.error ? (
                    <p>Please login again to continue</p>
                ) : null
            }
            {children}
        </main>
    )
}

export default Layout;