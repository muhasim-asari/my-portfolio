// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Ambil cookie 'admin_token'
  const adminToken = request.cookies.get('admin_token')

  // Kalau tidak ada token, paksa pindah ke halaman login
  if (!adminToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Kalau ada, silakan lanjut
  return NextResponse.next()
}

// Tentukan halaman mana saja yang dijaga satpam
export const config = {
  matcher: '/admin/:path*', // Semua yang berawalan /admin akan dicek
}