import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AuthError } from "./app/types";
import type { Provider } from "next-auth/providers"

const providers: Provider[] = [
    // Credentials({
    //     credentials: {
    //         email: { label: "Email", type: "email" },
    //         password: { label: "Password", type: "password" },
    //     },
    //     authorize(credentials) {
    //         // TODO: implement actual authorize logic
    //         // fail validation 
    //         if (credentials.password !== "password") return null
    //         // mock user data
    //         return {
    //             id: "1",
    //             name: "John Doe12",
    //             email: "john.doe1@example.com",
    //             accessToken: "1234567890",
    //             expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString()
    //         }
    //     },
    // }),
    Google
]

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    }).filter((provider) => provider.id !== "credentials")


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                if (account.provider === "google") {
                    token.accessToken = account.access_token;
                    token.expiresAt = account?.expires_at ? account?.expires_at * 1000 : 0;
                    token.scope = account?.scope;
                    token.provider = account?.provider;
                } else if (account.provider === "credentials") {
                    token.id = (user as any)?.id;
                    token.accessToken = (user as any)?.accessToken;
                    token.expiresAt = (user as any)?.expiresAt;
                    token.provider = account?.provider;
                }
            }

            if (token.expiresAt && new Date().getTime() >= Number(token.expiresAt)) {
                token.accessToken = null;
                token.refreshToken = null;
                token.scope = null;
                token.id = null;
                token.error = AuthError.AccessTokenExpired;
            }

            return token;
        },

        async session({ session, token }) {
            const newSession = {
                ...(session ?? {}),
                ...(token ?? {}),
            }
            return newSession;
        },
        signIn: () => {
            return true;
        }
    },
    events: {
        signIn: () => {
            // TODO: save entry in database 
        }
    },
    pages: {
        // custom sign in page 
        signIn: '/signin',
    }
});