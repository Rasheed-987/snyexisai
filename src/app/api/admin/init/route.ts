import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import { Admin } from '@/utils/models';

// This endpoint is used to initialize the admin user
// It should be called once to set up the admin account
// After setting up, you should disable or protect this endpoint
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin already exists' },
        { status: 400 }
      );
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'Admin created successfully', username: admin.username },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Init admin error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
