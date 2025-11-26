// app/actions.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { v2 as cloudinary } from 'cloudinary' // Import Cloudinary

const prisma = new PrismaClient()

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// --- FUNGSI UTAMA ---

export async function addProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const link = formData.get('link') as string
  // const featured = formData.get('featured') === 'on'
  const file = formData.get('image') as File

  let imageUrl = 'https://via.placeholder.com/800x600' // Default

  // LOGIC UPLOAD KE CLOUDINARY
  if (file && file.size > 0) {
    try {
      // 1. Ubah File menjadi ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // 2. Upload ke Cloudinary menggunakan Promise
      // Cloudinary butuh format base64 atau stream untuk upload dari memory
      const uploadResult: any = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "portfolio-asim", // Nama folder di Cloudinary
            resource_type: "image",   // Tipe file
            transformation: [         // Opsional: Otomatis resize biar hemat kuota
              { width: 1000, crop: "limit" },
              { quality: "auto" }
            ]
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(result);
          }
        ).end(buffer);
      });

      // 3. Ambil URL HTTPS yang aman dari hasil upload
      imageUrl = uploadResult.secure_url;

    } catch (error) {
      console.error("Gagal upload ke Cloudinary:", error);
      // Opsional: Throw error atau biarkan pakai placeholder
    }
  }

  // Simpan URL Cloudinary ke Database
  await prisma.project.create({
    data: {
      title,
      description,
      link,
      // featured,
      imageUrl
    }
  })

  revalidatePath('/')
}

// --- FUNGSI DELETE (BARU) ---
export async function deleteProject(formData: FormData) {
  const id = formData.get('id')

  if (id) {
    await prisma.project.delete({
      where: {
        id: Number(id) // Convert string ID ke number
      }
    })

    // Refresh halaman Admin dan Home biar data hilang
    revalidatePath('/admin')
    revalidatePath('/')
  }
}

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  })
}

export async function login(formData: FormData) {
  const password = formData.get('password') as string
  if (password === process.env.ADMIN_PASSWORD) {
    (await cookies()).set('admin_token', 'true', {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 86400
    })
    redirect('/admin')
  }
}

export async function logout() {
  (await cookies()).delete('admin_token')
  redirect('/login')
}