// app/login/page.tsx
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
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
