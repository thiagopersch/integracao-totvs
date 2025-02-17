import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get('next-auth.session-token')?.value;

  if (request.nextUrl.pathname === '/login' && sessionToken) {
    return NextResponse.redirect(new URL('/administrative', request.url));
  }

  if (request.nextUrl.pathname.includes('/administrative') && !sessionToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (request.nextUrl.pathname === '/' && sessionToken) {
    return NextResponse.redirect(new URL('/administrative', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/administrative/:path*', '/'],
};
