import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Simulate authentication check by reading the authToken cookie
    const cookies = request.headers.get('cookie');
    const authToken = cookies?.split('; ').find((cookie) => cookie.startsWith('authToken='))?.split('=')[1];

    if (!authToken || authToken !== 'mock-token') {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Authenticated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}