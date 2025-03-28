"use server"

import { z } from 'zod'
import { OAuthProvider, auth, clerkClient } from "@clerk/nextjs/server";
import { currentUser } from '@clerk/nextjs';

const { CLERK_OAUTH_PROVIDER = "" } = process.env

const linkedinUri = "https://api.linkedin.com/v2"
const provider = CLERK_OAUTH_PROVIDER as `oauth_${OAuthProvider}`

async function addComment({
  accessToken,
  externalId,
  text,
  postUrn
}: {
  accessToken: string,
  text: string,
  postUrn: string,
  externalId: string
}) {
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

async function uploadImage({
  accessToken,
  uploadUrl,
  file
}: { accessToken: string, uploadUrl: string, file: FormData }) {
  try {
    const fileData = file.get("file") as File
    const { 0: fileType } = fileData.type.split("/")
    const file_ = await fileData.arrayBuffer().then((buffer) => new Uint8Array(buffer))

    const imageUploadRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        ...fileType === "image" && {
          "Content-Type": `image/${fileData.type}; charset=utf-8`,
          Authorization: `Bearer ${accessToken}`,
          'x-amz-acl': 'public-read',
        },
        ...fileType === "video" && {
          "Content-Type": "application/octet-stream"
        }
      },
      body: file_,
      redirect: "follow",
    })

    if (!imageUploadRes.ok) {
      return null
    }

    console.info("Image uploaded successfully 🚀")
    return true // success ✅
  } catch (e) {
    console.error("Error uploading image: ", e)
    return null
  }
}

async function registerFile({
  accessToken,
  externalId,
  file
}: {
  accessToken: string,
  externalId: string,
  file: FormData
}) {
  const fileData = file.get("file") as File
  const { 0: fileType } = (fileData.type).split("/") as ["image" | "video"]

  const recipes = fileType === "image"
    ? ["urn:li:digitalmediaRecipe:feedshare-image"]
    : ["urn:li:digitalmediaRecipe:feedshare-video"]

  const res = await fetch(`${linkedinUri}/assets?action=registerUpload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      registerUploadRequest: {
        owner: `urn:li:person:${externalId}`,
        recipes,
        serviceRelationships: [
          {
            identifier: "urn:li:userGeneratedContent",
            relationshipType: "OWNER",
          },
        ],
      }
    })
  })

  if (!res.ok) {
    return null
  }

  const { value } = await res.json();
  const imageAsset = value.asset;

  const { uploadUrl } = value.uploadMechanism[
    "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
  ];

  const uploaded = await uploadImage({ accessToken, uploadUrl, file });

  if (!uploaded || !imageAsset) {
    return null
  }

  return { asset: imageAsset, assetType: fileType }
}

async function createPost({
  accessToken,
  externalId,
  text,
  asset,
  assetType
}: {
  accessToken: string,
  text: string,
  externalId: string,
  asset?: string | null
  assetType?: 'image' | 'video' | null
}) {
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
          shareMediaCategory: assetType?.toUpperCase() ?? "NONE",
          ...asset && ({
            media: [
              {
                status: "READY",
                media: asset,
                "title": {
                  "text": "LinkedIn API v2 Testing share"
                },
                "description": {
                  "text": "LinkedIn API v2 Testing share"
                },
              }
            ]
          })
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" // 'PUBLIC' | 'CONNECTIONS'
      }
    })
  })

  return await res.json();
}

export async function publishPost({
  text,
  comment,
  file
}: {
  text: string,
  comment?: string,
  file: FormData | null
}) {
  const parsedCredentials = z.object({
    text: z.string(),
    comment: z.string().optional(),
    file: z.instanceof(FormData).nullable()
  }).safeParse({ text, comment, file });

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

  const accessToken = clerkResponse[0]?.token;

  const user = await currentUser() ?? undefined;

  const externalId = user?.externalId ?? user?.externalAccounts[0]?.externalId

  if (!accessToken || !externalId) {
    return {
      error: "Unauthorized or missing LinkedIn account"
    }
  }

  let asset: string | null = null;
  let assetType: 'image' | 'video' | null = null;
  if (file) {
    const register = await registerFile({ accessToken, externalId, file });
    asset = register?.asset
    assetType = register?.assetType ?? null
  }

  if (file && !asset) {
    return { error: "Error uploading post with image" }
  }

  const post = await createPost({
    accessToken,
    externalId,
    text,
    asset,
    assetType
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
