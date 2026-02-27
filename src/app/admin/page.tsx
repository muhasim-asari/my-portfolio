// app/admin/page.tsx
import SubmitButton from "@/components/SubmitButton";
import { addProject, deleteProject, getProjects, logout } from "../actions";
import InvoiceGenerator from "@/components/InvoiceGenerator";

export default async function AdminPage() {
  // Ambil data project terbaru
  const projects = await getProjects();

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10 font-mono text-sm">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-8 bg-white p-4 border-2 border-black shadow-hard">
        <h1 className="text-xl md:text-3xl font-bold text-black uppercase tracking-tighter">
          Admin<span className="text-[#0066F7]">Panel</span>
        </h1>
        <form action={logout}>
          <button className="bg-red-500 text-white px-4 py-2 font-bold uppercase hover:bg-red-600 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">Logout</button>
        </form>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* === KOLOM KIRI: FORM TAMBAH === */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 border-2 border-black shadow-hard sticky top-6">
            <h2 className="text-xl font-bold mb-6 uppercase border-b-2 border-black pb-2 flex items-center gap-2 text-black">
              <span className="w-3 h-3 bg-[#0066F7] rounded-full animate-pulse"></span>
              Add New
            </h2>

            <form action={addProject} className="flex flex-col gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Judul</label>
                <input name="title" type="text" required className="w-full p-2 border-2 border-gray-300 focus:border-black focus:outline-none bg-gray-50 font-bold text-black" placeholder="Nama Project..." />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Deskripsi</label>
                <textarea name="description" required rows={3} className="w-full p-2 border-2 border-gray-300 focus:border-black focus:outline-none bg-gray-50 text-black" placeholder="Deskripsi singkat..." />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Link</label>
                <input name="link" type="url" className="w-full p-2 border-2 border-gray-300 focus:border-black focus:outline-none bg-gray-50 text-black" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Gambar</label>
                <input name="image" type="file" accept="image/*" className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:border-2 file:border-black file:text-[10px] file:font-bold file:uppercase file:bg-[#0066F7] file:text-white hover:file:bg-[#0066F7] cursor-pointer text-black" />
              </div>

              {/* <div className="flex items-center gap-2 p-2 border-2 border-dashed border-gray-300 bg-gray-50">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <label
                  htmlFor="featured"
                  className="text-xs font-bold uppercase cursor-pointer select-none"
                >
                  Make Featured
                </label>
              </div> */}

              <SubmitButton />
            </form>
          </div>
        </div>

        {/* === KOLOM KANAN: LIST PROJECT === */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 border-2 border-black shadow-hard min-h-[500px]">
            <h2 className="text-xl font-bold mb-6 uppercase border-b-2 border-black pb-2 text-black">All Projects ({projects.length})</h2>

            {projects.length === 0 ? (
              <p className="text-gray-400 text-center py-10 italic">Belum ada data project.</p>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex flex-col md:flex-row gap-4 border-2 border-gray-200 p-4 hover:border-black transition-colors group bg-gray-50 text-black">
                    {/* Thumbnail Image */}
                    <div className="w-full md:w-24 h-24 bg-gray-200 shrink-0 border border-black overflow-hidden relative">
                      {project.imageUrl ? <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" /> : <div className="w-full h-full flex items-center justify-center text-[10px]">No Img</div>}
                      {/* {project.featured && (
                        <div className="absolute top-0 left-0 bg-[#0066F7] text-black text-[8px] font-bold px-1 uppercase border-b border-r border-black">
                          Feat
                        </div>
                      )} */}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="font-bold text-lg uppercase">{project.title}</h3>
                      <p className="text-gray-500 text-xs line-clamp-2 mb-2">{project.description}</p>
                      <a href={project.link || "#"} target="_blank" className="text-[10px] text-blue-600 hover:underline break-all">
                        {project.link}
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:border-l-2 md:border-gray-200 md:pl-4">
                      <form action={deleteProject}>
                        {/* Kirim ID lewat hidden input */}
                        <input type="hidden" name="id" value={project.id} />
                        <button
                          type="submit"
                          className="text-xs bg-white border-2 border-red-500 text-red-500 px-3 py-1 font-bold uppercase hover:bg-red-500 hover:text-white transition-colors"
                          // Tambahkan konfirmasi JS sederhana
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <section id="invoice" className="mt-10">
        <h2 className="text-3xl text-black font-black uppercase mb-6 border-b-4 border-black inline-block">3. Print Nota / Invoice</h2>

        {/* Render Komponen di Sini */}
        <InvoiceGenerator />
      </section>
    </div>
  );
}
