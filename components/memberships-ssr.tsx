import { auth, clerkClient } from "@clerk/nextjs";
import { MembershipSelector } from "./membership-selector";

export default async function MembershipSSR() {
  const { userId, orgId } = auth();

  if (!orgId || !userId) {
    return null
  }

  const memberships = await clerkClient.organizations.getOrganizationMembershipList({
    organizationId: orgId
  })

  const members = memberships.map(m => m.publicUserData)

  if (!members.length) {
    return null
  }

  return (
    <MembershipSelector
      userId={userId}
      members={JSON.stringify(members)}
    />
  )
}
