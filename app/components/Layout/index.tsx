import { SessionProvider } from "next-auth/react";
import React from "react";
import { AuthLayout } from "./AuthLayout";

const AuthLayoutProvider = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SessionProvider>
            <AuthLayout>
                {children}
            </AuthLayout>
        </SessionProvider>
    )
}

export default AuthLayoutProvider;