import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import api from './api/api';

const protectedRoutes = ['/dashboard', '/me', '/dashboard/:path*'];

function checkIsProtectedRoute(pathname: string) {
  return protectedRoutes.includes(pathname);
}

export async function proxy(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const isProtectedRoute = checkIsProtectedRoute(currentPath);

  if (!isProtectedRoute) return NextResponse.next();

  // Is a protected route
  try {
    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt')?.value;
    if (!jwt) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    const response = await api.get('me/');

    if (!response.data) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying user authentication:', error);
    return NextResponse.redirect(new URL('/signin', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/me', '/dashboard', '/dashboard/:path*'],
};