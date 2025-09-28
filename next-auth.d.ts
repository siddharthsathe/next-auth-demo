// src/types/next-auth.d.ts or types/next-auth.d.ts
import NextAuth from "next-auth";
import { UserRole } from "./app/types";

// Extending the JWT type to include custom attributes
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
            image?: string;
            role: UserRole;
            // Add other custom attributes here
        };
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: string;
        error?: AuthError; // If any error occurs during authentication
    }

    interface JWT {
        access_token?: string;
        refresh_token?: string;
        expires_at?: number; // Timestamp when the access token expires
        expiresAt: string;
        error?: string; // For error handling in token lifecycle
        role?: UserRole;
        user?: {
            id: string;
            name: string;
            email: string;
            image?: string;
            role: UserRole;
            // Add other custom user attributes here
        };
    }
}
