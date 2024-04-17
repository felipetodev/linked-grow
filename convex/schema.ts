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
    fileId: v.optional(v.id('_storage')),
    fileUrl: v.optional(v.string()),
    fileType: v.optional(v.string()),
  }),
  ideas: defineTable({
    author: v.string(),
    content: v.string(),
    userId: v.string(),
  })
});
