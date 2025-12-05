// proxy.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Proxy function for Next.js 16
 * - Injects a strict CSP with nonces
 * - Allows Supabase connections
 * - Removes 'unsafe-inline'
 */
export function proxy(request: NextRequest) {
  // Generate a random nonce for each request
  const nonce = crypto.randomBytes(16).toString('base64');

  // Build CSP header
  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}';
    style-src 'self' 'nonce-${nonce}';
    connect-src 'self' https://*.supabase.co;
    img-src 'self' data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Pass the nonce downstream via a custom header
  const headers = new Headers(request.headers);
  headers.set('x-csp-nonce', nonce);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', csp);

  return response;
}

// Only apply proxy to non-static routes
export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
