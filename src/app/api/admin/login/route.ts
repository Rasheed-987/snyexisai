import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignJWT } from 'jose';
import connectDB from '@/lib/mongodb';
import { Admin } from '@/utils/models';

// JWT Secret - Load from environment or use default
const JWT_SECRET = process.env.JWT_SECRET || 'c6be3e36f0c270a1a36ec2188d564cd9a8b248f95b8c97374d1396b1ffbfcd591dba94ab8a96d552c896408bed3b78928ba83ec89a9555461956cacf34b7cf17';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Find admin by username
    const admin = await Admin.findOne({ username });

    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate JWT token using jose for Edge Runtime compatibility
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new SignJWT({ 
      id: admin._id.toString(), 
      username: admin.username 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

    // Generate the cookie options
    const cookieOptions = {
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: false, // Set to false for development (localhost)
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    };

    // Set HttpOnly cookie
    const response = NextResponse.json(
      { message: 'Login successful', username: admin.username },
      { status: 200 }
    );

    // Set the cookie
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}