import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./utils";

export const createPost = mutation({
  args: {
    content: v.string(),
    status: v.string() // add enum 'draft' | 'published'
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("Not authenticated")
    }

    const currentDate = new Date();
    const currentTimeMillis = currentDate.getTime();

    return await ctx.db.insert("posts", {
      content: args.content,
      status: args.status,
      author: user?.name ?? "Unknown User",
      userId: user.subject,
      updatedAt: currentTimeMillis
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
    content: v.string()
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("Not authenticated")
    }

    const currentDate = new Date();
    const currentTimeMillis = currentDate.getTime();

    await ctx.db.patch(args.postId, {
      content: args.content,
      updatedAt: currentTimeMillis
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
