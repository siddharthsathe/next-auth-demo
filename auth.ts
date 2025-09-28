import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AuthError, UserRole } from "./app/types";
import type { Provider } from "next-auth/providers"
import Credentials from "next-auth/providers/credentials";

const providers: Provider[] = [
    Credentials({
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        authorize(credentials) {
            // TODO: validate credentials from db
            // fail validation for admin user
            if (credentials.email === "admin@nextauth.com" && credentials.password !== "password@365") return null;
            // mock user data
            return {
                id: "1",
                name: "John Doe12",
                email: String(credentials.email).toLowerCase(),
                accessToken: "1234567890",
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString()
            }
        },
    }),
    Google
]

// Role assignment function
function getUserRole(email: string): UserRole {
    return email === 'admin@nextauth.com' ? UserRole.ADMIN : UserRole.USER;
}

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
            console.log('jwt', token, account, user);
            if (account) {
                if (account.provider === "google") {
                    token.accessToken = account.access_token;
                    token.expiresAt = account?.expires_at ? account?.expires_at * 1000 : 0;
                    token.scope = account?.scope;
                    token.provider = account?.provider;
                    token.role = getUserRole(user?.email || '');
                } else if (account.provider === "credentials") {
                    token.id = (user as any)?.id;
                    token.accessToken = (user as any)?.accessToken;
                    token.expiresAt = (user as any)?.expiresAt;
                    token.provider = account?.provider;
                    token.role = getUserRole((user as any)?.email || '');
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
                user: {
                    ...(session?.user ?? {}),
                    role: token.role || UserRole.USER,
                }
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