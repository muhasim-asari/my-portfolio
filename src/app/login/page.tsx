// app/login/page.tsx
import LoginButton from "@/components/LoginButton";
import { login } from "../actions";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Admin Login
        </h1>

        <form action={login} className="flex flex-col gap-4">
          <input
            type="password"
            name="password"
            placeholder="Masukkan Password"
            required
            className="p-2 border rounded text-black"
          />
          <LoginButton />
          <div className="mt-8 text-center">
            <a href="/" className="text-[10px] text-gray-400 hover:text-black underline uppercase cursor-pointer">
                ← Back to Portfolio
            </a>
        </div>
        </form>
      </div>
    </div>
  );
}
