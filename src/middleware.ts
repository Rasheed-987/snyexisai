import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value; // Extract the value of the cookie

  // Allow access to the login page without redirection
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  if (!authToken || authToken !== 'mock-token') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Allow authenticated users to proceed
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/admin/:path*'], // Protect all /admin routes
};