import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// JWT Secret - Load from environment or use default
const JWT_SECRET = process.env.JWT_SECRET || 'c6be3e36f0c270a1a36ec2188d564cd9a8b248f95b8c97374d1396b1ffbfcd591dba94ab8a96d552c896408bed3b78928ba83ec89a9555461956cacf34b7cf17';

async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    await jwtVerify(token, secret);
    console.log('✓ Token verified successfully');
    return true;
  } catch (error: any) {
    console.error('✗ Token verification failed:', error.message || error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken')?.value;

  // Allow access to the login page without redirection
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Check if token exists
  if (!authToken) {
    console.log('❌ No auth token - redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Verify token (now async)
  const isValid = await verifyToken(authToken);
  
  if (!isValid) {
    console.log('❌ Invalid token - redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Allow authenticated users to proceed
  console.log('✅ Access granted to:', request.nextUrl.pathname);
  return NextResponse.next();
}

  // Apply middleware to specific routes
  export const config = {
    matcher: ['/admin/:path*'], // Protect all /admin routes
  };