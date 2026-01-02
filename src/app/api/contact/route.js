import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { name, email, companyName, phoneNumber, websiteUrl, projectDetails, receiveUpdates } = await request.json()
        
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    // 2️⃣ Define email options
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Company Name: ${companyName}
        Phone Number: ${phoneNumber}
        Website URL: ${websiteUrl}
        Project Details: ${projectDetails}
        Receive Updates: ${receiveUpdates ? 'Yes' : 'No'}
      `,
    }

     // 3️⃣ Send email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, message: error.message || 'Failed to send email' }, { status: 500 })
  }
}