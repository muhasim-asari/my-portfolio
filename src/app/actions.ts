// app/actions.ts
'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers' // Import cookies
import { redirect } from 'next/navigation'

const prisma = new PrismaClient()

// --- Fungsi Project (Tetap sama) ---
export async function addProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const link = formData.get('link') as string
  
  await prisma.project.create({
    data: {
      title,
      description,
      link,
      imageUrl: 'https://via.placeholder.com/400'
    }
  })
  revalidatePath('/')
}

export async function getProjects() {
  return await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })
}

// --- Fungsi Auth (PERBAIKAN DI SINI) ---

// 3. Fungsi Login
export async function login(formData: FormData) {
  const password = formData.get('password') as string
  
  if (password === process.env.ADMIN_PASSWORD) {
    // PERHATIKAN: Ada (await cookies())
    (await cookies()).set('admin_token', 'true', { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 
    })
    redirect('/admin')
  } else {
    // Password salah (opsional: bisa return error message)
    console.log("Password Salah") 
  }
}

// 4. Fungsi Logout
export async function logout() {
  (await cookies()).delete('admin_token')
  redirect('/') // <--- Ini mengarahkan ke Home Page, bukan Login
}