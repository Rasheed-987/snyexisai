'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthResultPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string>('loading');
  const [meetingLink, setMeetingLink] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [meetingDetails, setMeetingDetails] = useState<{
    startTime: string;
    endTime: string;
    timeZone: string;
    userName?: string;
    userEmail?: string;
  } | null>(null);

  useEffect(() => {
    const statusParam = searchParams.get('status');
    const linkParam = searchParams.get('meetingLink');
    const errorParam = searchParams.get('message');
    const startTimeParam = searchParams.get('startTime');
    const endTimeParam = searchParams.get('endTime');
    const timeZoneParam = searchParams.get('timeZone');
    const userEmailParam = searchParams.get('userEmail');
    const userNameParam = searchParams.get('userName');

    if (statusParam === 'success') {
      setStatus('success');
      if (linkParam) {
        setMeetingLink(decodeURIComponent(linkParam));
      }
      if (startTimeParam && endTimeParam && timeZoneParam) {
        setMeetingDetails({
          startTime: decodeURIComponent(startTimeParam),
          endTime: decodeURIComponent(endTimeParam),
          timeZone: decodeURIComponent(timeZoneParam),
          userName: userNameParam ? decodeURIComponent(userNameParam) : undefined,
          userEmail: userEmailParam ? decodeURIComponent(userEmailParam) : undefined,
        });
      }
    } else if (statusParam === 'error') {
      setStatus('error');
      if (errorParam) {
        setErrorMessage(decodeURIComponent(errorParam));
      }
    } else {
      setStatus('error');
      setErrorMessage('Unknown status');
    }
  }, [searchParams]);

  const formatDateTime = (isoString: string, timeZone: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timeZone,
      }).format(date);
    } catch (e) {
      return isoString;
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Processing...</h1>
          <p className="text-foreground/70">Please wait</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === 'success' ? (
          <>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Meeting Created Successfully!</h1>
              <p className="text-foreground/70">
                Your Google Calendar event with Google Meet link has been created.
              </p>
            </div>

            {meetingLink && (
              <div className="space-y-4 p-6 bg-foreground/5 rounded-lg border border-foreground/10">
                {meetingDetails && (
                  <div className="space-y-3 pb-4 border-b border-foreground/10">
                    <div>
                      <p className="text-xs font-medium text-foreground/50 uppercase tracking-wide mb-1">Meeting Time</p>
                      <p className="text-base font-semibold text-foreground">
                        {formatDateTime(meetingDetails.startTime, meetingDetails.timeZone)}
                      </p>
                      <p className="text-sm text-foreground/70">
                        Duration: 1 hour • {meetingDetails.timeZone}
                      </p>
                    </div>
                    {meetingDetails.userName && (
                      <div>
                        <p className="text-xs font-medium text-foreground/50 uppercase tracking-wide mb-1">Booked By</p>
                        <p className="text-sm text-foreground/70">
                          {meetingDetails.userName}
                          {meetingDetails.userEmail && ` (${meetingDetails.userEmail})`}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-foreground/70 mb-3">Meeting Link:</p>
                  <a
                    href={meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity font-medium mb-2"
                  >
                    Join Google Meet
                  </a>
                  <p className="text-xs text-foreground/50 break-all mt-2">{meetingLink}</p>
                </div>
                <div className="pt-2 text-xs text-foreground/60">
                  <p>✓ Meeting added to your Google Calendar</p>
                  <p>✓ Calendar owner will receive email notification</p>
                </div>
              </div>
            )}

            <div className="pt-4">
              <Link
                href="/contact"
                className="text-foreground/70 hover:text-foreground underline text-sm"
              >
                Return to Contact Page
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Error</h1>
              <p className="text-foreground/70">
                {errorMessage || 'Failed to create meeting. Please try again.'}
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => window.location.href = '/api/auth/google'}
                className="w-full px-6 py-3 bg-foreground text-background rounded-full hover:opacity-90 transition-opacity font-medium"
              >
                Try Again
              </button>
              <Link
                href="/contact"
                className="block text-foreground/70 hover:text-foreground underline text-sm"
              >
                Return to Contact Page
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

