import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the authentication cookie
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 }
    );

    response.cookies.set('authToken', '', {
      httpOnly: true,
      secure: false, // Set to false for development
      sameSite: 'lax',
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}