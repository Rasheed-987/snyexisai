import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Add your authentication logic here
    // This is just a placeholder
    if (email === 'admin@synexis.ai' && password === 'admin123') {
      return NextResponse.json({ 
        success: true, 
        message: 'Login successful',
        token: 'dummy-jwt-token'
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid credentials' 
      }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}