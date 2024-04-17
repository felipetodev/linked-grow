import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    author: v.string(),
    content: v.string(),
    updatedAt: v.float64(),
    userId: v.string(),
    postUrn: v.optional(v.string()),
    status: v.union(
      v.literal("draft"),
      v.literal("published")
    ),
    imgFileId: v.optional(v.id('_storage')),
    imgFileUrl: v.optional(v.string())
  }),
  ideas: defineTable({
    author: v.string(),
    content: v.string(),
    userId: v.string(),
  })
});
