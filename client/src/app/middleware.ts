import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (request.nextUrl.pathname.startsWith('/administrative') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/administrative/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/administrative/:path*', '/'], // Aplicar middleware nessas rotas
};
