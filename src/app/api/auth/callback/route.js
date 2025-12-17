import { NextResponse } from 'next/server';

export async function GET(request) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.redirect(
      new URL('/auth/result?status=error&message=OAuth%20credentials%20not%20configured', request.url)
    );
  }

  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (!code) {
    return NextResponse.redirect(
      new URL('/auth/result?status=error&message=No%20code%20provided', request.url)
    );
  }

  try {
    // Exchange code for tokens using direct REST API
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      let errorMessage = 'Failed to exchange code for tokens';
      try {
        const errorData = await tokenResponse.json();
        errorMessage = errorData.error_description || errorData.error || errorMessage;
      } catch (e) {
        errorMessage = `HTTP ${tokenResponse.status}: ${tokenResponse.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const tokens = await tokenResponse.json();
    const accessToken = tokens.access_token;

    if (!accessToken) {
      throw new Error('No access token received');
    }

    // Get user info from Google
    let userEmail = '';
    let userName = '';
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        userEmail = userInfo.email || '';
        userName = userInfo.name || userInfo.email || 'Guest';
      }
    } catch (e) {
      console.log('Could not fetch user info:', e);
    }

    // Get selected meeting slot from cookie (set by booking page)
    let start, end, timeZone;
    const cookies = request.headers.get('cookie') || '';
    const slotCookie = cookies.split(';').find(c => c.trim().startsWith('selectedMeetingSlot='));
    
    if (slotCookie) {
      try {
        const slotData = JSON.parse(decodeURIComponent(slotCookie.split('=')[1]));
        start = new Date(slotData.startTime);
        end = new Date(slotData.endTime);
        timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Validate dates
        if (isNaN(start.getTime()) || isNaN(end.getTime()) || start < new Date()) {
          throw new Error('Invalid or past date');
        }
      } catch (e) {
        console.log('Invalid slot data, using default:', e);
        // Fallback to default (1 hour from now)
        const now = new Date();
        start = new Date(now.getTime() + 60 * 60 * 1000);
        end = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      }
    } else {
      // Default: 1 hour from now if no slot selected
    const now = new Date();
      start = new Date(now.getTime() + 60 * 60 * 1000);
      end = new Date(now.getTime() + 2 * 60 * 60 * 1000);
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    const event = {
      summary: 'Synexis.ai Meeting',
      description: `Meeting booked via website${userEmail ? `\nBooked by: ${userName} (${userEmail})` : ''}`,
      start: {
        dateTime: start.toISOString(),
        timeZone: timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: timeZone,
      },
      attendees: [],
      conferenceData: {
        createRequest: {
          requestId: Math.random().toString(36).substring(2),
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const calendarResponse = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }
    );

    if (!calendarResponse.ok) {
      const errorData = await calendarResponse.json();
      throw new Error(errorData.error?.message || 'Failed to create calendar event');
    }

    const eventData = await calendarResponse.json();
    const meetingLink = eventData.hangoutLink || eventData.conferenceData?.entryPoints?.[0]?.uri || '';

    // Send email notification to owner (non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
        const nodemailer = (await import('nodemailer')).default;
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.hostinger.com',
          port: parseInt(process.env.SMTP_PORT || '465'),
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        const formatDateTime = (date) => {
          return new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: timeZone,
          }).format(date);
        };

        const ownerEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
        
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: ownerEmail,
          subject: `New Meeting Booked: Synexis.ai Meeting`,
          html: `
            <h2>New Meeting Booked!</h2>
            <p>A new meeting has been scheduled through your website.</p>
            <hr>
            <h3>Meeting Details:</h3>
            <p><strong>Title:</strong> Synexis.ai Meeting</p>
            <p><strong>Start Time:</strong> ${formatDateTime(start)}</p>
            <p><strong>End Time:</strong> ${formatDateTime(end)}</p>
            <p><strong>Duration:</strong> 1 hour</p>
            <p><strong>Time Zone:</strong> ${timeZone}</p>
            ${userEmail ? `<p><strong>Booked By:</strong> ${userName} (${userEmail})</p>` : ''}
            <hr>
            <h3>Google Meet Link:</h3>
            <p><a href="${meetingLink}" style="color: #1a73e8; text-decoration: none;">${meetingLink}</a></p>
            <hr>
            <p style="color: #666; font-size: 12px;">This meeting has been automatically added to your Google Calendar.</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the whole process if email fails
      }
    }

    // Format dates for URL params
    const startTime = start.toISOString();
    const endTime = end.toISOString();

    const response = NextResponse.redirect(
      new URL(
        `/auth/result?status=success&meetingLink=${encodeURIComponent(meetingLink)}&startTime=${encodeURIComponent(startTime)}&endTime=${encodeURIComponent(endTime)}&timeZone=${encodeURIComponent(timeZone)}${userEmail ? `&userEmail=${encodeURIComponent(userEmail)}&userName=${encodeURIComponent(userName)}` : ''}`,
        request.url
      )
    );

    // Clear the meeting slot cookie after use
    response.cookies.set('selectedMeetingSlot', '', {
      expires: new Date(0),
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/auth/result?status=error&message=${encodeURIComponent(error.message)}`, request.url)
    );
  }
}
