import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { AuthError } from "./app/types";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.expiresAt = account?.expires_at ? account?.expires_at * 1000 : 0;
            }

            const newToken: any = token;
            // check if access token has expired
            if (token?.accessToken && token?.expiresAt) {
                if (new Date().getTime() >= Number(token.expiresAt)) {
                    if (token?.refreshToken) {
                        // TODO: implement refresh token logic 
                    }

                    return {
                        error: AuthError.AccessTokenExpired
                    }
                }
            }

            // accessToken is still valid hence return it
            return token;

        },
        async session({ session, token }) {
            const newSession = {
                ...session,
                ...token
            }
            return newSession;
        }
    },
    events: {
        signIn: () => {
            // TODO: save entry in database 
        }
    }
});