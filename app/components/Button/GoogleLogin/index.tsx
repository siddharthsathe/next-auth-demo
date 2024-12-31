import { signIn } from "@/auth";

export default function GoogleSignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google");
            }}
        >
            <button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >

                <div className="w-8 h-8 bg-white flex items-center justify-center rounded-full border border-gray-300">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                        alt="Google Logo"
                        className="w-6 h-6"
                    />
                </div>
                <span className="ml-3">Sign In with Google</span>
            </button>
        </form>
    );
}
