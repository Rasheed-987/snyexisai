'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CallbackContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      // Redirect to callback API which handles everything server-side
      window.location.href = `/api/auth/callback?code=${code}`;
    } else {
      // No code, redirect to result page with error
      window.location.href = '/auth/result?status=error&message=No%20authorization%20code%20provided';
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Processing your request...</h1>
        <p className="text-gray-600">Please wait while we set up your meeting.</p>
      </div>
    </div>
  );
}

export default function GoogleAuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
