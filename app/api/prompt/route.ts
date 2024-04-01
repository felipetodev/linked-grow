import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs";
import type { OAuthProvider } from "@clerk/nextjs/server";

const { CLERK_OAUTH_PROVIDER = "" } = process.env

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId || !CLERK_OAUTH_PROVIDER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = CLERK_OAUTH_PROVIDER as `oauth_${OAuthProvider}`

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const accessToken = clerkResponse[0].token;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // https://api.linkedin.com/v2/me
  // https://api.linkedin.com/v2/userinfo
  const res = await fetch("https://api.linkedin.com/v2/userinfo", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const user = await res.json();

  return NextResponse.json({ userId, accessToken, user });
}
