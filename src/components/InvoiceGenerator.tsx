// components/InvoiceGenerator.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

type InvoiceItem = {
  id: string;
  name: string;
  qty: string;
  price: number;
};

export default function InvoiceGenerator() {
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Auto-generate Nomor Nota berdasarkan tanggal hari ini (DDMMYY + urutan)
  const generateInvoiceNumber = () => {
    const d = new Date();
    const dateStr = `${String(d.getDate()).padStart(2, "0")}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getFullYear()).slice(-2)}`;
    const randomCounter = Math.floor(Math.random() * 99)
      .toString()
      .padStart(2, "0");
    return `${dateStr}${randomCounter}`;
  };

  // Format tanggal hari ini (13 Feb 2026)
  const formatDate = () => {
    const d = new Date();
    return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
  };

  // State Form
  const [invoiceNo, setInvoiceNo] = useState(generateInvoiceNumber());
  const [date, setDate] = useState(formatDate());
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", name: "Cetak MMT 4x2,5m", qty: "1", price: 220000 },
    { id: "2", name: "Desain MMT", qty: "-", price: 20000 },
  ]);

  // Logic Harga
  const totalAmount = items.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

  // Tambah & Hapus Item
  const addItem = () => setItems([...items, { id: Date.now().toString(), name: "", qty: "1", price: 0 }]);
  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));
  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  // Logic Generate PDF
  const downloadPDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    // Ambil screenshot dari div preview
    const canvas = await html2canvas(element, {
      scale: 2, // Kualitas tinggi
      useCORS: true,
      backgroundColor: "#f3f4f6", // Background luar
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4"); // Portrait, milimeter, A4

    // Ukuran A4: 210 x 297 mm
    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${invoiceNo}_${customer.split("\n")[0]}.pdf`);
  };

  // Format Uang pakai koma (seperti di desain)
  const formatIDR = (num: number) => `IDR ${num.toLocaleString("en-US")}`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      {/* KIRI: FORM KENDALI */}
      <div className="xl:col-span-4 bg-white p-6 border-2 border-black shadow-hard text-black">
        <h2 className="font-bold text-xl uppercase mb-6 flex justify-between items-center">
          <span>Invoice Maker</span>
          <button onClick={() => setInvoiceNo(generateInvoiceNumber())} className="text-[10px] bg-black text-white px-2 py-1">
            GENERATE NO
          </button>
        </h2>

        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="font-bold uppercase">Nomor Nota</label>
            <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="w-full p-2 border-2 border-black mt-1" />
          </div>
          <div>
            <label className="font-bold uppercase">Tanggal</label>
            <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border-2 border-black mt-1" />
          </div>
          <div>
            <label className="font-bold uppercase">Nama / Alamat Pemesan</label>
            <textarea value={customer} placeholder="Silahkan masukkan nama pemesanan" onChange={(e) => setCustomer(e.target.value)} rows={3} className="w-full p-2 border-2 border-black mt-1" />
          </div>

          <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
            <label className="font-bold uppercase mb-2 block">Produk / Layanan</label>
            {items.map((item, index) => (
              <div key={item.id} className="flex gap-2 mb-2 bg-gray-50 p-2 border border-black">
                <input placeholder="Nama Produk" value={item.name} onChange={(e) => updateItem(item.id, "name", e.target.value)} className="w-1/2 p-1 border border-gray-300" />
                <input placeholder="Qty" value={item.qty} onChange={(e) => updateItem(item.id, "qty", e.target.value)} className="w-1/6 p-1 border border-gray-300 text-center" />
                <input type="number" placeholder="Total" value={item.price} onChange={(e) => updateItem(item.id, "price", Number(e.target.value))} className="w-1/3 p-1 border border-gray-300" />
                <button onClick={() => removeItem(item.id)} className="text-red-500 font-bold px-2">
                  X
                </button>
              </div>
            ))}
            <button onClick={addItem} className="w-full bg-lime-300 border-2 border-black py-2 font-bold uppercase mt-2 hover:bg-lime-400">
              + Tambah Baris
            </button>
          </div>

          <button onClick={downloadPDF} className="w-full bg-black text-white font-bold py-4 uppercase tracking-widest mt-8 hover:bg-gray-800 flex items-center justify-center gap-2">
            <span>Download PDF</span> ⬇
          </button>
        </div>
      </div>

      {/* KANAN: PREVIEW NOTA (UKURAN A4) */}
      <div className="xl:col-span-8 overflow-x-auto bg-gray-200 p-4 lg:p-10 flex justify-center border-2 border-dashed border-gray-400">
        {/* Kontainer A4 (Di-scale otomatis agar pas di layar, tapi saat di PDF resolusinya tajam) */}
        <div
          ref={invoiceRef}
          className="bg-[#e9ebef] relative font-sans text-black"
          style={{ width: "794px", minHeight: "1123px" }} // Standard A4 Web Resolution
        >
          {/* HEADER DARK BLUE */}
          <div className="w-full h-[220px] bg-[#0c1427] relative flex justify-end p-12">
            <div className="text-right text-white">
              {/* Logo Placehoder */}
              <div className="flex flex-col items-center gap-2 mr-4">
                <div className="w-12 h-12 border-[3px] border-white flex flex-col items-center justify-center rounded-[8px] rotate-45 mb-2">
                  <span className="font-bold text-xl -rotate-45 block">S</span>
                </div>
                <span className="font-semibold text-lg tracking-wide">Syabab Muslim</span>
              </div>
            </div>
          </div>

          {/* WHITE BOARD OVERLAY (Bentuk persis seperti desain) */}
          <div className="absolute top-[160px] left-0 right-0 mx-[5%] bg-white rounded-tl-[20px] rounded-tr-[20px] rounded-b-[20px] min-h-[900px] shadow-2xl p-12 z-10">
            {/* Title */}
            <h1 className="text-5xl font-bold tracking-wider mb-16 text-gray-900">INVOICE</h1>

            {/* Info Section */}
            <div className="grid grid-cols-2 gap-8 mb-16">
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">NOTA PEMBAYARAN</h3>
                <p className="text-gray-600 mb-1">Nota Nomor {invoiceNo}</p>
                <p className="text-gray-600">Tanggal {date}</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-gray-900">NAMA PEMESAN</h3>
                <p className="text-gray-600 whitespace-pre-wrap leading-tight">{customer}</p>
              </div>
            </div>

            {/* TABLE */}
            <table className="w-full mb-12">
              <thead>
                <tr className="bg-[#1a1a1a] text-white">
                  <th className="text-left py-4 px-6 font-semibold uppercase text-sm w-1/2">Produk</th>
                  <th className="text-center py-4 px-6 font-semibold uppercase text-sm w-1/4">Jumlah</th>
                  <th className="text-right py-4 px-6 font-semibold uppercase text-sm w-1/4">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="border-b-2 border-gray-100">
                    <td className="py-4 px-6 text-gray-800 font-medium">{item.name}</td>
                    <td className="py-4 px-6 text-center text-gray-800">{item.qty}</td>
                    <td className="py-4 px-6 text-right text-gray-800">{formatIDR(item.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* TOTAL ROW */}
            <div className="flex justify-between items-center py-4 px-6 bg-white font-bold text-gray-900 text-lg">
              <span className="uppercase">Total Pembayaran</span>
              <span>{formatIDR(totalAmount)}</span>
            </div>

            {/* SIGNATURE */}
            <div className="mt-24 flex justify-end pr-8">
              <div className="text-center">
                {/* Signature Image Dummy */}
                <div className="h-20 flex items-end justify-center mb-2">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="TTD" className="h-16 opacity-80" />
                </div>
                <div className="w-48 border-b border-gray-400 mb-2"></div>
                <p className="font-medium text-gray-800">Muhammad Hasim As'ari</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
