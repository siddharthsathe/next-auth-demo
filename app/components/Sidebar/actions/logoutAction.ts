import { signOut } from "next-auth/react";

export const handleLogoutAction = async () => {
    await signOut();
}