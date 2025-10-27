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

    console.log('Sending reCAPTCHA verification request:', {
      secretKey,
      token,
    })

// In your /api/verify-captcha route, replace the fetch call:
const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`
})
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