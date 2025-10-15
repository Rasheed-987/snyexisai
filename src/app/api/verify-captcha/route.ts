import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()
    const secretKey = process.env.RECAPTCHA_SECRET_KEY

    if (!token) {
      return NextResponse.json({ success: false, message: 'Missing token' }, { status: 400 })
    }

    if (!secretKey) {
      console.error('RECAPTCHA_SECRET_KEY is not configured')
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 })
    }

    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: 'POST' }
    )

    const data = await res.json()
    
    if (data.success) {
      return NextResponse.json({ success: true, message: 'reCAPTCHA verified successfully' })
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'reCAPTCHA verification failed',
        errors: data['error-codes'] || []
      }, { status: 400 })
    }
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}