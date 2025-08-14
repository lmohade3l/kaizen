import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  // 1. Exchange code for tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  // 2. Get user info from Google
  const userInfoRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    }
  );
  const user = await userInfoRes.json();

  // 3. Store in DB (pseudo code)
  // let dbUser = await db.users.findOrCreate({ email: user.email, name: user.name, picture: user.picture });

  // 4. Create session cookie (JWT)
  const sessionToken = jwt.sign(
    { email: user.email, name: user.name },
    process.env.SESSION_SECRET!,
    { expiresIn: "7d" }
  );

  const res = NextResponse.redirect(new URL("/home", process.env.NEXT_PUBLIC_APP_URL));
  res.cookies.set("session", sessionToken, { httpOnly: true, secure: true });
  return res;
}
