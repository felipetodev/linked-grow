import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    author: v.string(),
    content: v.string(),
    updatedAt: v.float64(),
    userId: v.string(),
    status: v.string(),
  }),
});
