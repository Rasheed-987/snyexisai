import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Replace this with your actual authentication logic
    const isValidUser = username === 'admin' && password === 'password';

    if (!isValidUser) {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 401 });
    }

    // Generate a mock token (replace with real token generation logic)
    const token = 'mock-token';

    // Set the token as an HTTP-only cookie
    return NextResponse.json(
      { message: 'Login successful' },
      {
        status: 200,
        headers: {
          'Set-Cookie': `authToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}