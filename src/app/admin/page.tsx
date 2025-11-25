// app/admin/page.tsx
import { addProject, logout } from "../actions"; // Tambah import logout

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
      <div className="w-full max-w-md flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        
        {/* Tombol Logout */}
        <form action={logout}>
          <button className="text-sm text-red-600 hover:underline font-medium">
            Logout
          </button>
        </form>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Tambah Project Baru</h2>

        {/* Form ini akan memanggil Server Action 'addProject' */}
        <form action={addProject} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Judul Project
            </label>
            <input
              name="title"
              type="text"
              required
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Contoh: E-Commerce App"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deskripsi
            </label>
            <textarea
              name="description"
              required
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Deskripsi singkat..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Link Project
            </label>
            <input
              name="link"
              type="url"
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="https://github.com/..."
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Simpan Project
          </button>
        </form>
      </div>
    </div>
  );
}
