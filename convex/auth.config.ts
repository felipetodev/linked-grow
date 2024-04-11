const {
  NEXT_PUBLIC_CLERK_JWT_ISSUER_DOMAIN = "",
  CLERK_JWT_ISSUER_DOMAIN = "",
} = process.env

export default {
  providers: [
    {
      domain: NEXT_PUBLIC_CLERK_JWT_ISSUER_DOMAIN || CLERK_JWT_ISSUER_DOMAIN,
      applicationID: "convex",
    },
  ]
};
