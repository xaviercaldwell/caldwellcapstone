// proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // CSP header:
  // - allow scripts/styles inline for Next.js runtime (necessary)
  // - allow connections to Supabase
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      connect-src 'self' https://*.supabase.co;
      img-src 'self' data:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()
  );

  return response;
}

export const config = {
  matcher: '/((?!favicon.ico).*)',
};
