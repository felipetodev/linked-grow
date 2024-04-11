import { NextResponse } from "next/server";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import type { OAuthProvider } from "@clerk/nextjs/server";
import type { NextApiRequest } from "next";

const { CLERK_OAUTH_PROVIDER = "" } = process.env

export async function GET(req: NextApiRequest) {
  const { userId } = getAuth(req);

  if (!userId || !CLERK_OAUTH_PROVIDER) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const provider = CLERK_OAUTH_PROVIDER as `oauth_${OAuthProvider}`

  // const name = 'default';
  // const organization = await clerkClient.organizations.createOrganization({ name, createdBy: userId });

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const accessToken = clerkResponse[0].token;

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const postUrn = "urn:li:activity:7168625769596837890"

  // https://api.linkedin.com/v2/me
  // https://api.linkedin.com/v2/userinfo
  // https://api.linkedin.com/v2/socialActions/{shareUrn|ugcPostUrn|commentUrn}/likes
  const res = await fetch(`https://api.linkedin.com/v2/socialActions/${decodeURIComponent(postUrn)}/likes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const user = await res.json();

  return NextResponse.json({ userId, accessToken, user });
}
