import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { jwtVerify } from 'jose';
import connectDB from '@/lib/mongodb';
import { Admin } from '@/utils/models';

const JWT_SECRET = process.env.JWT_SECRET || 'c6be3e36f0c270a1a36ec2188d564cd9a8b248f95b8c97374d1396b1ffbfcd591dba94ab8a96d552c896408bed3b78928ba83ec89a9555461956cacf34b7cf17';

// Helper function to verify JWT token
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

// GET - Get current admin info
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token) as any;

    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { username: admin.username },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get admin error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT - Update username and/or password
export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const token = request.cookies.get('authToken')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token) as any;

    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    const { username, currentPassword, newPassword } = await request.json();

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return NextResponse.json(
        { message: 'Admin not found' },
        { status: 404 }
      );
    }

    // If changing password, verify current password
    if (newPassword && currentPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, admin.password);

      if (!isValidPassword) {
        return NextResponse.json(
          { message: 'Current password is incorrect' },
          { status: 401 }
        );
      }
    }

    // Update username if provided
    if (username && username !== admin.username) {
      // Check if new username already exists
      const existingAdmin = await Admin.findOne({ username });
      if (existingAdmin) {
        return NextResponse.json(
          { message: 'Username already exists' },
          { status: 400 }
        );
      }
      admin.username = username;
    }

    // Update password if provided
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = hashedPassword;
    }

    await admin.save();

    return NextResponse.json(
      { message: 'Settings updated successfully', username: admin.username },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update admin error:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
