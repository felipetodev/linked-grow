"use server"

import { z } from 'zod'
import { OAuthProvider, auth, clerkClient } from "@clerk/nextjs/server";
import { currentUser } from '@clerk/nextjs';

const { CLERK_OAUTH_PROVIDER = "" } = process.env

const linkedinUri = "https://api.linkedin.com/v2"
const provider = CLERK_OAUTH_PROVIDER as `oauth_${OAuthProvider}`

async function addComment({ accessToken, externalId, text, postUrn }: { accessToken: string, text: string, postUrn: string, externalId: string }) {
  const res = await fetch(`${linkedinUri}/socialActions/${decodeURIComponent(postUrn)}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      actor: `urn:li:person:${externalId}`,
      object: `${postUrn}`,
      message: { text }
    })
  })

  return await res.json()
}

async function createPost({ accessToken, externalId, text }: { accessToken: string, text: string, externalId: string }) {
  const res = await fetch(`${linkedinUri}/ugcPosts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      author: `urn:li:person:${externalId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "NONE" // 'NONE' | 'ARTICLE' | 'IMAGE',
          // media: []
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" // 'PUBLIC' | 'CONNECTIONS'
      }
    })
  })

  return await res.json();
}

export async function publishPost({ text, comment }: { text: string, comment?: string }) {
  const parsedCredentials = z.object({
    text: z.string(),
    comment: z.string().optional(),
  }).safeParse({ text, comment });

  const { userId } = auth();

  if (!userId || !CLERK_OAUTH_PROVIDER || !parsedCredentials.success) {
    return {
      error: "Unauthorized"
    }
  }

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    provider
  );

  const accessToken = clerkResponse[0].token;

  const user = await currentUser() ?? undefined;

  const externalId = user?.externalId ?? user?.externalAccounts[0]?.externalId

  if (!accessToken || !externalId) {
    return {
      error: "Unauthorized"
    }
  }

  const post = await createPost({
    accessToken,
    externalId,
    text
  })

  if (post.status >= 400) {
    console.error(post)
    return {
      error: 'Something went wrong'
    }
  }

  comment
    ? await addComment({
      accessToken,
      externalId,
      postUrn: post?.id,
      text: comment
    })
    : post

  console.info("Post created successfully 🚀: ", post?.id)

  return { postUrn: post?.id }
}
