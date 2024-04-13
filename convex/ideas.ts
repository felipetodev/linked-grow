import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUser } from "./utils";

export const createPostIdea = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("Not authenticated")
    }

    return await ctx.db.insert("ideas", {
      content: args.content,
      author: user?.name ?? "Unknown User",
      userId: user.subject,
    })
  }
})

export const getPostsIdeas = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      return []
    }

    return (await ctx.db
      .query("ideas")
      .filter(q => q.eq(q.field('userId'), user.subject))
      .order("desc")
      .collect()
    )
  }
})

export const deleteIdea = mutation({
  args: {
    ideaId: v.id("ideas")
  },
  handler: async (ctx, args) => {
    const user = await getUser(ctx);

    if (!user) {
      throw new Error("Not authenticated")
    }

    await ctx.db.delete(args.ideaId);
  }
});
