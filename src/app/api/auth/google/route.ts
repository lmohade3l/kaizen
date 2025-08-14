import { NextResponse } from 'next/server';

export async function GET() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'openid',
      'profile',
      'email',
    ].join(' '),
  };

  const qs = new URLSearchParams(options).toString();
  return NextResponse.redirect(`${rootUrl}?${qs}`);
}
