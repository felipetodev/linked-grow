import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  publicRoutes: ["/", "/templates/:id"],
  // debug: process.env.NODE_ENV === "development"
  // afterAuth(auth, req) {}
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
