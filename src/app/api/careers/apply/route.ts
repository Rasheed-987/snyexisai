import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      name, 
      email, 
      location, 
      websiteOrPortfolio, 
      socialLinks, 
      aiExcitement, 
      cv,
      jobTitle,
      Id,
      submittedAt 
    } = body;

    // Validation
    if (!name || !email || !location) {
      return NextResponse.json({ 
        success: false, 
        message: 'Name, email, and location are required.' 
      }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Please provide a valid email address.' 
      }, { status: 400 });
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content for admin
    const adminMailOptions: any = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // admin email
      subject: `New Job Application: ${jobTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #007bff;">New Job Application Received</h2>
          <p><strong>Position:</strong> ${jobTitle}</p>
          <p><strong>Job ID:</strong> ${Id || 'N/A'}</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <h3>Applicant Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Website/Portfolio:</strong> ${websiteOrPortfolio || 'Not provided'}</p>
          <p><strong>Social Links:</strong> ${socialLinks || 'Not provided'}</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <h3>Why AI & Synexis AI?</h3>
          <p style="white-space: pre-wrap;">${aiExcitement || 'Not provided'}</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p><strong>CV Files:</strong> ${cv && cv.length > 0 ? cv.map((f: any) => f.name).join(', ') : 'No CV uploaded'}</p>
          <p><strong>Submitted At:</strong> ${new Date(submittedAt).toLocaleString()}</p>
        </div>
      `,
      attachments: cv && cv.length > 0 ? cv.map((f: any) => ({
        filename: f.name,
        content: f.data,
        encoding: 'base64'
      })) : []
    };

    // Email content for applicant (confirmation)
    const applicantMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Application Received - ${jobTitle} at Synexis AI`,
      html: `
        <h2>Thank you for your application!</h2>
        <p>Dear ${name},</p>
        <p>We have received your application for the <strong>${jobTitle}</strong> position at Synexis AI.</p>
        <p>Our team will review your application and get back to you soon.</p>
        <br>
        <p>Best regards,</p>
        <p><strong>Synexis AI Team</strong></p>
        <hr>
        <p style="font-size: 12px; color: #666;">
          Follow us for insights on AI, design and development:<br>
          LinkedIn: <a href="https://www.linkedin.com/company/synexis-ai/">Synexis AI</a>
        </p>
      `,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(applicantMailOptions);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.',
    });

  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to submit application. Please try again later.' 
    }, { status: 500 });
  }
}
