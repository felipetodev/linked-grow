import { ActionCtx, MutationCtx, QueryCtx } from "./_generated/server";

export const getUser = async (ctx: QueryCtx | MutationCtx | ActionCtx) => {
  return await ctx.auth.getUserIdentity();
};
