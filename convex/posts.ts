import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./utils";

export const createPost = mutation({
  args: {
    content: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("published")
    ),
    postUrn: v.optional(v.string()), // fix schema
    fileId: v.optional(v.id('_storage')),
    fileType: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("Not authenticated")
    }

    const currentDate = new Date();
    const currentTimeMillis = currentDate.getTime();

    let url: string | null = null
    if (args.fileId) {
      url = await ctx.storage.getUrl(args.fileId)
    }

    return await ctx.db.insert("posts", {
      content: args.content,
      status: args.status,
      postUrn: args.postUrn,
      author: user?.name ?? "Unknown User",
      userId: user.subject,
      updatedAt: currentTimeMillis,
      fileId: args.fileId,
      ...url && { fileUrl: url, fileType: args.fileType },
    })
  }
})

export const getPosts = query({
  args: {
    status: v.string()
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      return []
    }

    return (await ctx.db
      .query("posts")
      .filter(q => q.eq(q.field('userId'), user.subject))
      .filter(q => q.eq(q.field('status'), args.status))
      .collect())
      .sort((a, b) => b.updatedAt - a.updatedAt)
  }
})

export const getPost = query({
  args: {
    postId: v.id("posts")
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      return null
    }

    // check if postId exists and belongs to user

    return await ctx.db.get(args.postId);
  }
})

export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("published")
    ),
    postUrn: v.optional(v.string()), // fix schema
    fileId: v.optional(v.id('_storage')),
    fileType: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("Not authenticated")
    }

    const currentDate = new Date();
    const currentTimeMillis = currentDate.getTime();

    let url: string | null = null
    if (args.fileId) {
      url = await ctx.storage.getUrl(args.fileId)
    }

    await ctx.db.patch(args.postId, {
      // orgId: args.orgId,
      content: args.content,
      status: args.status,
      postUrn: args.postUrn,
      updatedAt: currentTimeMillis,
      ...url && {
        fileType: args.fileType,
        fileId: args.fileId,
        fileUrl: url
      },
    })
  }
})

export const deletePost = mutation({
  args: {
    postId: v.id("posts")
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("Not authenticated")
    }

    await ctx.db.delete(args.postId);
  }
});

export const deleteFile = mutation({
  args: {
    postId: v.id("posts"),
    fileId: v.id('_storage')
  },
  handler: async (ctx, args) => {
    await ctx.storage.delete(args.fileId)
    await ctx.db.patch(args.postId, {
      fileId: undefined,
      fileUrl: undefined,
      fileType: undefined
    })
  }
})
