import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const cookieName =
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token';
  const sessionToken = request.cookies.get(cookieName)?.value;

  if (request.nextUrl.pathname === '/signIn' && sessionToken) {
    return NextResponse.redirect(new URL('/administrative', request.url));
  }

  if (request.nextUrl.pathname.includes('/administrative') && !sessionToken) {
    return NextResponse.redirect(new URL('/signIn', request.url));
  }

  if (request.nextUrl.pathname === '/' && sessionToken) {
    return NextResponse.redirect(new URL('/administrative', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/administrative/:path*', '/', '/signIn'],
};
