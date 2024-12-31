import GoogleLogin from "@/app/components/Button/GoogleLogin";
import { auth } from "@/auth";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {
    const user = await auth();

    if (user) {
        redirect('/dashboard/employees', RedirectType.push);
    }

    return (
        <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <header className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to NextAuth</h1>
                <p className="text-lg text-gray-600 mb-2">Please login to continue</p>
            </header>

            <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
                <GoogleLogin />
            </main>
        </div>
    );
}
